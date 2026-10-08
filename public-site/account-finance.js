(function(root,factory){const model=factory(typeof module==='object'&&module.exports?require('./calendar-yield.js'):root.EcoCalendarYield);if(typeof module==='object'&&module.exports)module.exports=model;else root.EcoFinance=model;})(typeof window==='undefined'?globalThis:window,function(calendar){
 'use strict';
 const tiers=Object.freeze([{id:'single',name:'Single',count:3,rate:13,minimum:250},{id:'network',name:'Network',count:3,rate:14,minimum:500},{id:'portfolio',name:'Portfolio',count:5,rate:15,minimum:800},{id:'scale',name:'Custom',count:10,rate:16,minimum:1000}].map(Object.freeze));
 const presets=Object.freeze([250,500,800]),minimum=250,maximum=10000000,paymentMaximum=100000,paymentMinimum=1,companyFee=0;
 const settlementDays=4,settlementPeriodMs=settlementDays*calendar.DAY,aiRateBonus=1,aiDays=30,aiPeriodMs=aiDays*calendar.DAY;
 const round=n=>Math.round(n*100)/100;
 const monthly=(capital,rate)=>calendar.monthCents(capital,rate)/100;
 const weekly=(capital,rate,start=Date.now(),basis=calendar.BASIS)=>basis==='week'?Math.round(capital*rate)/100:calendar.centsBetween(capital,rate,typeof start==='number'?start:Date.parse(start),(typeof start==='number'?start:Date.parse(start))+calendar.WEEK)/100;
 const eligible=(capital,tierId)=>{const tier=tiers.find(t=>t.id===tierId);return !!tier&&valid(capital)&&capital>=tier.minimum;};
 const periodTerms=(plan,start)=>plan?.rateTransition&&(typeof start==='number'?start:Date.parse(start))<Date.parse(plan.rateTransition.at)?{rate:plan.rateTransition.rate,ratePeriod:'week'}:{rate:plan?.rate||0,ratePeriod:plan?.ratePeriod||'week'};
 function aiWindow(plan){const start=Date.parse(plan?.ai?.activatedAt),requestedEnd=Date.parse(plan?.ai?.expiresAt),limit=start+aiPeriodMs;if(plan?.ai?.status!=='active'||!Number.isFinite(start))return null;const end=Number.isFinite(requestedEnd)?Math.min(requestedEnd,limit):limit;return end>start?{start,end}:null;}
 function aiActive(plan,at=Date.now()){const time=typeof at==='number'?at:Date.parse(at),window=aiWindow(plan);return !!window&&Number.isFinite(time)&&time>=window.start&&time<window.end;}
 function effectiveRate(plan,at=Date.now()){const terms=periodTerms(plan,at);return terms.rate+(aiActive(plan,at)?aiRateBonus:0);}
 function planAccrual(plan,from,to){let start=typeof from==='number'?from:Date.parse(from),end=typeof to==='number'?to:Date.parse(to);if(!plan||!Number.isFinite(start)||!Number.isFinite(end)||end<=start||!valid(plan.capital))return 0;const ai=aiWindow(plan),cuts=[start,end];if(ai){if(ai.start>start&&ai.start<end)cuts.push(ai.start);if(ai.end>start&&ai.end<end)cuts.push(ai.end);}cuts.sort((a,b)=>a-b);let total=0;for(let i=0;i<cuts.length-1;i++){const a=cuts[i],b=cuts[i+1],terms=periodTerms(plan,a);if(terms.ratePeriod===calendar.BASIS)total+=calendar.centsBetween(plan.capital,terms.rate+(aiActive(plan,a)?aiRateBonus:0),a,b);else total+=Math.round(weekly(plan.capital,terms.rate,a,'week')*100*(b-a)/calendar.WEEK);}return total/100;}
 const planSettlement=(plan,start=Date.now())=>planAccrual(plan,start,(typeof start==='number'?start:Date.parse(start))+settlementPeriodMs);
 // Kept for older callers; the current model settles a continuously accrued 4-day period.
 const planWeekly=planSettlement;
 function sessionBounds(s){if(!s||!['week','accrual'].includes(s.period))return null;const begin=Date.parse(s.periodStart||(s.weekStart?s.weekStart+'T00:00:00.000Z':s.date)),fallback=s.period==='week'?calendar.WEEK:(Number(s.settlementDays)||settlementDays)*calendar.DAY,end=Date.parse(s.periodEnd);return Number.isFinite(begin)?{begin,end:Number.isFinite(end)?end:begin+fallback}:null;}
 function nextPeriodStart(a){let from=Date.parse(a.plan?.appliedAt);if(!Number.isFinite(from))return NaN;for(let guard=0;guard<10000;guard++){const ends=(a.sessions||[]).map(sessionBounds).filter(Boolean).filter(p=>p.begin<=from&&p.end>from).map(p=>p.end);if(!ends.length)return from;from=Math.max(...ends);}throw Error('Too many overlapping accrual records.');}
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
 function profitState(a){
  const balance=round(Number(a.balance)||0),requests=Array.isArray(a.requests)?a.requests:[],sessions=Array.isArray(a.sessions)?a.sessions:[];
  const reserved=round(requests.filter(r=>r.type==='withdraw'&&r.status==='Pending').reduce((s,r)=>s+(Number(r.amount)||0),0));
  const approved=round(requests.filter(r=>r.type==='withdraw'&&r.status==='Approved').reduce((s,r)=>s+(Number(r.amount)||0),0));
  const recorded=round(sessions.reduce((s,r)=>s+(Number(r.payout)||0),0));
  const explicit=Number(a.profit?.settled),settled=Math.min(balance,Math.max(0,round(Number.isFinite(explicit)?explicit:recorded-approved)));
  const companyPayable=Math.max(0,round(Number(a.profit?.companyPayable)||0));
  return {settled,reserved,available:Math.max(0,round(settled-reserved)),freeBalance:Math.max(0,round(balance-settled)),recorded,companyPayable};
 }
 function summary(a){
  const active=a.plan?.status==='active'?a.plan:null,draft=a.planDraft||null;
  const balance=round(Number(a.balance)||0),capital=active?.capital||0,profit=profitState(a);
  const reserved=profit.reserved;
  const available=Math.max(0,round(balance-reserved));
  const recorded=profit.recorded;
  const pending=(a.requests||[]).filter(r=>r.type==='topup'&&r.status==='Pending');
  const gap=draft?Math.max(0,round(draft.capital-capital-available)):null;
  const stage=active?'active':pending.length?'pending':draft&&gap===0?'ready':draft?'draft':available>0?'funded':'new';
  const next=Number.isFinite(nextPeriodStart(a))?nextPeriodStart(a):Date.now(),accrual=planSettlement(active,next);
  return {balance,capital,reserved,available,withdrawable:profit.available,settledProfit:profit.settled,freeBalance:profit.freeBalance,companyPayable:profit.companyPayable,recorded,total:round(balance+capital),active,draft,pending,gap,stage,accrual,settlement:accrual,weekly:accrual,monthly:active&&active.ratePeriod===calendar.BASIS?monthly(active.capital,effectiveRate(active,next)):null};
 }
 const stationSelectable=(station,plan)=>!!station&&(!station.selectionClosed||(plan?.status==='active'&&plan.stationIds?.includes(station.id)));
 return Object.freeze({stationSelectable,version:5,settlementModel:'fixed-company-obligation',period:'accrual',ratePeriod:calendar.BASIS,calendar,settlementDays,settlementPeriodMs,aiRateBonus,aiDays,aiPeriodMs,monthly,eligible,periodTerms,aiWindow,aiActive,effectiveRate,planAccrual,planSettlement,planWeekly,nextPeriodStart,tiers,presets,minimum,maximum,paymentMinimum,paymentMaximum,companyFee,round,weekly,valid,parseAmount,profitState,summary});
});
