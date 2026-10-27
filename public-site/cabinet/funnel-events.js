'use strict';
// Sanitized funnel diagnostics and a GTM-ready dataLayer bridge. This file makes no network requests and sends no identity, amounts or message bodies.
(() => {
  const key='ecocharge-funnel-events-v1';
  const allowed=new Set(['page_view','demo_opened','model_explored','station_viewed','station_saved','plan_reviewed','registration_completed','plan_saved','terms_viewed','question_saved','demo_funding_requested','demo_funding_reviewed','starter_selected','first_deposit_confirmed','solar_quote_requested','compute_inquiry_requested','charge_application_cta_clicked','charge_application_submitted','journey_selected','guide_read','topic_selected','project_interest_saved','consultation_requested','club_cta_clicked','club_request_saved','lead_form_started','lead_validation_failed','lead_request_failed','project_calculation_started','project_calculation_downloaded','project_details_requested','academy_lesson_opened','academy_task_selected','academy_example_copied','academy_lesson_marked','academy_next_clicked','academy_answer_checked','academy_lesson_completed','app_section_viewed','app_entry_clicked','community_outbound_clicked','article_viewed','article_engaged','article_cta_clicked']);
  const routes=new Set(['app','academy','learn','guides','home','solar','compute','inside-a-station','how-it-works','stations','plans','about','resources','terms','club','story','participate/charge','participate/solar','participate/compute','register','client','staff','login','team']);
  let visit;
  try {visit=sessionStorage.getItem('ecocharge-funnel-visit');if(!visit){visit=crypto.randomUUID();sessionStorage.setItem('ecocharge-funnel-visit',visit);}}catch{visit='session-only';}
  const read=()=>{try{const rows=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(rows)?rows.filter(r=>allowed.has(r.name)).slice(-400):[];}catch{return [];}};
  const campaign=()=>{try{const first=JSON.parse(sessionStorage.getItem('ecocharge-attribution')||'{}'),last=JSON.parse(sessionStorage.getItem('ecogrid-last-attribution')||'{}'),query=typeof location==='object'?new URL(location.href).searchParams:null,current={...first,...last},out={},clean=value=>{const raw=String(value||'').trim();if(!raw||raw.includes('@'))return '';return raw.toLowerCase().replace(/[^a-z0-9._+\/-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,100);};for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const value=clean(query?.get(key)||current[key]);if(value)out[key]=value;const original=clean(first[key]);if(original)out['first_'+key]=original;}for(const key of ['gclid','fbclid','msclkid','ttclid']){if(query?.has(key)||current[key])out[key+'_present']=true;if(first[key])out['first_'+key+'_present']=true;}const route=clean(query?.get('lead_route')||current.lead_route);if(['website','lead-form'].includes(route))out.lead_route=route;return out;}catch{return {};}};
  const publish=event=>{try{if(!Array.isArray(window.dataLayer))window.dataLayer=[];window.dataLayer.push({event:'ecocharge_funnel_event',eco_event_name:event.name,eco_event_version:1,eco_visit_id:event.visit,...event.props,...campaign()});}catch{}};
  function track(name,details={}) {
    if(!allowed.has(name))return;
    const safeSlug=(value,max=80)=>{const text=String(value||'').trim().toLowerCase();return text.length<=max&&/^[a-z0-9][a-z0-9-]*$/.test(text)?text:'';};
    const props={};if(details.computeIntent==='participation')props.computeIntent=details.computeIntent;if(['home-5','home-7','home-10'].includes(details.solarSystem))props.solarSystem=details.solarSystem;
    if(routes.has(details.page))props.page=details.page;
    if(['quiet','example','busy','custom','business','everyday','learning'].includes(details.scenario))props.scenario=details.scenario;
    if(Number.isInteger(details.stationId)&&details.stationId>0)props.stationId=details.stationId;
    if(['single','network','portfolio','scale'].includes(details.tier))props.tier=details.tier;
    if(['fast','nurture'].includes(details.journey))props.journey=details.journey;
    if(['energy','solar','charge','compute','ai','ecocoin','club'].includes(details.topic))props.topic=details.topic;
    if(['gift','join','community','benefits'].includes(details.action))props.action=details.action;
    if(['sandbox','local','server'].includes(details.deliveryMode))props.deliveryMode=details.deliveryMode;
    if(['name','email','phone','consent','marketingConsent','request'].includes(details.field))props.field=details.field;
if(['participation','equipment','business','updates'].includes(details.purpose))props.purpose=details.purpose;
    for(const [key,max]of [['contentId',80],['cluster',60],['ctaId',80],['ctaPosition',40]]){const value=safeSlug(details[key],max);if(value)props[key]=value;}
    if(['charge','solar','compute','academy','resources','guides'].includes(details.targetProject))props.targetProject=details.targetProject;
    if(['direct_project','community_interest','academy_education'].includes(details.acquisitionPath))props.acquisitionPath=details.acquisitionPath;
    if(typeof details.articleAssist==='boolean')props.articleAssist=details.articleAssist;
    if(['US','CA'].includes(details.country))props.country=details.country;
    if(typeof details.complete==='boolean')props.complete=details.complete;
    if(typeof details.duplicate==='boolean')props.duplicate=details.duplicate;
    if(['ai','invest','coin','community'].includes(details.lesson))props.lesson=details.lesson;
    if(['ai','academy','club','coin','community','gift','join','projects'].includes(details.destination))props.destination=details.destination;
    const event={name,at:new Date().toISOString(),visit,props,mode:'browser'};
    try{localStorage.setItem(key,JSON.stringify([...read(),event].slice(-400)));}catch{}
    publish(event);
    window.dispatchEvent(new CustomEvent('ecocharge:funnel-event',{detail:event}));
  }
  window.EcoChargeFunnel={track,read};
  const page=document.documentElement.dataset.page||document.documentElement.dataset.portal;
  if(routes.has(page)){track('page_view',{page});if(page==='terms')track('terms_viewed',{page});}
  if(page==='club')document.addEventListener?.('click',e=>{const link=e.target.closest?.('a[href]');if(!link)return;const hash=link.hash;if(hash==='#club-community'||hash==='#club-benefits')track('club_cta_clicked',{page,topic:'club',action:hash==='#club-community'?'community':'benefits'});});
})();
