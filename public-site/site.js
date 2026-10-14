'use strict';
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const root = new URL('./', document.baseURI);
  const params = new URL(location.href).searchParams;
  const page = document.documentElement.dataset.page;
  if(page==='plans'){
    const target=new URL('participate/charge/',root);
    target.search=location.search;
    target.hash=location.hash;
    location.replace(target.href);
    return;
  }
  const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg class="ec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const groups = EcoFinance.tiers;
  if (page === 'home' && params.has('view')) {
    // Legacy shared links still open the public home, even with a saved session.
    const clean=new URL(location.href);
    for(const key of ['view','tab','preview'])clean.searchParams.delete(key);
    history.replaceState(null,'',clean);
  }
  // Keep first-touch campaign context for the lead and the sanitized GTM-ready funnel event bridge. Tag IDs are configured only at deployment.
  try {
    const context = {};
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid']) if(params.has(key)) context[key]=params.get(key).slice(0,300);
    if(['website','lead-form'].includes(params.get('lead_route')))context.lead_route=params.get('lead_route');
    if(Object.keys(context).length && !sessionStorage.getItem('ecocharge-attribution')) sessionStorage.setItem('ecocharge-attribution',JSON.stringify(context));
  } catch {}
  const activeNav = $('.ec-nav [aria-current]');
  if(activeNav && activeNav.getBoundingClientRect().right>innerWidth-20) activeNav.parentElement.scrollLeft = Math.max(0,activeNav.offsetLeft-activeNav.parentElement.offsetLeft-20);
  const menu=$('#site-menu'),menuButton=$('#open-site-menu');
  if(menu&&menuButton){
    menuButton.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';$('#close-site-menu').focus();});
    $('#close-site-menu').addEventListener('click',()=>menu.close());
    menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');document.body.style.overflow='';menuButton.focus();});
    menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close();}});
  }
  // Avoid competing with an on-screen main action or the mobile keyboard.
  const mobileAction=$('.ec-mobile-action');
  if(mobileAction && 'IntersectionObserver' in window){
    const visibleActions=new Set();
    const refresh=()=>{mobileAction.hidden=visibleActions.size>0||document.activeElement?.matches('input,select,textarea');};
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting&&entry.intersectionRatio>=.4)visibleActions.add(entry.target);else visibleActions.delete(entry.target);}refresh();},{threshold:[0,.4],rootMargin:'0px 0px -80px 0px'});
    $$('main a.ec-button[href*="register/"],main a.ec-button[href*="guest=1"],html[data-page="club"] main a.ec-button[href*="#request-access"],html[data-page="club"] form button[type="submit"],html[data-page="stations"] .ec-stations-intro .ec-button').forEach(a=>observer.observe(a));
    document.addEventListener('focusin',refresh);document.addEventListener('focusout',()=>setTimeout(refresh,0));
  }

  function wireTabs(selector, callback) {
    const buttons = $$(selector);
    const activate = button => {buttons.forEach(b=>{const selected=b===button;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});callback(button);};
    buttons.forEach((b,i)=>{
      b.addEventListener('click',()=>activate(b));
      b.addEventListener('keydown',e=>{let j;if(['ArrowRight','ArrowDown'].includes(e.key))j=(i+1)%buttons.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))j=(i-1+buttons.length)%buttons.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=buttons.length-1;else return;e.preventDefault();activate(buttons[j]);buttons[j].focus();});
    });
  }
  const preview = $('#preview-panel');
  if(preview){
    const views={plan:preview.innerHTML,stations:`<div class="ec-preview-list"><div><strong>Explore station locations.</strong><small>Photos, addresses and charging details.</small></div></div><div class="ec-preview-bottom"><span>Review locations in the workspace</span><a class="ec-text-link" href="stations/">Browse stations ${arrow}</a></div>`,documents:`<div class="ec-preview-list"><div><strong>Your documents, in one place.</strong><small>Project terms, evidence and signed files.</small></div></div><div class="ec-preview-bottom"><span>Read before making a decision</span><a class="ec-text-link" href="resources/">Open resources ${arrow}</a></div>`};
    wireTabs('[data-preview]',b=>{preview.innerHTML=views[b.dataset.preview];preview.setAttribute('aria-labelledby',b.id);});
  }

  const model=$('#model-panel');
  if(model){
    const views=Object.fromEntries($$('[data-model-template]').map(template=>[template.dataset.modelTemplate,template.innerHTML]));
    wireTabs('[data-model]',b=>{model.innerHTML=views[b.dataset.model];model.setAttribute('aria-labelledby',b.id);});
  }

  const stationBrowser=$('[data-station-browser]'),stationToggle=$('#show-all-stations');
  if(stationBrowser&&stationToggle&&!['country','region','q'].some(key=>params.has(key))){
    stationBrowser.classList.add('is-collapsed');stationToggle.hidden=false;
    stationToggle.addEventListener('click',()=>{stationBrowser.classList.remove('is-collapsed');stationToggle.setAttribute('aria-expanded','true');stationToggle.hidden=true;const target=$('#public-station-search');target?.focus({preventScroll:true});const status=$('#station-results-status');if(status)status.textContent=window.EcoLocale?.language==='ru'?'Все станции доступны. Используйте поиск или фильтры.':'All stations are available. Use search or filters.';});
  }
  const search=$('#public-station-search'),state=$('#public-state-filter'),country=$('#public-country-filter');
  if(search){
    const syncUrl=()=>{if(typeof URL==='undefined'||typeof history==='undefined'||typeof location==='undefined')return;const url=new URL(location.href),values={q:search.value.trim(),country:country?.value||'',region:state.value||''};for(const [key,value]of Object.entries(values))value?url.searchParams.set(key,value):url.searchParams.delete(key);history.replaceState(null,'',url);};
    const filter=(announce=false)=>{const q=search.value.trim().toLowerCase();let count=0;$$('[data-station-card]').forEach(card=>{const match=(!country?.value||card.dataset.country===country.value)&&(!state.value||card.dataset.state===state.value)&&card.dataset.search.includes(q);card.hidden=!match;if(match)count++;});$('#station-empty').hidden=count!==0;if(announce){const status=$('#station-results-status');if(status)status.textContent=count?(window.EcoLocale?.language==='ru'?'Список локаций обновлён.':'Location list updated.'):(window.EcoLocale?.language==='ru'?'Подходящих локаций нет.':'No matching locations.');}};
    search.value=(params.get('q')||'').slice(0,100);
    search.addEventListener('input',()=>{syncUrl();filter(true);});state.addEventListener('change',()=>{syncUrl();filter(true);});
    const regions=selected=>{selected=selected??state.value;const values=[...new Set($$('[data-station-card]').filter(c=>!country?.value||c.dataset.country===country.value).map(c=>c.dataset.state))].sort();state.replaceChildren(new Option(window.EcoLocale?.language==='ru'?'Все регионы':'All regions',''),...values.map(v=>new Option(v,v)));state.value=values.includes(selected)?selected:'';};
    if(country){country.value=['US','CA'].includes(params.get('country'))?params.get('country'):'';country.addEventListener('change',()=>{regions('');syncUrl();filter(true);});regions(params.get('region')||'');}
    $('#clear-station-search').addEventListener('click',()=>{search.value='';if(country)country.value='';regions('');state.value='';syncUrl();filter();search.focus();});
    filter();
  }

  const dialog=$('#site-dialog');
  let lastFocus;
  function openDialog(html){if(!dialog.open)lastFocus=document.activeElement;$('#site-dialog-content').innerHTML=html;dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';$('#close-site-dialog').focus();}
  $('#close-site-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus();});
  let catalogPromise;
  async function catalogs(){
    if(!catalogPromise)catalogPromise=Promise.all(['stations.json','station-photos.json'].map(path=>fetch(new URL(path,root),{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Directory unavailable');return r.json();}))).catch(e=>{catalogPromise=null;throw e;});
    return catalogPromise;
  }
  $$('[data-station]').forEach(b=>b.addEventListener('click',async()=>{
    const id=b.dataset.station;
    openDialog('<div class="ec-dialog-body"><h2 id="site-dialog-title">Loading station details…</h2></div>');
    try{
      const [directory,photos]=await catalogs();
      if(!dialog.open)return;
      const s=directory.stations.find(s=>s.id===Number(id)),p=photos[id],hasPhoto=Boolean(p),gallery=hasPhoto?[p,...(p.gallery||[])]:[];let index=hasPhoto?Math.min(gallery.length-1,Math.max(0,Number(b.dataset.photoIndex)||0)):0;
      const media=hasPhoto?`<div class="ec-dialog-photo"><img id="gallery-image" src="${escape(p.path)}" alt="${escape(p.alt)}" width="900" height="600"></div><div class="ec-gallery-controls"><button type="button" id="gallery-prev" aria-label="Previous photo">←</button><button type="button" id="gallery-next" aria-label="Next photo">→</button></div>`:`<div class="ec-dialog-location-visual" role="img" aria-label="${escape(s.city)}, ${escape(s.state)}"><span>EcoGrid Charge</span><strong>${escape(s.city)}</strong><small>${s.country==='CA'?'Canada':'US'} · ${escape(s.state)}</small></div>`;
      $('#site-dialog-content').innerHTML=`${media}<div class="ec-dialog-body"><span class="ec-kicker">PUBLIC STATION RECORD · ${s.id}</span><span class="station-selection-badge is-open">MARKET REFERENCE</span><h2 id="site-dialog-title">${escape(s.city)}, ${escape(s.state)} · ${s.country==='CA'?'Canada':'US'}</h2><p>${escape(s.name)}<br>${escape(s.address)}, ${escape(s.city)}, ${escape(s.state)} ${escape(s.zip)}</p><dl class="ec-dialog-specs"><div><dt>Operator listing</dt><dd>${escape(s.network)}</dd></div><div><dt>DC charging ports</dt><dd>${s.ports}</dd></div><div><dt>Maximum listed power</dt><dd>${s.maxKw?s.maxKw+' kW':'Not listed'}</dd></div><div><dt>Directory snapshot</dt><dd>${escape(s.confirmed||directory.fetchedAt.slice(0,10))}</dd></div></dl>${window.EcoChargeTrust?.stationEvidence(s)||''}<div class="ec-dialog-actions"><a class="ec-button ec-button-outline" href="${escape(s.source)}" target="_blank" rel="noopener">Open public source ↗</a><a class="ec-button" href="client/?guest=1&tab=map&station=${s.id}">Review in the workspace ${arrow}</a></div></div>`;
      const renderPhoto=()=>{if(!hasPhoto)return;const item=gallery[index];$('#gallery-image').src=item.path;$('#gallery-image').alt=item.alt;$('#gallery-image').style.objectPosition=item.position||'center';$('#gallery-prev').disabled=index===0;$('#gallery-next').disabled=index===gallery.length-1;};
      $('#gallery-prev')?.addEventListener('click',()=>{if(index>0){index--;renderPhoto();}});$('#gallery-next')?.addEventListener('click',()=>{if(index<gallery.length-1){index++;renderPhoto();}});renderPhoto();
    }catch{if(dialog.open)$('#site-dialog-content').innerHTML='<div class="ec-dialog-body"><h2 id="site-dialog-title">The station record could not load.</h2><p>Close this window and open the location again to retry. The photos and addresses on the page remain available.</p></div>';}
  }));
  function showPrivacy(){if(page==='resources'&&location.hash==='#privacy'){const detail=$('#privacy');if(detail){detail.open=true;requestAnimationFrame(()=>detail.scrollIntoView());}}}
  showPrivacy();window.addEventListener('hashchange',showPrivacy);

  window.EcoChargePublic={openDialog};
})();
