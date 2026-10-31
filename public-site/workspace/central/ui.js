'use strict';
window.EcoCentral={
 t:(en,ru)=>window.EcoLocale?.language==='ru'?ru:en,
 esc:value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 money:value=>new Intl.NumberFormat(window.EcoLocale?.locale||'en-US',{style:'currency',currency:'USD'}).format(value),
 async api(route,method='GET',body){const r=await fetch(new URL('api/'+route,document.baseURI),{method,credentials:'same-origin',headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok){const e=Error(data.error||'Unable to save.');e.status=r.status;throw e;}return data;}
};
