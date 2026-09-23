'use strict';

// Stage follows approved ledger entries, never an edited balance or a button click.
if(EcoFunding.removePendingFees(demo))persist();
let salesDeskMode=null;
const fundingState=()=>EcoFunding.state(demo);
const starterOffer=()=>EcoFunding.offer(demo.starterSelection?.id);
const lifeT=text=>window.EcoLocale?.t(text)||text;
const lifeButton=(action,text,primary=false)=>`<button class="button ${primary?'primary':'secondary'}" data-action="${action}">${text}</button>`;

function starterCards(scope="dashboard"){
  const chosen=starterOffer();
  return `<section class="life-offers" id="${scope==="dashboard"?"starter-plans":"starter-plans-page"}" aria-labelledby="starter-heading-${scope}"><div class="life-section-heading"><div><span class="j-eyebrow">THREE STARTING OPTIONS</span><h2 id="starter-heading-${scope}">Choose your starting amount.</h2></div><p>Choose $250, $500 or $800. The amount you pay is the amount credited to your plan.</p></div><div class="life-offer-grid">${EcoFunding.offers.map(o=>{const tier=demo.tariffs.find(t=>t.id===o.tierId);return `<article class="life-offer ${chosen?.id===o.id?'selected':''}"><span class="life-offer-label">Plan capital</span><strong class="life-capital">${money(o.capital)}</strong><p><span>Reference locations:</span> <span translate="no">${tier.count}</span> · <span translate="no">${tier.rate}%</span> <span>weekly illustration</span></p><dl><div class="life-total"><dt>Total due</dt><dd>${money(o.total)}</dd></div></dl><button class="button ${chosen?.id===o.id?'primary':'secondary'}" data-starter="${o.id}" aria-pressed="${chosen?.id===o.id}"><span>${chosen?.id===o.id?'Review selection':'Choose this plan'}</span> ${icon('arrow')}</button></article>`;}).join('')}</div><p class="life-disclosure">The full starting amount goes toward your plan. Calculations are illustrative; returns are not guaranteed.</p></section>`;
}

function starterProgress(stage){
  const current=stage==='pending'?2:stage==='selected'?1:0;
  return `<ol class="life-progress" aria-label="First deposit progress">${['Choose a plan','Review total & method','Payment confirmation'].map((label,i)=>`<li ${i===current?'aria-current="step"':''} class="${i<current?'complete':''}"><span>${i<current?'✓':i+1}</span><strong>${label}</strong></li>`).join('')}</ol>`;
}

function lifeHero(state){
  const selected=starterOffer(),active=isActivePlan();
  let title='Start with one clear decision.',copy='Choose a starting plan. See the complete price, review the terms and get help from your manager before you continue.',action='life-plans',label='Choose my starting plan',tag='YOUR FIRST DEPOSIT';
  if(state.hasFirstDeposit){title=active?'Your plan is active. Stay in control.':'Your first deposit is confirmed.';copy=active?'Review your account activity, next withdrawal date and questions with your account manager.':'Your plan capital is available. Review your saved selection and activate it when you are ready.';action=active?'journey-my-plan':demo.planDraft?'activate-draft':'journey-resume';label=active?'View my active plan':demo.planDraft?'Activate my plan':'Choose my plan';tag='YOUR ACCOUNT / NEXT STEPS';}
  else if(state.pending.length){title='Your first deposit is under review.';copy='Your request is saved. Follow its status here and contact your manager if anything is unclear.';action='cab-request-history';label='View payment status';tag='AWAITING CONFIRMATION';}
  else if(selected){title='Your starting plan is ready to review.';copy='Check your plan and total. You can change your selection before submitting a payment request.';action='life-review';label='Review total & payment';}
  return `<div class="life-hero-copy"><span class="j-eyebrow">${tag}</span><h1>${title}</h1><p>${copy}</p><div class="life-hero-actions">${lifeButton(action,label+' '+icon('arrow'),true)}<button class="text-button" data-action="life-ask">Talk it through with my manager ${icon('chat')}</button></div>${state.hasFirstDeposit?`<div class="life-confirmed">${icon('check')}<span>First deposit confirmed</span><strong>${money(EcoFunding.pricing(state.first).total)}</strong></div>`:starterProgress(state.stage)}</div><aside class="life-hero-aside"><span class="j-eyebrow">${state.hasFirstDeposit?'YOUR NEXT CONVERSATION':'BEFORE YOU CONTINUE'}</span><h2>${state.hasFirstDeposit?'A manager who knows your plan.':'The full price. A clear next step.'}</h2><p>${state.hasFirstDeposit?'Your plan, questions and first payment stay together when the support team takes over.':'See your starting amount before you choose card or crypto. The full amount goes toward your plan.'}</p><button class="text-button" data-action="journey-documents">Review documents ${icon('arrow')}</button><a href="terms/">Fees, access & risks ↗</a></aside>`;
}

function lifeAfterFunding(state){
  const active=isActivePlan(),d=EcoFunding.pricing(state.first);
  return `<section class="life-after panel"><div class="life-section-heading"><div><span class="j-eyebrow">AFTER YOUR FIRST DEPOSIT</span><h2>Keep your next steps clear.</h2></div><button class="text-button" data-action="cab-request-history">Payment receipt ${icon('arrow')}</button></div><div class="life-next-grid"><article>${icon('assets')}<h3>${active?'Review your active plan':'Activate your saved plan'}</h3><p>${active?'See your selected locations and the calculation behind your weekly example.':'Your starting amount is available for your plan. Review the weekly calculation before activation.'}</p>${lifeButton(active?'journey-my-plan':demo.planDraft?'activate-draft':'journey-resume',active?'View plan':'Review & activate')}</article><article>${icon('chat')}<h3>Your account manager</h3><p>Your first payment and open questions are included in the team handoff. Ask for a walkthrough.</p>${lifeButton('life-ask','Ask about my next steps')}</article><article>${icon('file')}<h3>Understand every change</h3><p>Review credits, documents and the withdrawal schedule before considering an additional allocation.</p>${lifeButton('sessions','View account credits')}</article></div><p class="life-receipt-line"><span>First payment:</span> <b>${money(d.total)}</b> · <span>Plan capital:</span> <b>${money(d.net)}</b>${d.fee?` · <span>Company fee:</span> <b>${money(d.fee)}</b>`:''}</p>${withdrawalNotice()}<details class="life-additional"><summary>Considering an additional allocation?</summary><p>Review your current plan and discuss the costs and risks first. There is no automatic reinvestment.</p>${lifeButton('journey-resume','Review another allocation')} ${lifeButton('life-ask','Discuss with my manager')}</details></section>`;
}

function renderLifecycle(){
  if(workspaceRole!=='client')return;
  const state=fundingState();
  document.body.dataset.fundingStage=state.hasFirstDeposit?'retention':'ftd';
  if(tab!=='dashboard')return;
  const welcome=$('#client-next-step'),root=$('#journey-dashboard');if(!welcome||!root)return;
  const station=welcome.querySelector('.r-welcome-station');
  if(state.hasFirstDeposit&&station){station.classList.remove('r-welcome-station');root.querySelector('.cab-client-grid')?.prepend(station);}
  welcome.className='panel client-next-step life-hero';welcome.innerHTML=lifeHero(state);
  root.querySelectorAll('.life-dashboard-panel').forEach(el=>el.remove());
  const section=document.createElement('div');section.className='life-dashboard-panel';
  section.innerHTML=state.hasFirstDeposit?lifeAfterFunding(state):state.pending.length?`<section class="life-pending panel"><div>${icon('calendar')}<h2>One request. One clear status.</h2><p>Your request is awaiting review. A pending request is not a confirmed deposit.</p></div>${lifeButton('cab-request-history','Track my request',true)}</section>`:starterCards();
  root.prepend(section);
  if(!state.hasFirstDeposit){root.querySelector('.cab-summary')?.remove();root.querySelector('#decision-roadmap')?.remove();}
  else refreshWithdrawalPolicy();
}
const journeyBeforeLifecycle=renderJourney;
renderJourney=function(){journeyBeforeLifecycle();renderLifecycle();};

const tariffsBeforeLifecycle=renderTariffs;
renderTariffs=function(){
  if(workspaceRole!=='client'||fundingState().hasFirstDeposit)return tariffsBeforeLifecycle();
  const area=$('#tariffs-section');if(!area)return;
  const state=fundingState();
  area.classList.remove('r-plan');area.classList.add('life-starter-page');
  area.innerHTML=`<header class="life-plan-heading"><span class="j-eyebrow">YOUR STARTING PLAN</span><h1>One total. No hidden add-ons.</h1><p>Choose a starting amount and a payment method. Your manager can help at any step.</p></header>${state.pending.length?`<section class="panel life-pending"><h2>Your payment request is being reviewed.</h2>${lifeButton('cab-request-history','View payment status',true)}</section>`:starterCards("page")}<div class="life-starter-help">${lifeButton('life-ask','Ask my manager')}<a href="terms/">Read the terms before continuing ↗</a></div>`;
  $('#decision-plan-tabs')?.setAttribute('hidden','');
};
const lifeClientBefore=renderClientTab;
renderClientTab=function(){lifeClientBefore();renderLifecycle();if(tab==='tariffs'&&!fundingState().hasFirstDeposit){$('#decision-plan-tabs')?.setAttribute('hidden','');document.body.classList.remove('r-builder-open');}};

function selectStarter(id){
  const o=EcoFunding.offer(id),s=fundingState();if(!o||s.hasFirstDeposit||s.pending.length)return false;
  const tier=demo.tariffs.find(t=>t.id===o.tierId);if(!tier||stations.length<tier.count){toast('The station directory is loading. Try again shortly.');return false;}
  const preferred=[...(demo.planDraft?.stationIds||[]),...explorationState().saved,...(window.ECOCHARGE_STATION_VISUALS?.featuredIds||[]),...stations.map(v=>v.id)];
  const ids=[...new Set(preferred)].filter(n=>stations.some(v=>v.id===n)).slice(0,tier.count);
  demo.starterSelection={id:o.id,selectedAt:new Date().toISOString()};
  demo.planDraft={tierId:tier.id,name:tier.name,rate:tier.rate,period:'week',capital:o.capital,stationIds:ids,appliedAt:new Date().toISOString(),starterId:o.id};
  chosenTier=tier.id;investmentDraft=o.capital;chosenStations=ids.slice();persist();
  decisionTrack('starter_selected',{page:'client',tier:tier.id});return true;
}
function openStarterReview(){
  const o=starterOffer(),state=fundingState();if(state.pending.length)return actions['cab-request-history']();
  if(!o||state.hasFirstDeposit)return actions['life-plans']();
  if((!demo.planDraft||demo.planDraft.starterId!==o.id||demo.planDraft.capital!==o.capital)&&!selectStarter(o.id))return;
  const plan=demo.planDraft;
  openModal(`<span class="j-eyebrow">REVIEW YOUR STARTING PLAN</span><h2>Your full payment, explained.</h2>${paymentPricing({starterId:o.id,amount:o.total})}<p>The full amount is credited to your plan. Review the calculation and access terms before continuing.</p><div class="life-review-plan"><strong><span>Reference locations:</span> <span translate="no">${plan.stationIds.length}</span></strong><p><span>Weekly illustration:</span> <b>${money(weeklyCredit(o.capital,plan.rate))}</b> <span>on plan capital only</span></p><small>Illustrative calculation, not a guaranteed return. Public station listings do not establish ownership.</small><details><summary>View reference locations</summary>${plan.stationIds.map(journeyStation).filter(Boolean).map(v=>`<p translate="no">${escapeHtml(journeyLabel(v))}</p>`).join('')}</details></div><div class="life-review-links"><a href="terms/" target="_blank" rel="noopener">Read fees, access & risks ↗</a><button class="text-button" data-action="life-ask">Ask about this plan</button></div>${lifeButton('life-pay','Continue to payment '+icon('arrow'),true)}<button class="button secondary" data-action="life-plans">Change starting plan</button>`);
}
actions['life-plans']=()=>{$('#modal').close();tab='tariffs';renderClientTab();window.scrollTo({top:0,behavior:'instant'});};
actions['life-review']=openStarterReview;
actions['life-pay']=()=>{
  const o=starterOffer(),s=fundingState();if(s.pending.length)return actions['cab-request-history']();if(!o||s.hasFirstDeposit)return actions['life-plans']();
  paymentDraft={id:'PAY-'+crypto.randomUUID().slice(0,12).toUpperCase(),amount:o.total,method:'card',network:'usdt-trc20',step:'choose',starterId:o.id};showPaymentMethods();
};
actions['life-ask']=()=>{const funded=fundingState().hasFirstDeposit;contactComposer(funded?'account':'plan',{entry:funded?'client-care':'first-deposit',topic:funded?'account':'plan',capital:starterOffer()?.capital||cabPlan()?.capital});const field=$('#support-message');if(field)field.value=lifeT(funded?'Please walk me through my active plan, recorded credits and next withdrawal date.':'Please explain the starting plan, full payment and withdrawal terms before I decide.');};
const fundingModalBeforeLifecycle=paymentModal;
paymentModal=function(type){if(type==='topup'&&!fundingState().hasFirstDeposit){if(fundingState().pending.length)return actions['cab-request-history']();if(starterOffer())return openStarterReview();return actions['life-plans']();}return fundingModalBeforeLifecycle(type);};
actions['request-plan-funding']=()=>paymentModal('topup');
document.addEventListener('click',e=>{const b=e.target.closest('[data-starter]');if(b&&selectStarter(b.dataset.starter))openStarterReview();});

function salesOutline(mode){
  const o=starterOffer(),p=cabPlan(),state=fundingState();
  const price=o?`${lifeT('Plan capital')}: ${money(o.capital)}. ${lifeT('Total due')}: ${money(o.total)}.`:lifeT('Show all three starting packages and their full prices.');
  return mode==='ftd'?[
    ['Understand the goal','What would you like to understand before choosing a starting plan?'],
    ['Explain the full price',price,true],
    ['Check understanding','The full starting amount goes toward the plan. Weekly figures are illustrations, not guaranteed returns. Review the terms and withdrawal schedule together.'],
    ['Agree on the next step','Would you like to review a payment method, ask another question or take more time?']
  ]:[
    ['Confirm the starting point',state.first?`${lifeT('First deposit confirmed')}: ${money(EcoFunding.pricing(state.first).total)}. ${lifeT('Plan capital')}: ${money(state.first.amount)}.`:lifeT('No confirmed first deposit yet.'),true],
    ['Resolve open questions','What is still unclear about your plan, account activity or access to funds?'],
    ['Review the account together','Explain recorded credits, documents and the next available withdrawal date. Check that the client understands the current plan first.'],
    ['Discuss changes only when relevant','If your goals or budget have changed, we can compare another allocation. There is no need to add funds to keep using your current account.']
  ];
}
function renderSalesDesk(){
  if(workspaceRole!=='admin'||!['overview','clients'].includes(adminTab))return;
  $('#life-sales-desk')?.remove();const state=fundingState(),mode=salesDeskMode||state.department,notes=demo.salesDesk||{},o=starterOffer();
  const target=$('#admin-view .cab-page-heading');if(!target)return;
  const block=document.createElement('section');block.id='life-sales-desk';block.className='life-sales-desk panel';
  const stage=state.hasFirstDeposit?'First deposit confirmed':state.pending.length?'Payment awaiting review':o?'Starting plan selected':'Starting plan not selected';
  block.innerHTML=`<div class="life-desk-tabs" role="group" aria-label="Sales department"><button data-sales-mode="ftd" aria-pressed="${mode==='ftd'}">FTD <span>First deposit</span></button><button data-sales-mode="retention" aria-pressed="${mode==='retention'}"><span>Client care</span> <span>Follow-up & additional allocations</span></button></div><div class="life-desk-content"><div class="life-section-heading"><div><span class="j-eyebrow">${mode==='ftd'?'FTD / FIRST DEPOSIT':'CLIENT CARE / AFTER FIRST DEPOSIT'}</span><h2>${mode==='ftd'?'One goal: a clear first deposit.':'Continue from the client’s actual experience.'}</h2></div><span class="life-stage">${stage}</span></div><dl class="life-desk-facts"><div><dt>Current department</dt><dd>${state.hasFirstDeposit?'Client care':'FTD'}</dd></div><div><dt>Plan capital</dt><dd>${money(state.first?.amount||o?.capital||0)}</dd></div><div><dt>Total payment</dt><dd>${money(state.first?EcoFunding.pricing(state.first).total:o?.total||0)}</dd></div></dl><div class="life-desk-primary">${state.pending.length?lifeButton('life-review-first','Review pending payment',true):lifeButton('life-operations','Open payment history',true)} ${lifeButton('view-client','Preview client account')}</div><div class="life-desk-grid"><div class="life-call-outline"><details ${mode==='ftd'&&!state.pending.length&&!state.hasFirstDeposit?'open':''}><summary>Conversation outline</summary><ol>${salesOutline(mode).map(([title,text,dynamic])=>`<li><strong>${title}</strong><p ${dynamic?'translate="no"':''}>${escapeHtml(text)}</p></li>`).join('')}</ol><button class="button secondary" data-copy-outline="${mode}">Copy conversation outline ${icon('file')}</button></details></div><aside class="life-handoff"><h3>Team handoff</h3><dl><div><dt>FTD owner</dt><dd translate="no">${escapeHtml(notes.ftdOwner||demo.manager.name)}</dd></div><div><dt>Client care owner</dt><dd ${notes.careOwner?'translate="no"':''}>${escapeHtml(notes.careOwner||'Not assigned')}</dd></div><div><dt>Handoff status</dt><dd>${!state.hasFirstDeposit?'Waiting for first deposit':notes.acceptedAt?'Accepted by client care':'Ready for client care'}</dd></div></dl><p ${notes.summary?'translate="no"':''}>${escapeHtml(notes.summary||'Keep the client’s goal, open questions and agreed next step here.')}</p>${lifeButton('life-handoff','Edit handoff notes')}${state.hasFirstDeposit&&!notes.acceptedAt?lifeButton('life-accept','Accept client for follow-up',true):''}<button class="text-button" data-action="life-operations">Review payment requests ${icon('arrow')}</button></aside></div><p class="life-desk-note">Only an approved funding request counts as a first deposit. Balance adjustments and pending requests do not. Department views share this browser’s demo data.</p></div>`;
  target.after(block);block.insertAdjacentHTML('afterbegin','<a class="life-ftd-entry" href="crm/">Open simple FTD workspace →</a>');window.EcoLocale?.localize(block);
}
const salesAdminBefore=renderAdmin;
renderAdmin=function(){salesAdminBefore();renderSalesDesk();};
actions['life-operations']=()=>cabRoute('operations');
actions['life-review-first']=()=>{if(role!=='admin')return;const request=fundingState().pending[0];if(request)reviewRequest(request.id,'approve');};
actions['life-handoff']=()=>{if(role!=='admin')return;const n=demo.salesDesk||{};openModal(`<h2>Team handoff notes</h2><form id="life-handoff-form"><label for="life-ftd-owner">FTD owner</label><input id="life-ftd-owner" maxlength="80" value="${escapeHtml(n.ftdOwner||demo.manager.name)}" required><label for="life-care-owner">Client care owner</label><input id="life-care-owner" maxlength="80" value="${escapeHtml(n.careOwner||'')}"><label for="life-handoff-note">Client goal, open questions & next step</label><textarea id="life-handoff-note" maxlength="2000" rows="5">${escapeHtml(n.summary||'')}</textarea><p>Internal notes. Saving does not send a message to the client.</p><button class="button primary" type="submit">Save handoff notes</button></form>`);};
actions['life-accept']=()=>{if(role!=='admin'||!fundingState().hasFirstDeposit||demo.salesDesk?.acceptedAt)return;demo.salesDesk={...demo.salesDesk,ftdOwner:demo.salesDesk?.ftdOwner||demo.manager.name,careOwner:demo.salesDesk?.careOwner||demo.manager.name,acceptedAt:new Date().toISOString()};demo.manager={...demo.manager,name:demo.salesDesk.careOwner};activity('Client care accepted the funded client');persist();renderAdmin();toast('Client handoff accepted.');};
document.addEventListener('submit',e=>{if(e.target.id!=='life-handoff-form')return;e.preventDefault();if(role!=='admin')return;const name=$('#life-ftd-owner').value.trim();if(!name)return;demo.salesDesk={...demo.salesDesk,ftdOwner:name,careOwner:$('#life-care-owner').value.trim(),summary:$('#life-handoff-note').value.trim(),updatedAt:new Date().toISOString()};persist();$('#modal').close();renderAdmin();toast('Handoff notes saved.');});
document.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b||role!=='admin')return;if(['ftd','retention'].includes(b.dataset.salesMode)){salesDeskMode=b.dataset.salesMode;renderSalesDesk();}if(['ftd','retention'].includes(b.dataset.copyOutline)){const text=salesOutline(b.dataset.copyOutline).map(([title,copy,dynamic],i)=>`${i+1}. ${lifeT(title)}\n${dynamic?copy:lifeT(copy)}`).join('\n\n');try{await navigator.clipboard.writeText(text);toast('Conversation outline copied.');}catch{openModal(`<h2>Conversation outline</h2><textarea readonly rows="14">${escapeHtml(text)}</textarea>`);}}});

// Repeated approval, refreshes and later deposits cannot generate a second FTD milestone.
const persistBeforeLifecycle=persist;
persist=function(){const s=fundingState();if(s.first&&!demo.firstDepositMilestone){demo.firstDepositMilestone={requestId:s.first.id,date:s.first.reviewedAt||s.first.date};decisionTrack('first_deposit_confirmed',{page:role==='admin'?'staff':'client'});}persistBeforeLifecycle();if(stations.length&&workspaceRole==='client'&&tab==='dashboard')renderJourney();};
const historyBeforeLifecycle=actions['cab-request-history'];
actions['cab-request-history']=()=>{historyBeforeLifecycle();appendPaymentBreakdowns();};
const allHistoryBeforeLifecycle=actions.history;
actions.history=()=>{allHistoryBeforeLifecycle();appendPaymentBreakdowns();};
$('#modal').addEventListener('close',()=>{if(!$('#modal .life-review-plan'))return;const id=starterOffer()?.id;const button=id?$(`[data-starter="${id}"]`):null;button?.focus({preventScroll:true});});
