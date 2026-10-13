'use strict';
// This file is included only in the separate GitHub Pages presentation export.
(()=>{
 const fixture=window.ECO_PAGES_FIXTURE;
 if(!window.ECO_PLATFORM_CONFIG?.clientPreview||!fixture)throw Error('Client workspace configuration required');
 window.ECO_SHARED_CONTEXT=structuredClone(fixture.responses['client/account']);
 window.PORTAL_ROLE='client';
 window.EcoPagesMessage=()=>new URL(location).searchParams.get('lang')==='ru'?'Данные этого кабинета сохраняются в текущем браузере. Общая серверная синхронизация, платежи и сообщения включаются после размещения серверной части и подключения платёжного провайдера.':'This account stores data in the current browser. Shared server sync, payments and messaging become available after the server deployment and payment-provider connection.';
 const originalFetch=window.fetch.bind(window);
 window.fetch=async(input,init={})=>{
  const url=new URL(typeof input==='string'?input:input.url||input,document.baseURI),api=new URL('api/',document.baseURI);
  if(url.origin===api.origin&&url.pathname.startsWith(api.pathname)){
   const key=url.pathname.slice(api.pathname.length),method=(init.method||input.method||'GET').toUpperCase();
   const body=method==='GET'?fixture.responses[key]:undefined;
   return new Response(JSON.stringify(body||{error:window.EcoPagesMessage()}),{status:body?200:503,headers:{'Content-Type':'application/json'}});
  }
  return originalFetch(input,init);
 };
})();
