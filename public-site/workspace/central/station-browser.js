'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoStationBrowser=api;})(typeof window==='object'?window:globalThis,()=>{
 function rows(stations,state,scope,query='',region='',country=''){const selected=new Set(scope==='portfolio'&&state.plan?.status==='active'?state.plan.stationIds:scope==='saved'?state.exploration?.saved:[]),q=query.trim().toLowerCase();return stations.filter(s=>(scope==='all'||selected.has(s.id))&&(!country||(s.country||'US')===country)&&(!region||s.state===region)&&(!q||`${s.id} ${s.name} ${s.address} ${s.city} ${s.state} ${s.country==='CA'?'Canada Канада':'United States США'}`.toLowerCase().includes(q)));}
 return {rows};
});
if(typeof window==='object'&&window.ECO_SHARED_CONTEXT)(()=>{
 const t=(en,ru)=>window.EcoLocale?.language==='ru'?ru:en;
 filteredStations=()=>EcoStationBrowser.rows(stations,demo,filter,$('#station-search').value,$('#state-filter').value,$('#station-country-filter')?.value||'');
 function countryControl(){
  const region=$('#state-filter');if(!region)return;
  let country=$('#station-country-filter');
  if(!country){const label=document.createElement('label');label.className='station-country-control';label.setAttribute('translate','no');label.innerHTML='<span></span><select id="station-country-filter"><option value=""></option><option value="US"></option><option value="CA"></option></select>';const regionLabel=document.querySelector('label[for="state-filter"]');(regionLabel||region).before(label);country=label.querySelector('select');const requested=new URLSearchParams(location.search).get('country');country.value=['US','CA'].includes(requested)?requested:'';}
  country.previousElementSibling.textContent=t('Country','Страна');
  [...country.options].forEach((o,i)=>o.textContent=[t('All countries','Все страны'),t('United States','США'),t('Canada','Канада')][i]);
  const selected=region.value,values=[...new Set(stations.filter(s=>!country.value||(s.country||'US')===country.value).map(s=>s.state))].sort();
  region.replaceChildren(new Option(t('All regions','Все регионы'),''),...values.map(v=>new Option(v,v)));region.value=values.includes(selected)?selected:'';
 }
 const before=mapWorkspace;
 mapWorkspace=function(){if(tab==='map')countryControl();before();if(tab!=='map')return;let head=$('#station-collections');if(!head){head=document.createElement('section');head.id='station-collections';head.className='station-collections';$('#map-section').before(head);}
  countryControl();head.hidden=false;head.innerHTML=`<h1>${t('Stations','Станции')}</h1><div class="station-scopes" role="group" aria-label="${t('Station collection','Подборка станций')}">${[['portfolio',t('My plan','Мой план'),demo.plan?.status==='active'?demo.plan.stationIds.length:0],['all',t('Directory','Каталог'),stations.length],['saved',t('Saved','Избранное'),explorationState().saved.length]].map(([id,name,count])=>`<button data-station-scope="${id}" aria-pressed="${filter===id}">${name}<small>${count}</small></button>`).join('')}</div><div class="station-country-tabs" role="group" aria-label="${t('Filter by country','Фильтр по стране')}">${[['',t('All countries','Все страны')],['US',t('United States','США')],['CA',t('Canada','Канада')]].map(([code,name])=>`<button type="button" data-station-country="${code}" aria-pressed="${($('#station-country-filter')?.value||'')===code}">${name}<small>${stations.filter(s=>!code||(s.country||'US')===code).length.toLocaleString(window.EcoLocale?.locale||'en-US')}</small></button>`).join('')}</div><p>${t('US and Canadian reference locations from public directories. A selection in a model plan does not establish ownership or live station activity.','Справочные локации США и Канады из публичных каталогов. Выбор в модельном плане не подтверждает владение станциями или их текущую работу.')}</p>`;
  cabStationTools();const tools=$('#cab-station-tools');if(tools){head.after(tools);tools.querySelector('[data-action="journey-saved"]')?.remove();}
  const legacy=$('#map-section .filter-panel');if(legacy){legacy.querySelectorAll('[data-filter]').forEach(b=>b.hidden=true);const title=legacy.querySelector('h2');if(title)title.textContent=t('Location','Местоположение');}
  const legend=$('#map-section .map-legend');if(legend){legend.setAttribute('translate','no');legend.innerHTML='<span class="station-selection-badge is-open">'+t('Open for selection','Доступна для выбора')+'</span><span class="station-selection-badge is-closed">'+t('Enrollment closed','Набор закрыт')+'</span>';}
  if(mapMode==='list'&&!filteredStations().length){const empty=$('#r-station-list .cab-empty');if(empty&&filter==='portfolio'&&demo.plan?.status!=='active')empty.innerHTML=`<h3>${t('No active plan yet','Активного плана пока нет')}</h3><p>${t('Your active plan’s reference stations will appear here. Saved locations stay in Saved.','Здесь появятся справочные станции активного плана. Сохранённые локации находятся в Избранном.')}</p><button class="button secondary" data-station-scope="all">${t('Explore the directory','Открыть каталог')}</button>`;}
 };
 const renderBefore=renderClientTab;renderClientTab=function(){renderBefore();const head=$('#station-collections');if(head)head.hidden=tab!=='map';};
 document.addEventListener('click',e=>{const b=e.target.closest('[data-station-scope]');if(!b)return;filter=b.dataset.stationScope;mapListLimit=18;renderMap();mapWorkspace();actions['fit-map']();});
 document.addEventListener('ecocharge:locale',()=>{if(tab==='map')mapWorkspace();});
 function rememberCountry(value){const url=new URL(location);if(value)url.searchParams.set('country',value);else url.searchParams.delete('country');history.replaceState(history.state,'',url);}
 document.addEventListener('change',e=>{if(e.target.id!=='station-country-filter')return;rememberCountry(e.target.value);countryControl();mapListLimit=18;renderMap();mapWorkspace();actions['fit-map']();});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-station-country]');if(!b)return;const country=$('#station-country-filter');if(!country)return;country.value=b.dataset.stationCountry;rememberCountry(country.value);countryControl();mapListLimit=18;renderMap();mapWorkspace();actions['fit-map']();});
 const reset=actions['r-reset-filters'];actions['r-reset-filters']=()=>{const country=$('#station-country-filter');if(country)country.value='';rememberCountry('');reset();mapWorkspace();};

 // Selection policy is administrative; existing active allocations are retained.
 const closedMessage=()=>t('Enrollment is closed for a selected station. Choose another location.','Набор на выбранную станцию закрыт. Выберите другую локацию.');
 for(const name of ['apply-plan','confirm-plan','save-plan-draft','activate-draft']){const action=actions[name];if(!action)continue;actions[name]=()=>{const ids=name==='activate-draft'?demo.planDraft?.stationIds:chosenStations;if(ids?.some(id=>!canChooseStation(stations.find(s=>s.id===id))))return toast(closedMessage());return action();};}
 const openStation=actions.station;actions.station=()=>{openStation();if(!selected)return;const b=$('#modal [data-action="invest-selected"]');if(b){b.disabled=!canChooseStation(selected);if(b.disabled)b.textContent=t('Enrollment closed','Набор закрыт');b.before(Object.assign(document.createElement('div'),{innerHTML:stationSelectionBadge(selected)}));}};
 document.addEventListener('change',e=>{if(!e.target.matches('[data-pick-station]'))return;const s=stations.find(s=>s.id===Number(e.target.dataset.pickStation));if(!canChooseStation(s)){e.preventDefault();e.stopImmediatePropagation();e.target.checked=false;toast(closedMessage());}},true);
})();
