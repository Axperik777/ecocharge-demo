(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./demand-rhythm.js'),require('./calendar-yield.js'));else root.EcoLiveAccrual=factory(root.EcoDemandRhythm,root.EcoCalendarYield);})(typeof window==='undefined'?globalThis:window,function(rhythm,calendar){
 'use strict';
 const PERIOD_MS=7*24*60*60*1000;
 const cents=value=>Math.round(value*100);
 // Plan rates have at most two decimal places. Integer numerator, half-up USD rounding.
 function weeklyCents(capital,rate){
  if(!Number.isFinite(capital)||!Number.isFinite(rate)||capital<=0||rate<=0)return 0;
  const principal=cents(capital),basis=Math.round(rate*100);
  if(!Number.isSafeInteger(principal)||!Number.isSafeInteger(basis))return 0;
  const result=Number((BigInt(principal)*BigInt(basis)+5000n)/10000n);
  return Number.isSafeInteger(result)?result:0;
 }
 const timestamp=value=>typeof value==='number'?value:Date.parse(value);
 function liveAccrual({capital=0,weeklyRatePercent=0,periodStartedAt,now=Date.now(),active=true,curve,ratePeriod='week',monthlyRatePercent}={}){
  const start=timestamp(periodStartedAt),time=timestamp(now),monthly=ratePeriod===calendar.BASIS,rate=monthly?(monthlyRatePercent??weeklyRatePercent):weeklyRatePercent,earnedCents=monthly?calendar.centsBetween(capital,rate,start,start+PERIOD_MS,curve):weeklyCents(capital,rate);
  if(!active||!earnedCents||!Number.isFinite(start)||!Number.isFinite(time))return {weeklyEarn:0,liveEarned:0,progress:0,msRemaining:0};
  const elapsed=Math.max(0,Math.min(PERIOD_MS,time-start)),progress=elapsed/PERIOD_MS;
  const earnedFraction=curve===rhythm?.VERSION?Math.min(1,rhythm.fraction(start,start+elapsed)/7):progress;
  const liveCents=Math.min(earnedCents,Math.max(0,monthly?calendar.centsBetween(capital,rate,start,start+elapsed,curve):Math.round(earnedCents*earnedFraction)));
  return {weeklyEarn:earnedCents/100,liveEarned:liveCents/100,progress,msRemaining:PERIOD_MS-elapsed};
 }
 return Object.freeze({PERIOD_MS,cents,weeklyCents,liveAccrual});
});
