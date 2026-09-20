'use strict';
// A shared filter and selection drive both the accessible list and the map.
let mapStarting = null, mapTiles = null, mapLoadTimer, mapListLimit = 18;
let mapMode = new URL(location).searchParams.get('stations') === 'list' ? 'list' : 'map';
let mapSelectedId = null;
const mapText = text => window.EcoLocale?.t(text) || text;

function mapStatus(text, retry = false) {
  const status = $('#r-map-status'); if (!status) return;
  status.hidden = !text;
  status.innerHTML = text ? `<span>${escapeHtml(text)}</span>${retry ? '<button class="button secondary" data-action="r-retry-map">Retry map</button>' : ''}` : '';
  $('#map').setAttribute('aria-busy', String(Boolean(text && !retry)));
}

initMap = async function () {
  if (map) return map;
  if (mapStarting) return mapStarting;
  mapStatus('Loading the map…');
  mapStarting = (async () => {
    try {
      await window.ecoLoadLibrary('map');
      if (role !== 'client' || tab !== 'map' || mapMode !== 'map') return;
      map = L.map('map', {zoomControl: false, attributionControl: true, minZoom: 2, maxZoom: 16, zoomSnap: .5, preferCanvas: true, scrollWheelZoom: false});
      stationLayer = L.layerGroup().addTo(map); portfolioLayer = L.layerGroup().addTo(map);
      mapTiles = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {maxZoom: 16, attribution: 'Tiles &copy; Esri, HERE, Garmin | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
      let errors = 0;
      mapTiles.on('loading', () => {errors = 0; mapStatus('Loading the map…'); clearTimeout(mapLoadTimer); mapLoadTimer = setTimeout(() => mapStatus('The map is taking longer to load. The station list is available.', true), 8000);});
      mapTiles.on('tileerror', () => {errors++;});
      mapTiles.on('load', () => {clearTimeout(mapLoadTimer); mapStatus(errors ? 'Some map details are unavailable. You can still use the station list.' : '', errors > 0);});
      mapTiles.addTo(map);
      map.on('moveend', () => renderMap());
      actions['fit-map'](); renderMap();
      return map;
    } catch {mapStatus('The map could not load. Use the station list or try again.', true);}
    finally {mapStarting = null;}
  })();
  return mapStarting;
};

function mapSelectionPreview() {
  const host = $('#r-map-selection'), s = stations.find(s => s.id === mapSelectedId);
  if (!host) return;
  host.hidden = !s || !filteredStations().some(row => row.id === s.id) || mapMode !== 'map';
  if (host.hidden) return;
  const photo = stationPhoto(s);
  host.innerHTML = `<img src="${escapeHtml(photo.path)}" alt="${escapeHtml(photo.alt)}" width="96" height="72"><div><strong translate="no">${escapeHtml(s.city)}, ${escapeHtml(s.state)}</strong><small>${s.ports} DC ports · ${photo.kind === 'illustration' ? 'Illustration' : 'Location photo'}</small><button class="text-button" data-journey-open="${s.id}">View station ${icon('arrow')}</button></div><button class="icon-btn" data-action="r-clear-selection" aria-label="Close station preview">×</button>`;
}

function mapChoose(id) {mapSelectedId = id; selectStation(id); mapSelectionPreview();}

renderMap = function () {
  const rows = filteredStations();
  $('#map-count').textContent = `${rows.length.toLocaleString('en-US')} real locations`;
  renderMapList(rows); mapSelectionPreview();
  if (!map || role !== 'client' || tab !== 'map' || mapMode !== 'map') return;
  stationLayer.clearLayers(); portfolioLayer.clearLayers();
  const buckets = new Map(), zoom = map.getZoom();
  for (const s of rows) {
    const pt = map.project([s.lat, s.lng], zoom);
    const key = zoom >= 13 ? String(s.id) : `${Math.floor(pt.x / 58)}:${Math.floor(pt.y / 58)}`;
    if (!buckets.has(key)) buckets.set(key, []); buckets.get(key).push(s);
  }
  for (const [key, group] of buckets) {
    if (group.length === 1) {
      const s = group[0], chosen = s.id === mapSelectedId;
      const marker = L.marker([s.lat, s.lng], {icon: L.divIcon({className: 'r-map-pin' + (chosen ? ' selected' : '') + (demo.portfolio.includes(s.id) ? ' allocated' : ''), html: icon('zap'), iconSize: [36, 36], iconAnchor: [18, 18]}), title: `${s.city}, ${s.state}`, alt: `${s.city}, ${s.state}`, keyboard: true});
      marker.addTo(stationLayer).on('click', () => mapChoose(s.id));
      marker.bindTooltip(escapeHtml(s.name), {className: 'station-point-tip'});
    } else {
      const [x,y]=key.split(':').map(Number),center=map.unproject([(x+.5)*58,(y+.5)*58],zoom);
      const marker = L.marker(center, {icon: L.divIcon({className: 'r-map-cluster', html: `<span>${group.length}</span>`, iconSize: [44,44],iconAnchor:[22,22]}), title: mapText('Zoom in to explore stations'), alt: mapText('Zoom in to explore stations'), keyboard: true});
      marker.addTo(stationLayer).on('click', () => map.fitBounds(group.map(s => [s.lat,s.lng]), {padding: [50, 90], maxZoom: Math.min(zoom+3,16), animate: false}));
    }
  }
  $$('#map .leaflet-marker-icon').forEach(el => {el.setAttribute('role','button'); el.setAttribute('aria-label',el.title||mapText('View station'));el.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();el.click();}});});
};

function renderMapList(rows = filteredStations()) {
  const host = $('#r-station-list'); if (!host || mapMode !== 'list') return;
  host.innerHTML = `<div class="r-list-heading"><h2>Station directory</h2><span role="status">${rows.length.toLocaleString('en-US')} matching locations</span></div><div class="r-location-list">${rows.slice(0,mapListLimit).map(s => {const p=stationPhoto(s); return `<button class="r-location-row" data-journey-open="${s.id}"><img src="${escapeHtml(p.path)}" alt="${escapeHtml(p.alt)}" width="120" height="90" loading="lazy"><span><strong translate="no">${escapeHtml(s.city)}, ${s.state}</strong><span translate="no">${escapeHtml(s.name)}</span><small>${s.ports} DC ports · ${p.kind==='illustration'?'Illustration':'Location photo'}</small></span>${icon('arrow')}</button>`;}).join('')}</div>${!rows.length ? '<div class="cab-empty"><h3>No matching stations.</h3><p>Try another city or reset the filters.</p><button class="button secondary" data-action="r-reset-filters">Reset filters</button></div>' : rows.length>mapListLimit ? '<button class="button secondary r-load-more" data-action="r-more-stations">Show more stations</button>' : ''}`;
}

function mapWorkspace() {
  if (workspaceRole !== 'client' || tab !== 'map') return;
  const section = $('#map-section');
  if (!$('#r-map-toolbar')) {
    const toolbar = document.createElement('div'); toolbar.id = 'r-map-toolbar'; toolbar.className = 'r-map-toolbar';
    toolbar.innerHTML = `<div class="r-map-modes" role="group" aria-label="Station display"><button data-map-mode="map">${icon('map')} Map</button><button data-map-mode="list">${icon('grid')} List</button></div><button class="button secondary r-filter-toggle" data-action="r-map-filters" aria-controls="r-map-filters" aria-expanded="false">${icon('filter')} Filters</button>`;
    section.prepend(toolbar);
    const filters = section.querySelector('.filter-column'); filters.id = 'r-map-filters';
    const search = section.querySelector('.map-search'); search.classList.add('r-map-search'); toolbar.after(search);
    const panel = section.querySelector('.map-panel');
    panel.insertAdjacentHTML('beforeend','<div id="r-map-status" class="r-map-status" role="status" hidden></div><div id="r-map-selection" class="r-map-selection" hidden></div>');
    panel.insertAdjacentHTML('afterend','<section id="r-station-list" class="panel r-station-list" hidden></section>');
  }
  section.dataset.mode = mapMode;
  $('#r-station-list').hidden = mapMode !== 'list';
  section.querySelector('.map-panel').hidden = mapMode !== 'map';
  $$('[data-map-mode]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.mapMode===mapMode)));
  if (mapMode === 'map') {
    if (!map) initMap();
    else {map.invalidateSize({pan:false}); renderMap();}
  } else renderMapList();
  mapSelectionPreview();
}

actions['r-map-filters'] = () => {const section=$('#map-section'),open=section.classList.toggle('r-filters-open');$('[data-action="r-map-filters"]').setAttribute('aria-expanded',String(open));};
actions['r-retry-map'] = () => {if(mapTiles){mapTiles.redraw();}else initMap();};
actions['r-clear-selection'] = () => {mapSelectedId=null;renderMap();};
actions['r-more-stations'] = () => {mapListLimit+=18;renderMapList();$('#r-station-list .r-location-row:nth-child('+(mapListLimit-17)+')')?.focus({preventScroll:true});};
actions['r-reset-filters'] = () => {filter='all';$('#state-filter').value='';$('#station-search').value='';$('#search-results').hidden=true;$('#clear-search').hidden=true;$$('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));renderMap();actions['fit-map']();};
actions['fit-map'] = () => {
  if (!map) return;
  const rows=filteredStations();if(!rows.length)return;
  map.stop();map.invalidateSize({pan:false});
  const all=filter==='all'&&!$('#state-filter').value&&!$('#station-search').value.trim();
  map.fitBounds(all?[[24.8,-124.7],[49,-66.8]]:rows.map(s=>[s.lat,s.lng]),{paddingTopLeft:[30,55],paddingBottomRight:[30,90],maxZoom:all?5:11,animate:false});
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-map-mode]');if(!b)return;mapMode=b.dataset.mapMode;mapListLimit=18;const url=new URL(location);url.searchParams.set('stations',mapMode);history.replaceState(history.state,'',url);mapWorkspace();});
document.addEventListener('input',e=>{if(e.target.id==='station-search'){mapListLimit=18;renderMapList();}});
document.addEventListener('change',e=>{if(e.target.id==='state-filter'){mapListLimit=18;renderMapList();}});
document.addEventListener('ecocharge:locale',()=>{if(tab==='map'){renderMap();}});
const mapClientBefore=renderClientTab;
renderClientTab=function(){mapClientBefore();mapWorkspace();};
// Preserve the viewed area when panels or orientation change.
mapResizeObserver.disconnect(); clearTimeout(mapResizeTimer);
let mapFrame;
new ResizeObserver(() => {
  cancelAnimationFrame(mapFrame);
  mapFrame=requestAnimationFrame(() => {if(map && tab==='map' && mapMode==='map' && $('#map').clientWidth)map.invalidateSize({pan:false,animate:false});});
}).observe($('#map'));
