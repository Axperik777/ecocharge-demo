'use strict';
// This file is included only in the separate GitHub Pages presentation export.
(()=>{
 const fixture=window.ECO_PAGES_FIXTURE;
 if(!window.ECO_PLATFORM_CONFIG?.clientPreview||!fixture)throw Error('Client preview configuration required');
 window.ECO_SHARED_CONTEXT=structuredClone(fixture.responses['client/account']);
 window.PORTAL_ROLE='client';
 window.EcoPagesMessage=()=>new URL(location).searchParams.get('lang')==='ru'?'Это просмотр примера. Пополнения, выводы и сообщения не отправляются.':'This is a sample account preview. Funding, withdrawals and messages are not submitted.';
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
