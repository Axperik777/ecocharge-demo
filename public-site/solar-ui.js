'use strict';
(()=>{
 const form=document.querySelector('[data-solar-form]');
 if(!form)return;
 const field=name=>form.elements.namedItem(name);
 const system=field('solarSystem'),panel=field('solarPanel'),storage=field('solarBattery'),battery=field('solarBatteryModel'),country=field('solarCountry'),zip=field('solarZip'),bill=field('solarBill'),summary=form.querySelector('[data-solar-selection]');
 const t=value=>value;
 const scrollToForm=target=>{
  document.getElementById('solar-fit')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  setTimeout(()=>target?.focus?.({preventScroll:true}),0);
 };
 function paint(){
  const ca=country.value==='CA',wantsStorage=storage.value==='yes';
  zip.placeholder=ca?'M5V 2T6':'32801';
  zip.inputMode=ca?'text':'numeric';
  zip.maxLength=ca?7:5;
  zip.pattern=ca?'[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]':'[0-9]{5}';
  bill.placeholder=(ca?'CAD':'USD')+' / '+t('month');
  battery.disabled=!wantsStorage;
  form.querySelector('[data-solar-battery-field]').hidden=!wantsStorage;
  if(!wantsStorage)battery.value='';
  for(const [attribute,value] of [['solarPick',system.value],['panelPick',panel.value],['batteryPick',wantsStorage?battery.value:'']]){
   const dataName='data-'+attribute.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase());
   document.querySelectorAll('['+dataName+']').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset[attribute]===value)));
  }
  const selectedSystem=EcoSolar.find(system.value),selectedPanel=EcoSolar.panel(panel.value),selectedBattery=EcoSolar.battery(battery.value);
  if(!selectedSystem||!selectedPanel)return;
  const array=EcoSolar.arrayFor(selectedSystem.id,selectedPanel.id);
  const reference=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(selectedSystem.estimateUsd);
  const parts=[selectedSystem.name,EcoSolar.brandName(selectedPanel),array.panels+' × '+selectedPanel.powerW+' W',array.arrayKw.toFixed(2)+' kW DC',t('Planning reference')+': '+reference];
  if(wantsStorage)parts.push(selectedBattery?EcoSolar.brandName(selectedBattery)+' · '+selectedBattery.capacityKWh+' kWh':t('Battery model to be selected with the specialist'));
  parts.push(t('Final equipment and complete price require the property review.'));
  summary.textContent=parts.join(' · ');
 }
 document.querySelectorAll('[data-solar-pick]').forEach(button=>button.addEventListener('click',()=>{system.value=button.dataset.solarPick;paint();scrollToForm(system);}));
 document.querySelectorAll('[data-panel-pick]').forEach(button=>button.addEventListener('click',()=>{panel.value=button.dataset.panelPick;paint();scrollToForm(panel);}));
 document.querySelectorAll('[data-battery-pick]').forEach(button=>button.addEventListener('click',()=>{storage.value='yes';battery.value=button.dataset.batteryPick;paint();scrollToForm(battery);}));
 for(const element of [system,panel,storage,battery,country])element.addEventListener('change',paint);
 paint();
})();
