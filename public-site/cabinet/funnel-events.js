'use strict';
// Local workspace diagnostics only. No network requests, identity, amounts or message bodies.
(() => {
  const key='ecocharge-funnel-events-v1';
  const allowed=new Set(['page_view','demo_opened','model_explored','station_viewed','station_saved','plan_reviewed','registration_completed','plan_saved','terms_viewed','question_saved','demo_funding_requested','demo_funding_reviewed','starter_selected','first_deposit_confirmed','solar_quote_requested','mining_inquiry_requested','journey_selected','guide_read','topic_selected','project_interest_saved','consultation_requested','club_cta_clicked','club_request_saved','lead_form_started','lead_validation_failed','lead_request_failed']);
  const routes=new Set(['learn','home','solar','mining','inside-a-station','how-it-works','stations','plans','about','resources','terms','club','story','participate/charge','participate/solar','participate/mining','register','client','staff','login','team']);
  let visit;
  try {visit=sessionStorage.getItem('ecocharge-funnel-visit');if(!visit){visit=crypto.randomUUID();sessionStorage.setItem('ecocharge-funnel-visit',visit);}}catch{visit='session-only';}
  const read=()=>{try{const rows=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(rows)?rows.filter(r=>allowed.has(r.name)).slice(-400):[];}catch{return [];}};
  function track(name,details={}) {
    if(!allowed.has(name))return;
    const props={};if(['participation','hosted','purchase','advice'].includes(details.miningRoute))props.miningRoute=details.miningRoute;if(['home-5','home-7','home-10'].includes(details.solarSystem))props.solarSystem=details.solarSystem;
    if(routes.has(details.page))props.page=details.page;
    if(['quiet','example','busy','custom'].includes(details.scenario))props.scenario=details.scenario;
    if(Number.isInteger(details.stationId)&&details.stationId>0)props.stationId=details.stationId;
    if(['single','network','portfolio','scale'].includes(details.tier))props.tier=details.tier;
    if(['fast','nurture'].includes(details.journey))props.journey=details.journey;
    if(['energy','solar','charge','mining','ai','ecocoin','club'].includes(details.topic))props.topic=details.topic;
    if(['gift','join'].includes(details.action))props.action=details.action;
    if(['sandbox','local','server'].includes(details.deliveryMode))props.deliveryMode=details.deliveryMode;
    if(['name','email','phone','consent','marketingConsent','request'].includes(details.field))props.field=details.field;
    if(['participation','equipment','business','updates'].includes(details.purpose))props.purpose=details.purpose;
    if(['US','CA'].includes(details.country))props.country=details.country;
    if(typeof details.complete==='boolean')props.complete=details.complete;
    if(typeof details.duplicate==='boolean')props.duplicate=details.duplicate;
    const event={name,at:new Date().toISOString(),visit,props,mode:'local-demo'};
    try{localStorage.setItem(key,JSON.stringify([...read(),event].slice(-400)));}catch{}
    window.dispatchEvent(new CustomEvent('ecocharge:funnel-event',{detail:event}));
  }
  window.EcoChargeFunnel={track,read};
  const page=document.documentElement.dataset.page||document.documentElement.dataset.portal;
  if(routes.has(page)){track('page_view',{page});if(page==='terms')track('terms_viewed',{page});}
  if(page==='club')document.addEventListener?.('click',e=>{const link=e.target.closest?.('a[href]');if(!link)return;const hash=link.hash;if(hash==='#request-access'||hash==='#club-gift')track('club_cta_clicked',{page,topic:'club',action:hash==='#club-gift'?'gift':'join'});});
})();
