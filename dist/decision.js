'use strict';

const decisionTrack=(...args)=>window.EcoChargeFunnel?.track(...args);
function keepWorkingExample(){
  if(workspaceRole!=='client')return;
  const amount=$('#investment-amount')?Number($('#investment-amount').value):investmentDraft;
  if(!validDemoInvestment(amount))return;
  try{sessionStorage.setItem('ecocharge-working-plan',JSON.stringify({tierId:chosenTier,capital:amount,stationIds:chosenStations.slice()}));}catch{}
}
function isGuest(){try{return workspaceRole==='client'&&JSON.parse(sessionStorage.getItem('ecocharge-entry:client')||'{}').guest===true;}catch{return false;}}
function planIsComplete(){const tier=demo.tariffs.find(t=>t.id===chosenTier);return tier&&validDemoInvestment(investmentDraft)&&new Set(chosenStations).size===tier.count&&chosenStations.every(id=>stations.some(s=>s.id===id));}
function decisionSaveForRegistration(){
  if(!planIsComplete()){toast('Choose a valid amount and the required reference stations first.');return;}
  try{sessionStorage.setItem('ecocharge-plan-review',JSON.stringify(planTerms()));location.assign(new URL('register/?next=assets',document.baseURI));}
  catch{toast('Browser storage is unavailable. Allow site storage to keep your selection.');}
}

const applyBeforeDecision=actions['apply-plan'];
actions['apply-plan']=()=>{
  applyBeforeDecision();
  if(!planIsComplete()||!$('#modal').open||!$('#modal [data-action="confirm-plan"]'))return;
  const p=planTerms();decisionTrack('plan_reviewed',{tier:p.tierId});
  const rows=p.stationIds.map(journeyStation).filter(Boolean);
  $('#modal-content h2').textContent='Review your sample plan';
  $('#modal-content .modal-list').insertAdjacentHTML('afterend',`<div class="d-review-stations">${rows.map(s=>`<span>${icon('pin')}${escapeHtml(journeyLabel(s))}</span>`).join('')}</div><div class="d-review-terms"><h3>Before you save</h3><dl><div><dt>Your ownership rights</dt><dd>Not created by this demo</dd></div><div><dt>Fees & access to capital</dt><dd>Final terms pending</dd></div><div><dt>Basis of the weekly rate</dt><dd>Unverified demo assumption</dd></div></dl><p>Selecting more locations changes the demo input. It does not establish a higher real return.</p><a href="terms/" target="_blank" rel="noopener" data-decision-terms>Read rights, fees & exit conditions ↗</a></div>`);
  const b=$('#modal [data-action="confirm-plan"]');
  if(isGuest()){
    b.dataset.action='decision-register-plan';b.textContent='Save with a demo profile →';
    $('#modal-content .modal-note').textContent='Next: add a display name to keep this plan in your demo account. No payment, server account or investment is created.';
  }
  b.insertAdjacentHTML('afterend','<button class="button secondary" data-action="decision-ask-plan">Ask about this plan</button>');
};
actions['decision-register-plan']=decisionSaveForRegistration;
actions['decision-ask-plan']=()=>{
  if(!planIsComplete())return;
  const p=planTerms();contactComposer('plan',{entry:'plan-review',topic:'plan',plan:p.name,capital:p.capital,rate:p.rate,stationIds:p.stationIds.slice()});
  $('#support-message').value=(window.EcoLocale?.t('I am reviewing this sample plan. Please explain the proposed investment rights, the evidence supporting the rate, fees and access to funds.')||'I am reviewing this sample plan. Please explain the proposed investment rights, the evidence supporting the rate, fees and access to funds.');
};
const confirmBeforeDecision=actions['confirm-plan'];
actions['confirm-plan']=()=>{if(isGuest()){decisionSaveForRegistration();return;}confirmBeforeDecision();if(demo.planDraft||isActivePlan()){try{sessionStorage.removeItem('ecocharge-working-plan');}catch{}decisionTrack('plan_saved',{tier:(demo.planDraft||demo.plan).tierId});}};

const decisionTabs=()=>`<nav class="d-plan-tabs" aria-label="Plan workspace"><button data-action="journey-resume" aria-current="${tab==='tariffs'?'page':'false'}">Build an example</button><button data-action="journey-my-plan" aria-current="${tab==='assets'?'page':'false'}">${isActivePlan()?'Active plan':demo.planDraft?'Saved plan':'Your selection'}</button></nav>`;
function renderDecisionSurfaces(){
  if(workspaceRole!=='client')return;
  document.documentElement.dataset.guest=String(isGuest());
  if(isGuest()){$('#profile-name').textContent='Guest';$('.profile .avatar').textContent='G';$('#profile-role').textContent='EXPLORING';}
  const tools=$('#journey-toolbar');if(tools){
    const state=explorationState();
    tools.querySelector('[data-action="journey-saved"]').hidden=!state.saved.length;
    tools.querySelector('[data-action="journey-compare"]').hidden=!state.compared.length;
    tools.hidden=!state.saved.length&&!state.compared.length&&!unreadReplies();
  }
  const welcome=$('#client-next-step');
  if(isGuest()&&welcome){const eyebrow=welcome.querySelector('.j-eyebrow');if(eyebrow)eyebrow.textContent='YOUR ECOCHARGE DEMO / GUEST';}
  let tabs=$('#decision-plan-tabs');
  if(['assets','tariffs'].includes(tab)){
    if(!tabs){tabs=document.createElement('div');tabs.id='decision-plan-tabs';$('#client-view').prepend(tabs);}
    tabs.hidden=false;tabs.innerHTML=decisionTabs();
  }else if(tabs)tabs.hidden=true;
  const heading=$('#tariffs-section .section-heading p');
  if(heading)heading.textContent='Choose reference locations and inspect a weekly demo calculation.';
  const builder=$('#tariffs-section');
  if(builder&&tab==='tariffs'){
    const apply=builder.querySelector('[data-action="apply-plan"]');if(apply)apply.textContent='Review my example →';
    if(!$('#decision-model-link'))builder.insertAdjacentHTML('afterbegin','<a id="decision-model-link" class="d-model-link" href="inside-a-station/">'+icon('zap')+' How charging activity and costs affect the business <span>→</span></a>');
  }
  const dashboard=$('#journey-dashboard');
  if(dashboard&&tab==='dashboard'&&!isActivePlan()){
    let steps=$('#decision-roadmap');
    if(!steps){steps=document.createElement('section');steps.id='decision-roadmap';steps.className='d-roadmap';dashboard.prepend(steps);}
    const saved=Boolean(demo.planDraft);
    steps.innerHTML=`<div><span class="j-eyebrow">A CLEAR PATH THROUGH THE DEMO</span><h2>Understand. Explore. Decide.</h2></div><ol><li><a href="inside-a-station/"><span>1</span><div><strong>Understand the business</strong><small>Try the operating-cost example</small></div>${journeyArrow()}</a></li><li><button data-action="journey-resume"><span>2</span><div><strong>${saved?'Review your saved example':'Build your own example'}</strong><small>${saved?'Your selection is kept in this browser':'Choose stations and a sample amount'}</small></div>${journeyArrow()}</button></li><li><button data-action="journey-documents"><span>3</span><div><strong>Review the terms</strong><small>Rights, evidence, fees and access</small></div>${journeyArrow()}</button></li></ol>`;
  }
}
const decisionClientBefore=renderClientTab;
renderClientTab=function(){decisionClientBefore();renderDecisionSurfaces();};
const decisionJourneyBefore=renderJourney;
renderJourney=function(){decisionJourneyBefore();renderDecisionSurfaces();};
const decisionTariffsBefore=renderTariffs;
renderTariffs=function(){decisionTariffsBefore();renderDecisionSurfaces();};

const decisionStationBefore=actions.station;
actions.station=function(){decisionStationBefore();if(selected)decisionTrack('station_viewed',{stationId:selected.id});};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-journey-save]');if(b&&explorationState().saved.includes(Number(b.dataset.journeySave)))decisionTrack('station_saved',{stationId:Number(b.dataset.journeySave)});
  if(e.target.closest('[data-decision-terms],[data-action="journey-documents"]'))decisionTrack('terms_viewed',{page:'terms'});
  if(e.target.closest('[data-tier],[data-investment-preset],#decision-model-link'))keepWorkingExample();
});
document.addEventListener('input',e=>{if(e.target.id==='investment-amount')keepWorkingExample();});
document.addEventListener('change',e=>{if(e.target.matches('[data-pick-station]'))keepWorkingExample();});

// Observe actual saved demo state rather than treating a submit-button click as success.
let decisionTicketIds=new Set(demo.tickets.map(t=>t.id));
let decisionRequests=new Map(demo.requests.map(r=>[r.id,r.status]));
const persistBeforeDecision=persist;
persist=function(){persistBeforeDecision();
  for(const t of demo.tickets)if(!decisionTicketIds.has(t.id)){decisionTicketIds.add(t.id);decisionTrack('question_saved',{page:'client'});}
  for(const r of demo.requests){const previous=decisionRequests.get(r.id);if(r.type==='topup'&&!previous)decisionTrack('demo_funding_requested',{page:'client'});else if(r.type==='topup'&&previous!==r.status&&r.status!=='Pending')decisionTrack('demo_funding_reviewed',{page:'staff'});decisionRequests.set(r.id,r.status);}
};

function decisionDiagnostics(){
  const events=window.EcoChargeFunnel?.read()||[];
  const stages=[['demo_opened','Demo opened'],['model_explored','Operating example explored'],['station_saved','Station saved'],['plan_reviewed','Plan reviewed'],['registration_completed','Demo profile created'],['plan_saved','Plan saved'],['question_saved','Question saved'],['demo_funding_requested','Sample funding requested']];
  openModal(`<span class="j-eyebrow">LOCAL DEMO DIAGNOSTICS</span><h2>See which steps were tested.</h2><p>Unique browser sessions per action. These are test interactions on this device, not advertising results or a count of real clients. Steps may happen in any order.</p><div class="d-diagnostics">${stages.map(([name,label])=>`<div><span>${label}</span><strong>${new Set(events.filter(e=>e.name===name).map(e=>e.visit)).size}</strong></div>`).join('')}</div><div class="modal-note">Last ${events.length} events retained (maximum 400). No names, email addresses, balances or message text are included. No analytics or advertising service receives these events.</div><button class="button primary" data-action="decision-export-events">Download demo event log</button>`);
}
actions['decision-diagnostics']=decisionDiagnostics;
actions['decision-export-events']=()=>{
  const data=JSON.stringify({mode:'local-demo',exportedAt:new Date().toISOString(),events:window.EcoChargeFunnel?.read()||[]},null,2);
  const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='ecocharge-demo-events.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
const decisionAdminBefore=renderAdmin;
renderAdmin=function(){decisionAdminBefore();if(workspaceRole==='admin'&&adminTab==='overview')$('#admin-view').insertAdjacentHTML('beforeend','<section class="panel d-staff-diagnostics"><div><h2>Demo journey diagnostics</h2><p>Inspect the steps tested in this browser. Export an event log without contact or financial details.</p></div><button class="button secondary" data-action="decision-diagnostics">View local events →</button></section>');};

const decisionInitBefore=init;
init=async function(){await decisionInitBefore();
  if(workspaceRole!=='client')return;
  if(isGuest())decisionTrack('demo_opened',{page:'client'});
  try{
    const working=JSON.parse(sessionStorage.getItem('ecocharge-working-plan')||'null');
    if(working&&demo.tariffs.some(t=>t.id===working.tierId)&&validDemoInvestment(working.capital)&&Array.isArray(working.stationIds)&&working.stationIds.every(id=>stations.some(s=>s.id===id))){
      chosenTier=working.tierId;investmentDraft=working.capital;chosenStations=[...new Set(working.stationIds)];
      if(tab==='tariffs')renderClientTab();
    }
  }catch{}
  const id=Number(new URL(location).searchParams.get('station'));
  if(id&&stations.some(s=>s.id===id)){selectStation(id);actions.station();const url=new URL(location);url.searchParams.delete('station');history.replaceState(null,'',url);}
  renderDecisionSurfaces();
};
