'use strict';
// Local demo diagnostics only. No network requests, identity, amounts or message bodies.
(() => {
  const key='ecocharge-funnel-events-v1';
  const allowed=new Set(['page_view','demo_opened','model_explored','station_viewed','station_saved','plan_reviewed','registration_completed','plan_saved','terms_viewed','question_saved','demo_funding_requested','demo_funding_reviewed','starter_selected','first_deposit_confirmed']);
  const routes=new Set(['home','inside-a-station','how-it-works','stations','plans','about','resources','terms','register','client','staff','login','team']);
  let visit;
  try {visit=sessionStorage.getItem('ecocharge-funnel-visit');if(!visit){visit=crypto.randomUUID();sessionStorage.setItem('ecocharge-funnel-visit',visit);}}catch{visit='session-only';}
  const read=()=>{try{const rows=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(rows)?rows.filter(r=>allowed.has(r.name)).slice(-400):[];}catch{return [];}};
  function track(name,details={}) {
    if(!allowed.has(name))return;
    const props={};
    if(routes.has(details.page))props.page=details.page;
    if(['quiet','example','busy','custom'].includes(details.scenario))props.scenario=details.scenario;
    if(Number.isInteger(details.stationId)&&details.stationId>0)props.stationId=details.stationId;
    if(['single','network','portfolio','scale'].includes(details.tier))props.tier=details.tier;
    const event={name,at:new Date().toISOString(),visit,props,mode:'local-demo'};
    try{localStorage.setItem(key,JSON.stringify([...read(),event].slice(-400)));}catch{}
    window.dispatchEvent(new CustomEvent('ecocharge:funnel-event',{detail:event}));
  }
  window.EcoChargeFunnel={track,read};
  const page=document.documentElement.dataset.page||document.documentElement.dataset.portal;
  if(routes.has(page)){track('page_view',{page});if(page==='terms')track('terms_viewed',{page});}
})();
