(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./account-finance.js'):root.EcoFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoPublicPlan=api;})(typeof window==='object'?window:globalThis,function(finance){
 'use strict';
 function normalize(value){
  const tier=finance.tiers.find(t=>t.id===value?.tierId),capital=finance.parseAmount(value?.capital),start=String(value?.start||'');
  if(!tier)throw Error('Choose a participation plan.');
  if(!finance.eligible(capital,tier.id))throw Error('Enter an amount within the limits for this plan.');
  if(!/^20\d{2}-\d{2}-\d{2}$/.test(start)||!Number.isFinite(Date.parse(start+'T00:00:00Z'))||new Date(start+'T00:00:00Z').toISOString().slice(0,10)!==start)throw Error('Choose a valid calculation start date.');
  return {version:'public-plan-v1',tierId:tier.id,capital,start};
 }
 function calculate(value){const input=normalize(value),tier=finance.tiers.find(t=>t.id===input.tierId),at=Date.parse(input.start+'T00:00:00Z');return {...input,name:tier.name,rate:tier.rate,minimum:tier.minimum,weekly:finance.weekly(input.capital,tier.rate,at),monthly:finance.monthly(input.capital,tier.rate),end:new Date(at+finance.calendar.WEEK).toISOString().slice(0,10)};}
 return Object.freeze({normalize,calculate});
});
