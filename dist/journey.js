'use strict';

// Client research state is separate from the funded plan and the financial ledger.
function explorationState() {
  const state = demo.exploration ??= {};
  for (const key of ['saved', 'compared', 'recent', 'read']) {
    if (!Array.isArray(state[key])) state[key] = [];
  }
  state.saved = [...new Set(state.saved)].filter(Number.isInteger).slice(0, 50);
  state.compared = [...new Set(state.compared)].filter(Number.isInteger).slice(0, 3);
  state.recent = [...new Set(state.recent)].filter(Number.isInteger).slice(0, 12);
  return state;
}
let discoveryMode = 'discover', discoveryQuery = '', libraryMode = 'discover', libraryQuery = '', libraryLimit = 12;
if (demo.planDraft && !demo.plan) {
  chosenTier=demo.planDraft.tierId;investmentDraft=demo.planDraft.capital;chosenStations=demo.planDraft.stationIds.slice();
}
const journeyStation = id => stations.find(s => s.id === Number(id));
const journeyArrow = () => icon('arrow');
const journeyPhoto = s => stationPhoto(s) || {path:'assets/station-illustration.svg', alt:'Concept illustration, not a photograph', kind:'illustration'};
const journeyLabel = s => `${s.city}, ${s.state}`;
const journeyPendingFunding = () => demo.requests.filter(r => r.type === 'topup' && r.status === 'Pending');

function nextJourneyStep() {
  if (unreadReplies()) return {tag:'A reply is waiting',title:'Continue the conversation.',copy:'Your manager has answered. Read the reply with your plan and questions in one place.',action:'conversations',label:`Read ${unreadReplies()} ${unreadReplies()===1?'reply':'replies'}`};
  if (demo.planDraft) {
    if (draftFundingGap() === 0) return {tag:'Ready to review',title:'Your saved plan is ready.',copy:`${demo.planDraft.name} · ${money(demo.planDraft.capital)} in sample funds. Review your selection before activating it.`,action:'journey-resume',label:'Review saved plan'};
    if (journeyPendingFunding().length) return {tag:'Request pending',title:'Your request is with the manager.',copy:'Your plan is saved. You can explore locations or ask a question while the demo funding request is reviewed.',action:'history',label:'View request status'};
    return {tag:'Pick up where you left off',title:'Your plan. Saved for later.',copy:`${demo.planDraft.name} · ${demo.planDraft.stationIds.length} stations · ${money(demo.planDraft.capital)}. Continue when you are ready.`,action:'journey-resume',label:'Continue my plan'};
  }
  if (isActivePlan()) return {tag:'Your demo plan is active',title:'Your charging workspace.',copy:`Review your ${demo.plan.stationIds.length} reference stations, account activity and manager conversations.`,action:'journey-my-plan',label:'Open my plan'};
  return {tag:'Start with a real location',title:'Find your place in EV charging.',copy:'Explore the stations. Save what interests you. Build a demo plan at your own pace.',action:'journey-discover',label:'Explore the stations'};
}

function journeyRows(mode,query='') {
  const state=explorationState();
  const ids=mode==='saved'?state.saved:mode==='recent'?state.recent:(window.ECOCHARGE_STATION_VISUALS?.featuredIds||[]).filter(id=>photoCatalog[id]||demo.stationPhotos?.[id]);
  const q=query.trim().toLowerCase();
  return ids.map(journeyStation).filter(Boolean).filter(s=>`${s.city} ${s.state} ${s.name} ${s.address} ${s.id}`.toLowerCase().includes(q));
}

function journeyCard(s) {
  const p=journeyPhoto(s),state=explorationState(),saved=state.saved.includes(s.id),compared=state.compared.includes(s.id);
  return `<article class="j-station-card"><button class="j-station-photo" data-journey-open="${s.id}" aria-label="View ${escapeHtml(journeyLabel(s))}"><img src="${escapeHtml(p.path)}" alt="${escapeHtml(p.alt)}" width="600" height="400" loading="lazy" decoding="async" style="object-position:${escapeHtml(p.position||'center')}"><span>${p.kind==='illustration'?'Illustration':`${1+(p.gallery?.length||0)} ${(p.gallery?.length)?'photos':'photo'}`} ${journeyArrow()}</span></button><div class="j-station-body"><button class="j-station-title" data-journey-open="${s.id}">${escapeHtml(journeyLabel(s))}</button><p>${escapeHtml(s.name.replace(/\s*\([^)]*\)\s*$/,''))}</p><div class="j-station-specs"><span>${s.ports} DC ports</span><span>${s.maxKw?`Up to ${s.maxKw} kW`:'Power not listed'}</span></div><div class="j-station-actions"><button data-journey-save="${s.id}" aria-pressed="${saved}" aria-label="${saved?'Unsave':'Save'} ${escapeHtml(journeyLabel(s))}">${icon('assets')} ${saved?'Saved':'Save'}</button><button data-journey-compare="${s.id}" aria-pressed="${compared}" aria-label="${compared?'Remove':'Add'} ${escapeHtml(journeyLabel(s))} ${compared?'from':'to'} comparison">${icon('grid')} ${compared?'Added':'Compare'}</button></div></div></article>`;
}

function journeyFilters(mode,scope) {
  const state=explorationState();
  return `<div class="j-filters" role="group" aria-label="Station collection">${[['discover','Discover'],['saved',`Saved · ${state.saved.length}`],['recent','Recently viewed']].map(([id,label])=>`<button data-journey-filter="${id}" data-scope="${scope}" aria-pressed="${mode===id}">${label}</button>`).join('')}</div>`;
}

function journeyEmpty(mode,query) {
  const title=query?'No matching locations':mode==='saved'?'A place for your shortlist.':mode==='recent'?'Your research starts here.':'The station photos are loading.';
  const copy=query?'Try a city, state abbreviation or station name.':mode==='saved'?'Tap Save on any station. It stays here without adding anything to your investment plan.':mode==='recent'?'Open a station to see its photos and equipment. You can return to it here.':'The public directory remains available in Stations.';
  return `<div class="j-empty">${icon('map')}<h3>${title}</h3><p>${copy}</p><button class="button secondary" data-action="journey-reset-discovery">${query?'Clear search':'Browse stations'}</button></div>`;
}

function comparisonStrip() {
  const selected=explorationState().compared.map(journeyStation).filter(Boolean);
  if(!selected.length)return '';
  return `<div class="j-compare-strip"><div><strong>${selected.length} / 3 in comparison</strong><div class="j-compare-chips">${selected.map(s=>`<button data-journey-compare="${s.id}" aria-label="Remove ${escapeHtml(s.city)} from comparison">${escapeHtml(s.city)} <span>×</span></button>`).join('')}</div></div><button class="button primary" data-action="journey-compare" ${selected.length<2?'disabled':''}>Compare ${selected.length} stations ${journeyArrow()}</button>${selected.length<2?'<small>Add one more station to compare.</small>':''}</div>`;
}

function renderDiscovery() {
  const root=$('#journey-discover');if(!root)return;
  const rows=journeyRows(discoveryMode,discoveryQuery);
  root.querySelector('.j-filter-slot').innerHTML=journeyFilters(discoveryMode,'home');
  root.querySelector('.j-discovery-count').textContent=`${rows.length} ${rows.length===1?'location':'locations'}${discoveryMode==='discover'?' with real photos':''}`;
  root.querySelector('.j-discovery-grid').innerHTML=rows.length?rows.slice(0,3).map(journeyCard).join(''):journeyEmpty(discoveryMode,discoveryQuery);
  root.querySelector('.j-comparison-slot').innerHTML=comparisonStrip();
  const more=root.querySelector('[data-action="journey-library"]');more.textContent=`View ${discoveryMode==='saved'?'saved locations':discoveryMode==='recent'?'recent locations':`all ${rows.length} locations`} →`;more.hidden=!rows.length;
}

function journeyEvents() {
  const items=[
    ...demo.requests.map(r=>({date:r.date,title:`Demo ${r.type==='topup'?'funding':'withdrawal'} · ${money(r.amount)}`,detail:r.status,action:'history',symbol:r.status==='Pending'?'calendar':'check'})),
    ...demo.tickets.map(t=>({date:t.repliedAt||t.date,title:t.reply?'Manager replied':t.subject||'Question saved',detail:t.reply?'Open conversation':'Awaiting a demo reply',thread:t.id,symbol:'chat'})),
    ...demo.sessions.filter(s=>s.period==='week').map(s=>({date:s.date,title:`Weekly demo credit · ${money(s.payout)}`,detail:`Period starting ${s.weekStart}`,credit:s.id,symbol:'zap'}))
  ];
  return items.filter(e=>!Number.isNaN(Date.parse(e.date))).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,3);
}

function renderJourney() {
  if(workspaceRole!=='client')return;
  const state=explorationState();
  let tools=$('#journey-toolbar');
  if(!tools){tools=document.createElement('div');tools.id='journey-toolbar';tools.className='j-toolbar';$('.topbar').after(tools);}
  tools.innerHTML=`<span>Your workspace</span><div><button data-action="journey-saved">${icon('assets')} Saved <b>${state.saved.length}</b></button><button data-action="journey-compare">${icon('grid')} Compare <b>${state.compared.length}</b></button><button data-action="conversations">${icon('chat')} Inbox${unreadReplies()?` <b class="j-unread">${unreadReplies()}</b>`:''}</button></div>`;
  const welcome=$('#client-next-step');if(!welcome)return;
  let root=$('#journey-dashboard');
  if(!root){root=document.createElement('div');root.id='journey-dashboard';welcome.after(root);}
  root.hidden=tab!=='dashboard';
  if(tab!=='dashboard')return;
  const step=nextJourneyStep(),spot=journeyStation(state.recent[0]||state.saved[0]||121704)||stations[0],photo=spot?journeyPhoto(spot):null;
  welcome.classList.add('j-hero');
  welcome.innerHTML=`<div class="j-hero-copy"><span class="j-eyebrow">${escapeHtml(demo.client.name)} / YOUR ECOCHARGE ACCOUNT</span><span class="j-state-tag">${escapeHtml(step.tag)}</span><h2>${step.title}</h2><p>${step.copy}</p><div class="j-hero-actions"><button class="button primary" data-action="${step.action}">${step.label} ${journeyArrow()}</button><button class="j-text-button" data-action="manager">Ask my manager ${icon('chat')}</button></div><small>Your choices are saved in this browser. No real payments.</small></div>${spot?`<button class="j-hero-location" data-journey-open="${spot.id}" aria-label="Explore ${escapeHtml(journeyLabel(spot))}"><img src="${escapeHtml(photo.path)}" alt="${escapeHtml(photo.alt)}" width="750" height="500" decoding="async"><span class="j-location-label">${state.recent.length?'CONTINUE EXPLORING':'A CLOSER LOOK'}</span><span class="j-location-caption"><strong>${escapeHtml(journeyLabel(spot))}</strong><span>${spot.ports} DC ports · ${photo.kind==='illustration'?'Concept illustration':'Public location photo'}</span>${journeyArrow()}</span></button>`:''}`;
  const plan=isActivePlan()?demo.plan:demo.planDraft,credits=demo.sessions.filter(s=>s.period==='week').reduce((n,s)=>n+s.payout,0),events=journeyEvents();
  root.innerHTML=`<nav class="j-path" aria-label="Explore your account"><button data-action="journey-discover">${icon('map')}<span>Explore stations<small>${state.recent.length?`${state.recent.length} viewed`:'Photos & equipment'}</small></span>${journeyArrow()}</button><button data-action="journey-resume">${icon('grid')}<span>${plan?'Review my plan':'Build a plan'}<small>${plan?`${escapeHtml(plan.name)} · ${money(plan.capital)}`:'Your amount & selection'}</small></span>${journeyArrow()}</button><button data-action="journey-documents">${icon('file')}<span>Read the terms<small>${state.read.includes('documents')?'Documents visited':'Preview before deciding'}</small></span>${journeyArrow()}</button><button data-action="manager">${icon('chat')}<span>Ask your manager<small>${unreadReplies()?`${unreadReplies()} unread replies`:'Keep your questions together'}</small></span>${journeyArrow()}</button></nav>
    <section class="j-account panel ${plan?'':'j-account-empty'}"><div class="j-heading"><div><span class="j-eyebrow">ACCOUNT SNAPSHOT</span><h2>Your demo, at a glance.</h2></div><div class="j-snapshot-actions"><button class="j-text-button" data-action="withdraw">Withdraw</button><button class="j-text-button" data-action="history">Activity ${journeyArrow()}</button></div></div><dl class="j-account-values"><div><dt>Available balance</dt><dd>${money(demo.balance)}</dd><button data-action="topup">Add demo funds ${journeyArrow()}</button></div><div><dt>${isActivePlan()?'Invested demo capital':'Saved plan amount'}</dt><dd>${plan?money(plan.capital):'Your next step'}</dd>${!plan?'<button data-action="journey-resume">Build a demo plan →</button>':''}<small>${isActivePlan()?`${escapeHtml(plan.name)} · active`:plan?'Draft · not funded':'Build a plan to see your example'}</small></div><div><dt>One-week illustration</dt><dd>${plan?money(weeklyCredit(plan.capital,plan.rate)):'—'}</dd><small>${plan?`${plan.rate}% × ${money(plan.capital)} · no compounding`:'Your amount × selected weekly rate'}</small></div><div><dt>Recorded weekly credits</dt><dd>${money(credits)}</dd><button data-action="sessions">View calculations ${journeyArrow()}</button></div></dl></section>
    <section id="journey-discover" class="j-discover"><div class="j-heading"><div><span class="j-eyebrow">FIND. SAVE. COMPARE.</span><h2>Get to know the stations.</h2></div><button class="j-text-button" data-action="explore-map">Open map ${icon('map')}</button></div><div class="j-discovery-controls"><div class="j-filter-slot"></div><label class="j-search">${icon('search')}<input id="journey-search" type="search" value="${escapeHtml(discoveryQuery)}" placeholder="City, state or station…" aria-label="Search your station collection"></label></div><p class="j-discovery-count" role="status"></p><div class="j-discovery-grid"></div><div class="j-discover-footer"><p>Public records and photos. Ownership and live availability are not established.</p><button class="j-text-button" data-action="journey-library">View all locations →</button></div><div class="j-comparison-slot"></div></section>
    <div class="j-bottom-grid"><section class="j-manager panel"><span class="j-eyebrow">YOUR POINT OF CONTACT</span><div class="j-manager-identity"><span class="j-manager-avatar">${escapeHtml(demo.manager.name.split(/\s+/).map(v=>v[0]).slice(0,2).join(''))}</span><div><h2>${escapeHtml(demo.manager.name)}</h2><p>Demo manager · local inbox</p></div><button class="j-text-button" data-action="conversations">Inbox ${unreadReplies()?`(${unreadReplies()})`:''} ${journeyArrow()}</button></div><h3>What would help you decide?</h3><div class="j-question-list"><button data-journey-question="plan">Help me understand my plan ${journeyArrow()}</button><button data-journey-question="documents">What proves ownership? ${journeyArrow()}</button><button data-journey-question="account">Explain access to my funds ${journeyArrow()}</button></div><div class="j-manager-actions"><button class="button primary" data-action="manager">Write a question ${icon('chat')}</button><button class="j-text-button" data-contact-topic="call">Request a call ${journeyArrow()}</button></div></section>
    <section class="j-activity panel"><div class="j-heading"><div><span class="j-eyebrow">YOUR LATEST ACTIVITY</span><h2>Everything has a next step.</h2></div></div>${events.length?`<div class="j-event-list">${events.map(e=>`<button ${e.thread?`data-thread="${escapeHtml(e.thread)}"`:e.credit?`data-credit-detail="${escapeHtml(e.credit)}"`:`data-action="${e.action}"`}>${icon(e.symbol)}<span><strong>${escapeHtml(e.title)}</strong><small>${escapeHtml(e.detail)} · ${escapeHtml(new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric'}).format(new Date(e.date)))}</small></span>${journeyArrow()}</button>`).join('')}</div>`:'<div class="j-activity-empty">'+icon('calendar')+'<h3>Your activity will appear here.</h3><p>Saved requests, manager replies and recorded demo credits each have a clear status.</p><button class="j-text-button" data-action="journey-guide">Take a quick account tour '+journeyArrow()+'</button></div>'}</section></div>
    <section class="j-help-strip"><span>${icon('shield')} Understand the model before choosing a plan.</span><button data-action="journey-guide">A quick walkthrough ${journeyArrow()}</button><a href="terms/">Terms & risks ↗</a></section>`;
  renderDiscovery();
}

function openJourneyLibrary(mode=discoveryMode,query='') {
  libraryMode=mode;libraryQuery=query;libraryLimit=12;
  openModal(`<div class="j-eyebrow">YOUR STATION NOTEBOOK</div><h2>Explore. Keep. Compare.</h2><p>Saving a location keeps it in your shortlist. It does not invest funds.</p><div id="journey-library"><div class="j-library-filters"></div><label class="j-search">${icon('search')}<input id="journey-library-search" type="search" placeholder="City, state or station…" aria-label="Search station notebook"></label><p class="j-library-count" role="status"></p><div class="j-library-grid"></div><button class="button secondary" data-action="journey-more">Show more locations</button><div class="j-library-compare"></div></div>`);
  $('#modal').classList.add('j-wide-dialog');$('#journey-library-search').value=query;renderJourneyLibrary();
}

function renderJourneyLibrary() {
  const el=$('#journey-library');if(!el)return;const rows=journeyRows(libraryMode,libraryQuery);
  el.querySelector('.j-library-filters').innerHTML=journeyFilters(libraryMode,'library');
  el.querySelector('.j-library-count').textContent=`${rows.length} ${rows.length===1?'location':'locations'}`;
  el.querySelector('.j-library-grid').innerHTML=rows.length?rows.slice(0,libraryLimit).map(journeyCard).join(''):journeyEmpty(libraryMode,libraryQuery);
  el.querySelector('[data-action="journey-more"]').hidden=rows.length<=libraryLimit;
  el.querySelector('.j-library-compare').innerHTML=comparisonStrip();
}

function showJourneyComparison() {
  const rows=explorationState().compared.map(journeyStation).filter(Boolean);
  if(rows.length<2){openModal(`<h2>Compare stations side by side.</h2><p>Choose two or three locations to compare their address, charging equipment and photo sources.</p><p>${rows.length?'One station is selected. Add another from the collection.':'Tap Compare on a station card to start.'}</p><button class="button primary" data-action="journey-browse-all">Find stations ${journeyArrow()}</button>`);return;}
  openModal(`<div class="j-eyebrow">YOUR COMPARISON · ${rows.length} LOCATIONS</div><h2>See the differences clearly.</h2><p>Equipment information comes from public records. Port counts and power do not establish revenue, returns or current availability.</p><div class="j-compare-grid" style="--compare-columns:${rows.length}">${rows.map(s=>{const p=journeyPhoto(s);return `<article><img src="${escapeHtml(p.path)}" alt="${escapeHtml(p.alt)}" width="600" height="400"><h3>${escapeHtml(journeyLabel(s))}</h3><p>${escapeHtml(s.address)}</p><dl><div><dt>DC fast ports</dt><dd>${s.ports}</dd></div><div><dt>Maximum listed power</dt><dd>${s.maxKw?`${s.maxKw} kW`:'Not listed'}</dd></div><div><dt>Connectors</dt><dd>${escapeHtml(Array.isArray(s.connectors)?s.connectors.join(', '):s.connectors||'See source')}</dd></div><div><dt>Network</dt><dd>Electrify America</dd></div><div><dt>Photo source</dt><dd><a href="${escapeHtml(p.source||s.source)}" target="_blank" rel="noopener">${p.kind==='illustration'?'Illustration · record ↗':'View source ↗'}</a></dd></div></dl><button class="button secondary" data-journey-open="${s.id}">Inspect location ${journeyArrow()}</button><button class="j-text-button" data-journey-use="${s.id}">Use in plan builder ${journeyArrow()}</button></article>`}).join('')}</div><div class="j-comparison-footer"><button class="button primary" data-action="journey-ask-comparison">Ask my manager about these ${icon('chat')}</button><button class="j-text-button" data-action="journey-clear-comparison">Clear comparison</button></div>`);
  $('#modal').classList.add('j-wide-dialog');
}

const journeyLessons=[
  {title:'Start with the charging business.',text:'In the proposed model, drivers pay to charge their cars. Electricity, site costs, maintenance and other expenses reduce the amount that could be distributed.',detail:'This demo does not receive live charging payments or operating revenue.',action:'engine-details',label:'Explore the revenue model'},
  {title:'See exactly how the example works.',text:'Choose an amount from $250 and a reference station group. The group determines the weekly demo rate; the amount determines the dollar illustration.',detail:'Amount × weekly rate. No compounding and no extra credit per charging car. Rates are illustrative and are not supported by operating data in this demo.',action:'journey-resume',label:'Open the plan builder'},
  {title:'Know what still needs evidence.',text:'The legal issuer, the proposed 43% company interest, operating revenue and final client terms still need documentation. A public station photo does not establish ownership.',detail:'Preview the sample documents, then put your questions to the demo manager. Saving or exploring a station does not commit funds.',action:'journey-documents',label:'Read the sample documents'}
];
function showJourneyLesson(index=0) {
  const lesson=journeyLessons[index];if(!lesson)return;
  const state=explorationState();if(!state.read.includes('guide-'+index)){state.read.push('guide-'+index);persist();}
  openModal(`<span class="j-eyebrow">A QUICK ACCOUNT WALKTHROUGH · ${index+1} / 3</span><h2>${lesson.title}</h2><div class="j-lesson-tabs" role="group" aria-label="Walkthrough chapter">${['The business','The calculation','The documents'].map((label,n)=>`<button data-journey-lesson="${n}" aria-pressed="${index===n}">${label}</button>`).join('')}</div><p class="j-lesson-copy">${lesson.text}</p><div class="modal-note">${lesson.detail}</div><div class="j-lesson-actions"><button class="button primary" data-action="${lesson.action}">${lesson.label} ${journeyArrow()}</button>${index<2?`<button class="j-text-button" data-journey-lesson="${index+1}">Next chapter ${journeyArrow()}</button>`:'<button class="j-text-button" data-journey-question="documents">Ask a question '+icon('chat')+'</button>'}</div>`);
}

actions['journey-discover']=()=>{$('#modal').close();tab='dashboard';renderClientTab();$('#journey-discover').scrollIntoView({behavior:'instant',block:'start'});};
actions['journey-my-plan']=()=>{$('#modal').close();tab='assets';renderClientTab();window.scrollTo({top:0,behavior:'instant'});};
actions['journey-resume']=()=>{const p=demo.planDraft||demo.plan;if(p){chosenTier=p.tierId;investmentDraft=p.capital;chosenStations=p.stationIds.slice();}$('#modal').close();tab='tariffs';renderClientTab();window.scrollTo({top:0,behavior:'instant'});};
actions['journey-documents']=()=>{const state=explorationState();if(!state.read.includes('documents')){state.read.push('documents');persist();}$('#modal').close();tab='documents';renderClientTab();window.scrollTo({top:0,behavior:'instant'});};
actions['journey-saved']=()=>openJourneyLibrary('saved');
actions['journey-library']=()=>openJourneyLibrary(discoveryMode,discoveryQuery);
actions['journey-browse-all']=()=>openJourneyLibrary('discover');
actions['journey-more']=()=>{libraryLimit+=12;renderJourneyLibrary();};
actions['journey-compare']=showJourneyComparison;
actions['journey-clear-comparison']=()=>{explorationState().compared=[];persist();openJourneyLibrary('discover');toast('Comparison cleared. Your saved stations are kept.');};
actions['journey-guide']=()=>showJourneyLesson(0);
actions['journey-reset-discovery']=()=>{discoveryMode='discover';discoveryQuery='';if($('#journey-library')){libraryMode='discover';libraryQuery='';$('#journey-library-search').value='';renderJourneyLibrary();}else{renderJourney();}};
actions['journey-ask-comparison']=()=>{const rows=explorationState().compared.map(journeyStation).filter(Boolean);contactComposer('station',{entry:'station-comparison',topic:'station',stationIds:rows.map(s=>s.id),stationName:rows.map(journeyLabel).join(' / ')});$('#support-message').value='Please help me review these reference locations: '+rows.map(s=>`${journeyLabel(s)} (AFDC ${s.id})`).join('; ')+'. What equipment and ownership evidence should I check?';};

document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||workspaceRole!=='client')return;
  if(b.dataset.journeySave||b.dataset.journeyCompare){
    const key=b.dataset.journeySave?'saved':'compared',id=Number(b.dataset.journeySave||b.dataset.journeyCompare),state=explorationState();if(!journeyStation(id))return;
    const included=state[key].includes(id);
    if(!included&&state[key].length>=(key==='compared'?3:50)){toast(key==='compared'?'Compare up to three stations. Remove one to add another.':'Your shortlist holds up to 50 stations.');return;}
    state[key]=included?state[key].filter(v=>v!==id):[...state[key],id];persist();renderJourneyLibrary();renderJourneyPlan();updateJourneyStationActions();
    const attr=key==='saved'?'data-journey-save':'data-journey-compare';const replacement=$$(`[${attr}="${id}"]`).find(el=>el.getClientRects().length);replacement?.focus({preventScroll:true});
    toast(key==='saved'?(included?'Station removed from your shortlist.':'Station saved. Your investment plan is unchanged.'):(included?'Removed from comparison.':'Added to comparison.'));
  }else if(b.dataset.journeyOpen){selectStation(Number(b.dataset.journeyOpen));actions.station();}
  else if(b.dataset.journeyUse){selectStation(Number(b.dataset.journeyUse));actions['invest-selected']();window.scrollTo({top:0,behavior:'instant'});}
  else if(b.dataset.journeyFilter){if(b.dataset.scope==='library'){libraryMode=b.dataset.journeyFilter;libraryLimit=12;renderJourneyLibrary();}else{discoveryMode=b.dataset.journeyFilter;renderDiscovery();}const root=b.dataset.scope==='library'?$('#journey-library'):$('#journey-discover');root?.querySelector(`[data-journey-filter="${b.dataset.journeyFilter}"]`)?.focus({preventScroll:true});}
  else if(b.dataset.journeyLesson!==undefined)showJourneyLesson(Number(b.dataset.journeyLesson));
  else if(b.dataset.journeyQuestion){const p=demo.planDraft||demo.plan;contactComposer(b.dataset.journeyQuestion,b.dataset.journeyQuestion==='plan'&&p?{entry:tab,topic:'plan',plan:p.name,capital:p.capital,rate:p.rate,stationIds:p.stationIds.slice()}:null);if(b.dataset.journeyQuestion==='account')$('#support-message').value='Please explain the proposed fees, withdrawal conditions and access to funds. Which terms still need to be finalized?';}
});
document.addEventListener('input',e=>{if(e.target.id==='journey-search'){discoveryQuery=e.target.value;renderDiscovery();}if(e.target.id==='journey-library-search'){libraryQuery=e.target.value;libraryLimit=12;renderJourneyLibrary();}});

function updateJourneyStationActions() {
  const el=$('#journey-station-actions');if(!el||!selected)return;const state=explorationState();
  el.innerHTML=`<button data-journey-save="${selected.id}" aria-pressed="${state.saved.includes(selected.id)}">${icon('assets')} ${state.saved.includes(selected.id)?'Saved to shortlist':'Save station'}</button><button data-journey-compare="${selected.id}" aria-pressed="${state.compared.includes(selected.id)}">${icon('grid')} ${state.compared.includes(selected.id)?'Added to comparison':'Compare station'}</button><button data-action="journey-compare">Open comparison ${journeyArrow()}</button>`;
}
const stationBeforeJourney=actions.station;
actions.station=function(){if(workspaceRole==='client'&&selected){const state=explorationState();state.recent=[selected.id,...state.recent.filter(id=>id!==selected.id)].slice(0,12);persist();}stationBeforeJourney();if(workspaceRole==='client'&&selected){$('#modal-content .station-dialog-photo')?.insertAdjacentHTML('afterend','<div id="journey-station-actions" class="j-station-tools"></div>');updateJourneyStationActions();}};
const modalBeforeJourney=openModal;
openModal=function(html){$('#modal').classList.remove('j-wide-dialog');modalBeforeJourney(html);};
const contactBeforeJourney=renderContactSurfaces;
renderContactSurfaces=function(){contactBeforeJourney();renderJourney();};
const clientBeforeJourney=renderClientTab;
renderClientTab=function(){clientBeforeJourney();renderJourney();renderJourneyPlan();};
const photoBeforeJourney=updateStationPhoto;
updateStationPhoto=function(s){photoBeforeJourney(s);renderJourney();};
const initBeforeJourney=init;
init=async function(){await initBeforeJourney();renderJourney();};

function renderJourneyPlan() {
  if(workspaceRole!=='client'||tab!=='assets')return;
  const root=$('#asset-list'),plan=demo.planDraft||demo.plan;if(!root)return;
  if(!plan){root.innerHTML=`<div class="j-empty">${icon('assets')}<h3>Make this plan your own.</h3><p>Your saved stations are research. Choose an amount and a station group to create a separate demo plan.</p><button class="button primary" data-action="journey-resume">Build my demo plan ${journeyArrow()}</button><button class="j-text-button" data-action="journey-saved">Open saved stations ${journeyArrow()}</button></div>`;return;}
  root.innerHTML=`<section class="j-plan-summary"><span class="j-eyebrow">${demo.planDraft?'SAVED DRAFT · NOT ACTIVATED':'ACTIVE DEMO ALLOCATION'}</span><h2>${escapeHtml(plan.name)} · ${money(plan.capital)}</h2><p>${plan.stationIds.length} reference stations · ${plan.rate}% per week · ${money(weeklyCredit(plan.capital,plan.rate))} weekly illustration.</p><div><button class="button primary" data-action="journey-resume">${demo.planDraft?'Continue saved plan':'Review plan choices'} ${journeyArrow()}</button><button class="button secondary" data-action="preview-contract">Preview sample agreement ${icon('file')}</button></div>${demo.planDraft&&demo.plan?'<p>Your existing active allocation stays unchanged until this draft is activated.</p>':''}</section><div class="j-plan-stations">${plan.stationIds.map(journeyStation).filter(Boolean).map(journeyCard).join('')}</div>`;
}
