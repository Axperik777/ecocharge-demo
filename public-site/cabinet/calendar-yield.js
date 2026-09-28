(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./demand-rhythm.js'):root.EcoDemandRhythm);if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoCalendarYield=api;})(typeof window==='undefined'?globalThis:window,function(rhythm){
 'use strict';
 const DAY=86400000,WEEK=7*DAY,BASIS='calendar-month',VERSION='calendar-v1',SCALE=1000000000n;
 const time=v=>typeof v==='number'?v:Date.parse(v);
 const roundDiv=(n,d)=>(n+d/2n)/d;
 function monthCents(capital,rate){if(!Number.isFinite(capital)||!Number.isFinite(rate)||capital<=0||rate<=0)return 0;const c=Math.round(capital*100),b=Math.round(rate*100);if(!Number.isSafeInteger(c)||!Number.isSafeInteger(b))return 0;return Number(roundDiv(BigInt(c)*BigInt(b),10000n));}
 function bounds(at){const d=new Date(at),start=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),1),end=Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1);return {start,end,days:(end-start)/DAY};}
 // Round cumulative cents at each boundary. Adjacent periods telescope: a whole
 // calendar month is exactly monthCents, including February and leap years.
 // Demand weights are time units; all monetary multiplication uses integers.
 function centsBetween(capital,rate,from,to,curve='demand-v1'){
  let a=time(from);const b=time(to),target=monthCents(capital,rate);if(!target||!Number.isFinite(a)||!Number.isFinite(b)||b<=a)return 0;
  if(b-a>3660*DAY)throw Error('Calculation interval is too long.');let total=0;
  while(a<b){const m=bounds(a),end=Math.min(b,m.end),at=t=>{const units=t===m.end?BigInt(m.days)*SCALE:BigInt(Math.round((curve===rhythm.VERSION?rhythm.fraction(m.start,t):(t-m.start)/DAY)*Number(SCALE)));return Number(roundDiv(BigInt(target)*units,BigInt(m.days)*SCALE));};total+=at(end)-at(a);a=end;}return total;
 }
 return Object.freeze({DAY,WEEK,BASIS,VERSION,monthCents,bounds,centsBetween});
});
