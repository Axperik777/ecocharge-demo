'use strict';
// The same allowlist is used by the server and the sign-in UI. Never accept a return URL.
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../account-finance.js'):root.EcoFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoNavigation=api;})(typeof window==='object'?window:globalThis,finance=>{
 const clientTabs=['dashboard','map','assets','documents','tariffs','money','help','profile','identity','notifications','saved','results','invite','arcade','equipment','projects','services','feed'];
 const staffTabs=['today','leads','clients','chats','funding','withdrawals','links','knowledge','guide','handoffs','club','calls','funnel','followups','community'];
 function context(kind,input,language){
  const p=input instanceof URLSearchParams?input:new URLSearchParams(typeof input==='string'?input:undefined);
  const out=new URLSearchParams(),lang=['en','ru'].includes(language)?language:p.get('lang');
  if(['en','ru'].includes(lang))out.set('lang',lang);
  const tabs=kind==='staff'?staffTabs:clientTabs,requested=p.get('tab')||p.get('next');
  if(tabs.includes(requested))out.set('tab',requested);
  if(kind!=='staff'){
   const id=p.get('station');if(/^[1-9]\d{0,8}$/.test(id||'')){out.set('station',id);if(!out.has('tab'))out.set('tab','map');}
   const tier=p.get('tier');if(finance.tiers.some(t=>t.id===tier))out.set('tier',tier);
   const raw=p.get('amount'),amount=Number(raw);if(/^\d{3,8}(?:\.\d{1,2})?$/.test(raw||'')&&amount>=finance.minimum&&amount<=finance.maximum)out.set('amount',String(amount));
   if((out.has('tier')||out.has('amount'))&&!out.has('tab'))out.set('tab','tariffs');
   if(['list','map'].includes(p.get('stations')))out.set('stations',p.get('stations'));
   if(['US','CA'].includes(p.get('country')))out.set('country',p.get('country'));
   if(p.get('contact')==='manager')out.set('contact','manager');
  }
  return out;
 }
 function destination(kind,input,language,role){const p=context(kind,input,language);if(kind==='staff'&&role!=='admin'&&['links','club'].includes(p.get('tab')))p.set('tab','today');return (kind==='staff'?'/crm/':'/client/')+(p.size?'?'+p:'');}
 function login(kind,input,language){const p=context(kind,input,language);return (kind==='staff'?'/team/':'/login/')+(p.size?'?'+p:'');}
 return {context,destination,login};
});
