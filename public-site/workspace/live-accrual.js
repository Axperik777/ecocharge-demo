(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./demand-rhythm.js'),require('./calendar-yield.js'));else root.EcoLiveAccrual=factory(root.EcoDemandRhythm,root.EcoCalendarYield);})(typeof window==='undefined'?globalThis:window,function(rhythm,calendar){
 'use strict';
 const SETTLEMENT_DAYS=4,PERIOD_MS=SETTLEMENT_DAYS*24*60*60*1000;
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
 function liveAccrual({capital=0,weeklyRatePercent=0,periodStartedAt,periodEndsAt,now=Date.now(),active=true,curve,period,ratePeriod,monthlyRatePercent,aiRateBonus=0,aiActiveFrom,aiActiveUntil}={}){
  const start=timestamp(periodStartedAt),requestedEnd=timestamp(periodEndsAt),basis=ratePeriod||'week',legacyWeek=period==='week'||ratePeriod===undefined,end=Number.isFinite(requestedEnd)&&requestedEnd>start?requestedEnd:start+(legacyWeek?calendar.WEEK:PERIOD_MS),time=timestamp(now),monthly=basis===calendar.BASIS,rate=monthly?(monthlyRatePercent??weeklyRatePercent):weeklyRatePercent;
  const aiStart=timestamp(aiActiveFrom),aiEnd=timestamp(aiActiveUntil),amountTo=to=>{if(!monthly)return Math.round(weeklyCents(capital,rate)*(to-start)/calendar.WEEK);const cuts=[start,to];if(Number.isFinite(aiStart)&&aiStart>start&&aiStart<to)cuts.push(aiStart);if(Number.isFinite(aiEnd)&&aiEnd>start&&aiEnd<to)cuts.push(aiEnd);cuts.sort((a,b)=>a-b);let cents=0;for(let i=0;i<cuts.length-1;i++){const from=cuts[i],until=cuts[i+1],boost=Number.isFinite(aiStart)&&Number.isFinite(aiEnd)&&from>=aiStart&&from<aiEnd?aiRateBonus:0;cents+=calendar.centsBetween(capital,rate+boost,from,until,curve);}return cents;};
  const earnedCents=amountTo(end);
  if(!active||!earnedCents||!Number.isFinite(start)||!Number.isFinite(end)||!Number.isFinite(time))return {periodEarn:0,weeklyEarn:0,liveEarned:0,progress:0,msRemaining:0};
  const duration=end-start,elapsed=Math.max(0,Math.min(duration,time-start)),progress=elapsed/duration;
  const earnedFraction=curve===rhythm?.VERSION?Math.min(1,rhythm.fraction(start,start+elapsed)/7):progress;
  const liveCents=Math.min(earnedCents,Math.max(0,monthly?amountTo(start+elapsed):Math.round(earnedCents*earnedFraction)));
  return {periodEarn:earnedCents/100,weeklyEarn:earnedCents/100,liveEarned:liveCents/100,progress,msRemaining:duration-elapsed};
 }
 return Object.freeze({SETTLEMENT_DAYS,PERIOD_MS,cents,weeklyCents,liveAccrual});
});
