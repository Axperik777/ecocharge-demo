'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoJourney=api;})(typeof window==='object'?window:globalThis,()=>{
 const version='journey-v1';
 const topics={energy:['Energy projects','Энергетические проекты'],solar:['Solar & storage','Солнце и накопители'],charge:['EV charging','Зарядные станции'],mining:['Mining & EcoMiner','Майнинг и EcoMiner'],ai:['AI infrastructure','Инфраструктура AI'],ecocoin:['EcoCoin','EcoCoin']};
 const purposes={participation:['Project participation','Участие в проекте'],equipment:['Equipment for my property','Оборудование для своего объекта'],business:['Business partnership','Деловое партнёрство'],updates:['Explore and follow updates','Изучить и следить за новостями']};
 const routes={fast:['Consultation','Консультация'],nurture:['Explore first','Знакомство с проектом']};
 const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid','msclkid','ttclid','landing_id','landing_host','lead_route','aff','partner_id','sub_id','ref'];
 function attribution(input={}){const v={};for(const k of keys)if(typeof input[k]==='string')v[k]=input[k].slice(0,300);return v;}
 function normalize(input){if(!input)return null;const route=input.route,topic=input.topic,purpose=input.purpose,country=input.country;if(!Object.hasOwn(routes,route)||!Object.hasOwn(topics,topic)||!Object.hasOwn(purposes,purpose)||!['US','CA'].includes(country))throw Error('Choose a route, topic, purpose and country.');if(route==='nurture'&&purpose!=='updates')throw Error('Choose exploration to follow project updates.');return {route,topic,purpose,country};}
 function merge(previous,input,source={},at=new Date().toISOString()){
  const next=normalize(input);if(!next)return previous||null;
  const first=previous?.entryRoute||next.route;
  // A newsletter request never cancels an already requested consultation.
  const route=previous?.route==='fast'?'fast':next.route;
  const current=route==='fast'&&next.route==='nurture'&&previous?{topic:previous.topic,purpose:previous.purpose}:next;
  const touch=attribution(source),history=(previous?.history||[]).slice(-19);
  const event={route:next.route,topic:next.topic,purpose:next.purpose,country:next.country,at,source:touch};
  if(!history.length||JSON.stringify({...history.at(-1),at:''})!==JSON.stringify({...event,at:''}))history.push(event);
  return {...previous,...next,...current,route,entryRoute:first,enteredAt:previous?.enteredAt||at,firstSource:previous?.firstSource||touch,lastSource:touch,consultationAt:previous?.consultationAt||(next.route==='fast'?at:null),history};
 }
 function requestConversation(state,chosen,language,id,at=new Date().toISOString()){
  const j=normalize(chosen);if(j.route!=='fast')throw Error('Request a consultation first.');state.tickets??=[];const prior=state.tickets.find(t=>t.journeyTopic===j.topic&&t.status!=='Resolved'&&!t.service?.closed);if(prior)return prior;
  const ru=language==='ru',name=label(topics,j.topic,language),subject=(ru?'Обсудить проект · ':'Project discussion · ')+name,message=(ru?'Хочу обсудить направление: ':'I would like to discuss: ')+name+'. '+label(purposes,j.purpose,language)+'. '+(j.country==='CA'?(ru?'Канада':'Canada'):(ru?'США':'United States'));
  const ticket={id,subject,message,reply:'',date:at,status:'Open',journeyTopic:j.topic,messages:[{id,from:'client',text:message,date:at}],service:{closed:false}};state.tickets.push(ticket);return ticket;
 }
 function entry(record){return record.context?.journey||record.journey||record.state?.journey||null;}
 function exploring(record){return entry(record)?.route==='nurture';}
 function label(group,key,lang='en'){return (group[key]||['—','—'])[lang==='ru'?1:0];}
 function cohorts(rows,dimension='entryRoute',at=Date.now()){
  const groups=new Map();for(const r of rows){const j=r.journey||{},key=dimension==='topic'?j.topic||'unknown':dimension==='partner'?(j.firstSource?.partner_id||j.firstSource?.aff||r.source?.partner_id||r.source?.aff||'direct'):j.entryRoute||'legacy';let g=groups.get(key);if(!g){g={key,contacts:0,consultations:0,qualified:0,accounts:0,paid:0,ageDays:0,daysToPaid:0};groups.set(key,g);}g.contacts++;g.consultations+=!!j.consultationAt||(!j.entryRoute&&r.connected)?1:0;g.qualified+=r.qualified?1:0;g.accounts+=r.account?1:0;const started=Date.parse(j.enteredAt||r.created);if(Number.isFinite(started))g.ageDays+=Math.max(0,at-started)/86400000;if(r.paidAt&&Number.isFinite(Date.parse(r.paidAt))){g.paid++;if(Number.isFinite(started))g.daysToPaid+=Math.max(0,Date.parse(r.paidAt)-started)/86400000;}}
  return [...groups.values()].map(g=>({...g,averageAgeDays:g.contacts?g.ageDays/g.contacts:null,averageDaysToPaid:g.paid?g.daysToPaid/g.paid:null,paidRate:g.contacts?g.paid/g.contacts:0}));
 }
 return {requestConversation,version,topics,purposes,routes,keys,attribution,normalize,merge,entry,exploring,label,cohorts};
});
