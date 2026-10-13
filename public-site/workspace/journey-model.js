'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoJourney=api;})(typeof window==='object'?window:globalThis,()=>{
 const version='journey-v2-compute',legacyProjectKey='min'+'ing',legacyPositionsKey=legacyProjectKey+'Positions';
 const topics={academy:['EcoGrid Academy','EcoGrid Academy'],energy:['Energy projects','Энергетические проекты'],solar:['Solar & storage','Солнце и накопители'],charge:['EV charging','Зарядные станции'],compute:['AI compute infrastructure','AI-вычисления и дата-центры'],[legacyProjectKey]:['EcoGrid support','Сопровождение EcoGrid'],ai:['EcoGrid AI technology','Технология EcoGrid AI'],ecocoin:['EcoCoin','EcoCoin'],club:['EcoGrid Club community','Сообщество EcoGrid Club']};
 // The legacy key remains readable only for retained attribution and historical records.
 // New project selection exposes Charge, Solar and Compute.
 const projectTopics=Object.fromEntries(Object.entries(topics).filter(([id])=>!['ai','ecocoin','club','academy',legacyProjectKey].includes(id)));
 const purposes={participation:['Project participation','Участие в проекте'],equipment:['Equipment for my property','Оборудование для своего объекта'],capacity:['GPU capacity for my workload','GPU-мощность для моей задачи'],business:['Business partnership','Деловое партнёрство'],updates:['Explore and follow updates','Изучить и следить за новостями']};
 const projectPurposes={energy:['participation','equipment','business'],charge:['participation'],solar:['participation','equipment','business'],compute:['participation','capacity']};
 const routes={fast:['Consultation','Консультация'],nurture:['Explore first','Знакомство с проектом']};
 const acquisitionPaths={direct_project:['Direct project campaign','Прямая реклама проекта'],community_interest:['Community by shared interest','Сообщество по интересам'],academy_education:['Academy education','Обучение в Академии']};
 const projectIds=new Set(['charge','solar','compute']);
 const readableProjectIds=new Set([...projectIds,legacyProjectKey]);
 const communityArticleIds=new Set(['policy-household-budget','ai-physical-infrastructure','digital-assets-infrastructure','responsible-energy']);
 const keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid','msclkid','ttclid','landing_id','landing_host','lead_route','aff','partner_id','sub_id','ref'];
 function attribution(input={}){const v={};for(const k of keys)if(typeof input[k]==='string')v[k]=input[k].slice(0,300);return v;}
 function normalize(input){if(!input)return null;const route=input.route,topic=input.topic,purpose=input.purpose,country=input.country;if(!Object.hasOwn(routes,route)||!Object.hasOwn(topics,topic)||!Object.hasOwn(purposes,purpose)||!['US','CA'].includes(country))throw Error('Choose a route, topic, purpose and country.');if(topic===legacyProjectKey)throw Error('Choose a current EcoGrid direction.');if(route==='nurture'&&purpose!=='updates')throw Error('Choose exploration to follow project updates.');if(route==='fast'&&projectPurposes[topic]&&!projectPurposes[topic].includes(purpose))throw Error('Choose an objective available for this project.');return {route,topic,purpose,country};}
 function merge(previous,input,source={},at=new Date().toISOString()){
  const next=normalize(input);if(!next)return previous||null;
  const first=previous?.entryRoute||next.route;
  // A newsletter request never cancels an already requested consultation.
  const route=['fast','consult'].includes(previous?.route)?'fast':next.route;
  const current=route==='fast'&&next.route==='nurture'&&previous?{topic:previous.topic,purpose:previous.purpose}:next;
  const touch=attribution(source),history=(previous?.history||[]).slice(-19);
  const event={route:next.route,topic:next.topic,purpose:next.purpose,country:next.country,at,source:touch};
  if(!history.length||JSON.stringify({...history.at(-1),at:''})!==JSON.stringify({...event,at:''}))history.push(event);
  const nextProject=readableProjectIds.has(next.topic)?next.topic:null;
  const previousProject=readableProjectIds.has(previous?.currentProject)?previous.currentProject:(readableProjectIds.has(previous?.topic)?previous.topic:null);
  // entryProject is immutable attribution. currentProject is the direction being explored,
  // while requestedProject changes only after an explicit consultation request.
  const legacyEntryProject=previous&&(['fast','consult'].includes(previous.entryRoute)||!previous.entryRoute&&['fast','consult'].includes(previous.route))?previousProject:null;
  const entryProject=previous?.entryProject||legacyEntryProject||(!previous&&next.route==='fast'?nextProject:null);
  const currentProject=nextProject||previousProject;
  const requestedProject=next.route==='fast'&&nextProject?nextProject:(previous?.requestedProject||(['fast','consult'].includes(previous?.route)?previousProject:null));
  return {...previous,...next,...current,route,entryRoute:first,enteredAt:previous?.enteredAt||at,firstSource:previous?.firstSource||touch,lastSource:touch,consultationAt:previous?.consultationAt||(next.route==='fast'?at:null),history,...(entryProject?{entryProject}:{}),...(currentProject?{currentProject}:{}),...(requestedProject?{requestedProject}:{})};
 }
 function requestConversation(state,chosen,language,id,at=new Date().toISOString()){
  const j=normalize(chosen);if(j.route!=='fast')throw Error('Request a consultation first.');state.tickets??=[];const prior=state.tickets.find(t=>t.journeyTopic===j.topic&&t.status!=='Resolved'&&!t.service?.closed);if(prior)return prior;
  const ru=language==='ru',name=label(topics,j.topic,language),subject=(ru?'Обсудить проект · ':'Project discussion · ')+name,message=(ru?'Хочу обсудить направление: ':'I would like to discuss: ')+name+'. '+label(purposes,j.purpose,language)+'. '+(j.country==='CA'?(ru?'Канада':'Canada'):(ru?'США':'United States'));
  const ticket={id,subject,message,reply:'',date:at,status:'Open',journeyTopic:j.topic,messages:[{id,from:'client',text:message,date:at}],service:{closed:false}};state.tickets.push(ticket);return ticket;
 }
 function clientPreferenceInput(previous,values,language='en'){
  if(!['updates','participation','capacity'].includes(values.purpose)||!Object.hasOwn(projectTopics,values.topic))throw Error('Choose a project and next step.');
  const purpose=values.purpose;
  if(purpose==='capacity'&&values.topic!=='compute')throw Error('Choose a project and next step.');
  const consultationRequested=purpose!=='updates',route=consultationRequested?'fast':'nurture';
  return {consultationRequested,journey:normalize({route,topic:values.topic,purpose,country:values.country}),marketingConsent:values.marketingConsent==='on',language:language==='ru'?'ru':'en'};
 }
 function entry(record){return record.context?.journey||record.journey||record.state?.journey||null;}
 function projectContext(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const firstHistory=Array.isArray(j.history)?j.history.find(item=>projectIds.has(item?.topic)):null;
  const entryProject=projectIds.has(j.entryProject)?j.entryProject:(projectIds.has(content.entryProject)?content.entryProject:(['fast','consult'].includes(j.entryRoute)?(projectIds.has(firstHistory?.topic)?firstHistory.topic:(projectIds.has(j.topic)?j.topic:null)):null));
  const currentProject=projectIds.has(j.currentProject)?j.currentProject:(projectIds.has(j.topic)?j.topic:null);
  const requestedProject=projectIds.has(j.requestedProject)?j.requestedProject:(['fast','consult'].includes(j.route)?currentProject:null);
  return {entryProject:entryProject||null,currentProject:currentProject||null,requestedProject:requestedProject||null};
 }
 function acquisition(record={}){
  const state=record.state||record,content=record.context?.content||state.content||{},j=entry(record)||{};
  const entryArticle=typeof content.entryId==='string'&&/^[a-z0-9][a-z0-9-]{0,79}$/.test(content.entryId)?content.entryId:'';
  const inferred=entryArticle?(communityArticleIds.has(entryArticle)?'community_interest':'academy_education'):['fast','consult'].includes(j.entryRoute)?'direct_project':['academy','ai','ecocoin'].includes(j.topic)?'academy_education':'community_interest';
  const path=Object.hasOwn(acquisitionPaths,content.acquisitionPath)?content.acquisitionPath:inferred;
  const projects=projectContext(record),project=projects.requestedProject||projects.currentProject;
  return {path,articleAssist:content.articleAssist===true,entryArticle,project,...projects,purpose:j.purpose||null};
 }
 function communityEntry(state={}){const j=entry(state);return j?.route==='nurture'&&['club','academy','ecocoin'].includes(j.topic)&&!state.plan&&!state.planDraft&&!state.requests?.some(r=>r.type==='topup');}
 function academyStage(state={}){
  if(state.plan?.status==='active'||state[legacyPositionsKey]?.some(p=>p.status!=='closed'&&p.capital>0))return 'active';
  const context=projectContext(state),project=context.requestedProject||(state.plan||state.planDraft?'charge':null),presentationProject=projectIds.has(state.academy?.presentationProject)?state.academy.presentationProject:null;
  if((state.academy?.presentationComplete===true&&project&&(!presentationProject||presentationProject===project))||state.planDraft?.savedBy==='manager')return 'proposal';
  return 'new';
 }
 // Presentation controls the first funding prompt, not access to existing money.
 function needsAcademy(state={}){
  return academyStage(state)==='new'&&!(Number(state.balance)>0)&&!state.requests?.some(r=>r.type==='topup'&&['Pending','Approved'].includes(r.status));
 }
 function exploring(record){return entry(record)?.route==='nurture';}
 function label(group,key,lang='en'){return (group[key]||['—','—'])[lang==='ru'?1:0];}
 function cohorts(rows,dimension='entryRoute',at=Date.now()){
  const groups=new Map();for(const r of rows){const j=r.journey||{},key=dimension==='acquisitionPath'?acquisition(r).path:dimension==='topic'?r.requestedProject||j.topic||'unknown':dimension==='partner'?(j.firstSource?.partner_id||j.firstSource?.aff||r.source?.partner_id||r.source?.aff||'direct'):j.entryRoute||'legacy';let g=groups.get(key);if(!g){g={key,contacts:0,consultations:0,qualified:0,accounts:0,paid:0,ageDays:0,daysToPaid:0};groups.set(key,g);}g.contacts++;g.consultations+=!!j.consultationAt||(!j.entryRoute&&r.connected)?1:0;g.qualified+=r.qualified?1:0;g.accounts+=r.account?1:0;const started=Date.parse(j.enteredAt||r.created);if(Number.isFinite(started))g.ageDays+=Math.max(0,at-started)/86400000;if(r.paidAt&&Number.isFinite(Date.parse(r.paidAt))){g.paid++;if(Number.isFinite(started))g.daysToPaid+=Math.max(0,Date.parse(r.paidAt)-started)/86400000;}}
  return [...groups.values()].map(g=>({...g,averageAgeDays:g.contacts?g.ageDays/g.contacts:null,averageDaysToPaid:g.paid?g.daysToPaid/g.paid:null,paidRate:g.contacts?g.paid/g.contacts:0}));
 }
 return {needsAcademy,clientPreferenceInput,academyStage,communityEntry,requestConversation,projectContext,version,topics,projectTopics,purposes,projectPurposes,routes,acquisitionPaths,keys,attribution,normalize,merge,entry,acquisition,exploring,label,cohorts,projectIds,readableProjectIds};
});
