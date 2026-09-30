'use strict';
(()=>{
 const key='ecogrid-workspace-sandbox-v1',seed=window.ECO_SANDBOX_SEED,model=window.createEcoSandbox(seed,window.EcoSandboxDomain,window.ECO_SANDBOX_STATIONS);
 const read=()=>{const raw=localStorage.getItem(key);if(!raw)return model.initial();const db=JSON.parse(raw);if(db.schema!==seed.schema)throw Error('Версия сохранённых данных не поддерживается. Сбросьте просмотр.');return db;};
 const initial=read(),params=new URL(location).searchParams;
 let clientId=params.get('client')||localStorage.getItem('ecogrid-sandbox-client')||Object.keys(initial.accounts)[0];if(!initial.accounts[clientId])clientId=Object.keys(initial.accounts)[0];
 const requestedRole=params.get('role'),role=requestedRole==='manager'?'ftd':requestedRole==='admin'?'admin':sessionStorage.getItem('ecogrid-sandbox-role')==='ftd'?'ftd':'admin';
 if(requestedRole)sessionStorage.setItem('ecogrid-sandbox-role',role);
 const context=()=>({clientId,role});
 async function request(route,method='GET',body={}){
  const run=()=>{const result=model.execute(read(),route,method,body,context());if(method!=='GET'){try{localStorage.setItem(key,JSON.stringify(result.db));}catch{throw Error('Не удалось сохранить: память браузера заполнена или недоступна.');}window.dispatchEvent(new Event('ecogrid:sandbox-change'));}return result.result;};
  return navigator.locks? navigator.locks.request(key,run):run();
 }
 window.EcoSandbox={read,request,model,context,clientId,role,select(uid){if(!read().accounts[uid])throw Error('Клиент не найден');localStorage.setItem('ecogrid-sandbox-client',uid);clientId=uid;},reset(){localStorage.setItem(key,JSON.stringify(model.initial()));localStorage.removeItem('ecogrid-sandbox-client');},setRole(value){sessionStorage.setItem('ecogrid-sandbox-role',value);}};
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
