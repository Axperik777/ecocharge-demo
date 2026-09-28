'use strict';
(()=>{
 const form=document.querySelector('[data-solar-form]');if(!form)return;
 const field=n=>form.elements.namedItem(n),select=field('solarSystem'),panel=field('solarPanel'),storage=field('solarBattery'),battery=field('solarBatteryModel'),kind=field('solarRequestType'),country=field('solarCountry'),charger=field('solarCharger'),vehicle=field('solarVehicle'),zip=field('solarZip'),summary=document.querySelector('[data-solar-selection]');
 const t=s=>window.EcoLocale?.t(s)||s;
 function paint(){document.querySelectorAll('[data-solar-review-quote]').forEach(el=>{el.textContent=window.EcoLocale?.language==='ru'?el.dataset.quoteRu:el.dataset.quoteEn;});
  const solar=kind.value==='solar',charging=kind.value==='charging',ca=country.value==='CA';for(const el of [select,panel,storage]){el.disabled=!solar;el.closest('label').hidden=!solar;}
  const wants=solar&&storage.value==='yes';battery.disabled=!wants;form.querySelector('[data-solar-battery-field]').hidden=!wants;if(!wants)battery.value='';charger.disabled=!charging;vehicle.disabled=!charging;form.querySelector('[data-solar-charger-field]').hidden=!charging;
  zip.placeholder=ca?'M5V 2T6':'32801';zip.inputMode=ca?'text':'numeric';zip.maxLength=ca?7:5;zip.pattern=ca?'[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]':'[0-9]{5}';field('solarBill').placeholder=(ca?'CAD':'USD')+' / '+t('month');
  for(const [hook,value]of [['solarPick',solar?select.value:''],['panelPick',solar?panel.value:''],['batteryPick',wants?battery.value:''],['chargerPick',charging?charger.value:'']])document.querySelectorAll('[data-'+hook.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())+']').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[hook]===value)));
  if(kind.value==='consultation'){summary.textContent=t('A specialist will help you choose. No system or charger selection is required.');return;}
  if(charging){const c=EcoSolar.charger(charger.value);summary.textContent=(c?EcoSolar.brandName(c)+' · '+c.maxKW+' kW · '+c.connector+'. ':'')+t('Charger and installation price confirmed in your quote.');return;}
  const s=EcoSolar.find(select.value),p=EcoSolar.panel(panel.value);if(!s||!p)return;
  const array=EcoSolar.arrayFor(s.id,p.id),price=new Intl.NumberFormat(window.EcoLocale?.language==='ru'?'ru-RU':'en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(s.estimateUsd),b=EcoSolar.battery(battery.value);
  summary.textContent=s.name+' · '+EcoSolar.brandName(p)+' · '+array.panels+' × '+p.powerW+' W · '+array.arrayKw.toFixed(2)+' kW DC. '+(p.id==='qcells-440'?price+' USD · '+t('Planning estimate before incentives'):t('Selected equipment requires a new quote.'))+(ca?' '+t('U.S. price reference only. Your Canadian quote will specify local costs and currency.'):'')+(wants?' '+(b?EcoSolar.brandName(b)+' · '+b.capacityKWh+' kWh. ':'')+t('Battery and backup equipment quoted separately.'):'');
 }
 const focus=el=>{document.getElementById('solar-quote').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});el.focus({preventScroll:true});};
 document.querySelectorAll('[data-solar-pick]').forEach(b=>b.addEventListener('click',()=>{kind.value='solar';select.value=b.dataset.solarPick;paint();focus(select);}));
 document.querySelectorAll('[data-panel-pick]').forEach(b=>b.addEventListener('click',()=>{kind.value='solar';panel.value=b.dataset.panelPick;paint();focus(panel);}));
 document.querySelectorAll('[data-battery-pick]').forEach(b=>b.addEventListener('click',()=>{kind.value='solar';storage.value='yes';battery.value=b.dataset.batteryPick;paint();focus(battery);}));
 document.querySelectorAll('[data-charger-pick]').forEach(b=>b.addEventListener('click',()=>{kind.value='charging';charger.value=b.dataset.chargerPick;paint();focus(charger);}));
 document.querySelectorAll('[data-consultation]').forEach(b=>b.addEventListener('click',()=>{kind.value='consultation';paint();focus(kind);}));
 for(const el of [select,panel,storage,battery,kind,country,charger])el.addEventListener('change',paint);document.addEventListener('ecocharge:locale',paint);paint();
})();
