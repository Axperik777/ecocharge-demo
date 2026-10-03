'use strict';
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('../solar-catalog.js'):root.EcoSolar);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoEquipment=api;})(typeof window==='object'?window:globalThis,solar=>{
 const mining=typeof module==='object'&&module.exports?require('../mining-model.js'):globalThis.EcoMining;
 const names={mining:['Mining','Майнинг'],solar:['Solar panels','Солнечные панели'],storage:['Energy storage','Накопители'],charging:['EV charging','Зарядки EV'],consultation:['Specialist help','Помощь специалиста']};
 const title=(kind,lang='en')=>(names[kind]||names.consultation)[lang==='ru'?1:0];
 function request(input={}){
  if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Choose an inquiry type.');
  const kind=input.solarRequestType;if(!names[kind])throw Error('Choose an inquiry type.');
  if(kind==='mining')return mining.inquiry({route:input.miningRoute,country:input.solarCountry,minerId:input.miningMiner,coinId:input.miningCoin,budgetUsd:input.miningBudget,units:input.miningUnits,note:input.note});
  const common={solarRequestType:kind,solarCountry:input.solarCountry,solarZip:input.solarZip,solarProperty:input.solarProperty,solarBill:input.solarBill};
  const selection=kind==='solar'?{solarSystem:input.solarSystem,solarPanel:input.solarPanel,solarBattery:input.solarBattery,solarBatteryModel:input.solarBattery==='yes'?input.solarBatteryModel:''}:kind==='storage'?{solarBattery:'yes',solarBatteryModel:input.solarBatteryModel}:kind==='charging'?{solarCharger:input.solarCharger,solarVehicle:input.solarVehicle}:{};
  const value=solar.inquiry({...common,...selection}),note=typeof input.note==='string'?input.note.trim():'';
  if(note.length>1000)throw Error('Keep your equipment note under 1000 characters.');
  return {...value,note};
 }
 function rows(q,lang='en'){if(q.requestType==='mining')return mining.rows(q,lang);
  const t=(en,ru)=>lang==='ru'?ru:en,p=q.preferredPanel,b=q.preferredBattery,c=q.preferredCharger;
  return [
   [t('Request','Заявка'),title(q.requestType,lang)],
   [t('Country','Страна'),q.country==='CA'?t('Canada','Канада'):t('United States','США')],
   [t('Postal code','Почтовый индекс'),q.zip],
   [t('Property','Объект'),({owner:t('My home','Мой дом'),planning:t('Home being planned','Планируемый дом'),business:t('Business property','Коммерческий объект'),other:t('Discuss with a specialist','Уточню со специалистом')})[q.property]],
   ...(q.systemId?[[t('System','Система'),q.name]]:[]),
   ...(p?[[t('Panels','Панели'),`${p.brandName||solar.brandName(solar.panel(p.id))} · ${p.panels} × ${p.powerW} W · ${p.arrayKw} kW`]]:[]),
   ...(b?[[t('Storage','Накопитель'),`${b.brandName||solar.brandName(solar.battery(b.id))} · ${b.capacityKWh} kWh`]]:q.battery==='yes'?[[t('Storage','Накопитель'),t('Help me choose','Помогите выбрать')]]:[]),
   ...(c?[[t('Charger','Зарядка'),`${c.brandName||solar.brandName(solar.charger(c.id))} · ${c.maxKW} kW · ${c.connector}`]]:q.requestType==='charging'?[[t('Charger','Зарядка'),t('Help me choose','Помогите выбрать')]]:[]),
   ...(c?.pricing?[[t('Equipment estimate · USD','Ориентир оборудования · USD'),c.pricing.equipmentPriceUsd.toFixed(2)+' USD · '+t('installation, delivery and taxes separate','монтаж, доставка и налоги отдельно')],[t('Price reference','Основание цены'),c.pricing.referenceModel+' · '+c.pricing.referencePriceUsd.toFixed(2)+' USD × 0.81 · '+c.pricing.checkedAt]]:[]),
   ...(q.vehicle?[[t('Vehicle','Автомобиль'),q.vehicle]]:[]),
   ...(q.billMonthly!==null?[[t('Monthly electricity bill','Счёт за электричество в месяц'),`${q.billMonthly} ${q.billCurrency}`]]:[]),
   ...(q.note?[[t('Your note','Комментарий'),q.note]]:[])
  ];
 }
 const message=(q,lang)=>rows(q,lang).map(([k,v])=>k+': '+v).join('\n');
 return {names,title,request,rows,message};
});
