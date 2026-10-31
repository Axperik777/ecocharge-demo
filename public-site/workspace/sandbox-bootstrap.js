'use strict';
(()=>{
 const key='ecogrid-workspace-sandbox-v1',noticeKey='ecogrid-workspace-sandbox-notice-v1',seed=window.ECO_SANDBOX_SEED,model=window.createEcoSandbox(seed,window.EcoSandboxDomain,window.ECO_SANDBOX_STATIONS),legacyPositionsKey='min'+'ingPositions';
 const app=document.documentElement?.dataset?.app||(location.pathname.includes('/crm/')?'crm':''),clientSurface=app!=='crm',noticeText={migrated:{en:'Saved data was updated to the Charge model with 4-day settlements. History and existing positions were preserved.',ru:'Сохранённые данные обновлены до модели Charge с фиксацией раз в 4 дня. История и существующие позиции сохранены.'},refreshed:{en:'An updated version was published. Your records were refreshed with current dates.',ru:'Опубликована новая версия. Данные обновлены, даты актуальны.'},reset:{en:'Saved data was damaged or incompatible. The initial account records were restored. Review them before continuing.',ru:'Сохранённые данные были повреждены или несовместимы. Восстановлены исходные данные аккаунта. Проверьте их перед продолжением.'}},language=()=>!clientSurface&&new URLSearchParams(location.search).get('lang')==='ru'?'ru':'en',queueNotice=code=>{try{localStorage.setItem(noticeKey,code);}catch{}},consumeNotice=()=>{let code='';try{code=localStorage.getItem(noticeKey)||'';if(code)localStorage.removeItem(noticeKey);}catch{}return noticeText[code]?.[language()]||'';};
 const save=db=>{try{localStorage.setItem(key,JSON.stringify(db));return true;}catch{return false;}};
 const normalizeAccount=(account,fresh)=>{const next={...(fresh||{}),...account,state:{...(fresh?.state||{}),...(account?.state||{})}},state=next.state;
  // Historical settlements and pre-existing legacy positions are user records: preserve them byte-for-byte.
  state.sessions=Array.isArray(account?.state?.sessions)?account.state.sessions:(fresh?.state?.sessions||[]);
  state[legacyPositionsKey]=Array.isArray(account?.state?.[legacyPositionsKey])?account.state[legacyPositionsKey]:(fresh?.state?.[legacyPositionsKey]||[]);
  state.activeOffer='charge';state.economyModel='charge-fixed-obligation-v3';state.settlementModel='fixed-company-obligation';state.settlementDays=4;
  if(state.plan){const legacyEconomyModel=state.plan.economyModel,legacyRate=state.plan.rate,legacyRatePeriod=state.plan.ratePeriod||'week',tierRates={single:13,network:14,portfolio:15,scale:16},currentRate=tierRates[state.plan.tierId]??(Number(state.plan.capital)>=1000?16:Number(state.plan.capital)>=800?15:Number(state.plan.capital)>=500?14:13),legacy=legacyEconomyModel!=='charge-fixed-obligation-v3'||legacyRatePeriod!=='calendar-month';state.plan={...state.plan,rate:currentRate,economyModel:'charge-fixed-obligation-v3',settlementModel:'fixed-company-obligation',ratePeriod:'calendar-month',settlementDays:4};if(legacy){state.plan.legacyEconomyModel=legacyEconomyModel||'unknown';state.plan.legacyRate=legacyRate;state.plan.legacyRatePeriod=legacyRatePeriod;}}
  return next;
 };
 const migrate=db=>{if(!db||typeof db!=='object'||!db.accounts||typeof db.accounts!=='object')throw Error('Invalid saved workspace.');if(db.schema===seed.schema)return db;if(db.schema!==1||seed.schema!==2)throw Error('Unsupported saved workspace schema.');const fresh=model.initial(),accounts={};for(const [uid,account]of Object.entries(db.accounts))accounts[uid]=normalizeAccount(account,fresh.accounts?.[uid]);return {...fresh,...db,schema:seed.schema,activeOffer:'charge',chargeModel:'charge-fixed-obligation-v3',settlementDays:4,accounts};};
 const read=()=>{const raw=localStorage.getItem(key);if(!raw)return model.initial();try{const stored=JSON.parse(raw);if(typeof seed?.generatedAt==='string'&&stored?.generatedAt!==seed.generatedAt){const fresh=model.initial();save(fresh);queueNotice('refreshed');return fresh;}const db=migrate(stored);if(db!==stored){save(db);queueNotice('migrated');}return db;}catch{const fresh=model.initial();save(fresh);queueNotice('reset');return fresh;}};
 const params=new URL(location).searchParams,showcase=clientSurface&&params.get('showcase')==='portfolio',initial=showcase?model.initial():read();
 if(showcase){save(initial);localStorage.removeItem('ecogrid-sandbox-client');}
 const showcaseClientId=showcase?initial.qa?.portfolio?.clientId:null;
 let clientId=showcaseClientId||params.get('client')||localStorage.getItem('ecogrid-sandbox-client')||Object.keys(initial.accounts)[0];if(!initial.accounts[clientId])clientId=Object.keys(initial.accounts)[0];
 const requestedRole=params.get('role'),role=requestedRole==='manager'?'ftd':requestedRole==='admin'?'admin':sessionStorage.getItem('ecogrid-sandbox-role')==='ftd'?'ftd':'admin';
 if(requestedRole)sessionStorage.setItem('ecogrid-sandbox-role',role);
 const context=()=>({clientId,role});
 async function request(route,method='GET',body={}){
  const run=()=>{const result=model.execute(read(),route,method,body,context());if(method!=='GET'){try{localStorage.setItem(key,JSON.stringify(result.db));}catch{throw Error(clientSurface?'Unable to save: browser storage is full or unavailable.':'Не удалось сохранить: память браузера заполнена или недоступна.');}window.dispatchEvent(new Event('ecogrid:sandbox-change'));}return result.result;};
  return navigator.locks? navigator.locks.request(key,run):run();
 }
 window.EcoSandbox={read,request,model,context,clientId,role,consumeNotice,select(uid){if(!read().accounts[uid])throw Error(clientSurface?'Client not found.':'Клиент не найден');localStorage.setItem('ecogrid-sandbox-client',uid);clientId=uid;},reset(){localStorage.setItem(key,JSON.stringify(model.initial()));localStorage.removeItem('ecogrid-sandbox-client');localStorage.removeItem(noticeKey);},setRole(value){sessionStorage.setItem('ecogrid-sandbox-role',value);}};
 const rawFetch=window.fetch.bind(window),api=new URL('api/',document.baseURI);
 window.fetch=async(input,init={})=>{
  const url=new URL(typeof input==='string'?input:input.url||input,document.baseURI);
  if(url.origin===api.origin&&url.pathname.startsWith(api.pathname)){
   try{const method=(init.method||input.method||'GET').toUpperCase(),body=init.body?JSON.parse(init.body):{};const result=await request(url.pathname.slice(api.pathname.length)+url.search,method,body);return new Response(JSON.stringify(result),{status:200,headers:{'Content-Type':'application/json'}});}catch(e){return new Response(JSON.stringify({error:e.message}),{status:e.status||400,headers:{'Content-Type':'application/json'}});}
  }
  return rawFetch(input,init);
 };
 if(location.pathname.includes('/client/')){
  if(!clientId){location.replace(new URL('crm/?lang=ru',document.baseURI));return;}
  const replace=history.replaceState.bind(history);history.replaceState=(state,title,href)=>{const next=new URL(href||location.href,location.href);if(next.pathname.includes('/client/'))next.searchParams.set('client',clientId);return replace(state,title,next.href);};
  localStorage.setItem('ecogrid-sandbox-client',clientId);window.ECO_SHARED_CONTEXT=model.snapshot(initial,clientId);window.PORTAL_ROLE='client';localStorage.setItem('ecocharge-demo-v1',JSON.stringify(window.ECO_SHARED_CONTEXT.state));sessionStorage.setItem('ecocharge-entry:client',JSON.stringify({role:'client',user:window.ECO_SHARED_CONTEXT.client.username}));
 }
})();
