(function(root,factory){const model=factory(typeof module==='object'&&module.exports?require('./calendar-yield.js'):root.EcoCalendarYield);if(typeof module==='object'&&module.exports)module.exports=model;else root.EcoFinance=model;})(typeof window==='undefined'?globalThis:window,function(calendar){
 'use strict';
 const tiers=Object.freeze([{id:'single',name:'Single',count:1,rate:13,minimum:250},{id:'network',name:'Network',count:3,rate:14,minimum:500},{id:'portfolio',name:'Portfolio',count:5,rate:15,minimum:800},{id:'scale',name:'Custom',count:10,rate:16,minimum:1000}].map(Object.freeze));
 const presets=Object.freeze([250,500,800]),minimum=250,maximum=10000000,paymentMaximum=100000,paymentMinimum=1,companyFee=0;
 const round=n=>Math.round(n*100)/100;
 const monthly=(capital,rate)=>calendar.monthCents(capital,rate)/100;
 const weekly=(capital,rate,start=Date.now(),basis=calendar.BASIS)=>basis==='week'?Math.round(capital*rate)/100:calendar.centsBetween(capital,rate,typeof start==='number'?start:Date.parse(start),(typeof start==='number'?start:Date.parse(start))+calendar.WEEK)/100;
 const eligible=(capital,tierId)=>{const tier=tiers.find(t=>t.id===tierId);return !!tier&&valid(capital)&&capital>=tier.minimum;};
 const periodTerms=(plan,start)=>plan?.rateTransition&&(typeof start==='number'?start:Date.parse(start))<Date.parse(plan.rateTransition.at)?{rate:plan.rateTransition.rate,ratePeriod:'week'}:{rate:plan?.rate||0,ratePeriod:plan?.ratePeriod||'week'};
 const planWeekly=(plan,start=Date.now())=>{const terms=periodTerms(plan,start);return plan?weekly(plan.capital,terms.rate,start,terms.ratePeriod):0;};
 function nextPeriodStart(a){let from=Date.parse(a.plan?.appliedAt);if(!Number.isFinite(from))return NaN;while((a.sessions||[]).some(s=>{if(s.period!=='week')return false;const begin=Date.parse(s.periodStart||s.weekStart+'T00:00:00.000Z'),end=Date.parse(s.periodEnd)||begin+calendar.WEEK;return Number.isFinite(begin)&&from<end&&from+calendar.WEEK>begin;}))from+=calendar.WEEK;return from;}
 const valid=n=>Number.isFinite(n)&&n>=0&&n<=maximum&&Math.abs(n*100-Math.round(n*100))<.00001;
 // Accept unambiguous US or Russian amounts; reject mixed/invalid groupings.
 function parseAmount(value){
  if(typeof value==='number')return valid(value)?value:NaN;
  if(typeof value!=='string')return NaN;
  let s=value.trim().replace(/[\u00a0\u202f]/g,' ');if(!s)return NaN;
  if(/^\d{1,3}( \d{3})+([.,]\d{1,2})?$/.test(s))s=s.replaceAll(' ','').replace(',','.');
  else if(/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/.test(s))s=s.replaceAll(',','');
  else if(/^\d+([.,]\d{1,2})?$/.test(s))s=s.replace(',','.');
  else return NaN;
  const n=Number(s);return valid(n)?n:NaN;
 }
 function summary(a){
  const active=a.plan?.status==='active'?a.plan:null,draft=a.planDraft||null;
  const balance=round(Number(a.balance)||0),capital=active?.capital||0;
  const reserved=round((a.requests||[]).filter(r=>r.type==='withdraw'&&r.status==='Pending').reduce((s,r)=>s+r.amount,0));
  const available=Math.max(0,round(balance-reserved));
  const recorded=round((a.sessions||[]).reduce((s,r)=>s+(Number(r.payout)||0),0));
  const pending=(a.requests||[]).filter(r=>r.type==='topup'&&r.status==='Pending');
  const gap=draft?Math.max(0,round(draft.capital-capital-available)):null;
  const stage=active?'active':pending.length?'pending':draft&&gap===0?'ready':draft?'draft':available>0?'funded':'new';
  return {balance,capital,reserved,available,recorded,total:round(balance+capital),active,draft,pending,gap,stage,weekly:planWeekly(active,Number.isFinite(nextPeriodStart(a))?nextPeriodStart(a):Date.now()),monthly:active&&active.ratePeriod===calendar.BASIS?monthly(active.capital,active.rate):null};
 }
 const stationSelectable=(station,plan)=>!!station&&(!station.selectionClosed||(plan?.status==='active'&&plan.stationIds?.includes(station.id)));
 return Object.freeze({stationSelectable,version:3,period:"week",ratePeriod:calendar.BASIS,calendar,monthly,eligible,periodTerms,planWeekly,nextPeriodStart,tiers,presets,minimum,maximum,paymentMinimum,paymentMaximum,companyFee,round,weekly,valid,parseAmount,summary});
});
