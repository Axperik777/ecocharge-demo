(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../demand-rhythm.js'));else root.EcoEnergyModel=factory(root.EcoDemandRhythm);})(typeof globalThis!=='undefined'?globalThis:this,function(rhythm){
 'use strict';
 // Illustrative demand profiles, not station telemetry or a production AI prediction.
 const {hours,sites}=rhythm;
 function sample(hour=18,peak=false,budget=900){hour=Number.isFinite(hour)?Math.max(0,Math.min(24,hour)):18;budget=Number.isFinite(budget)?Math.max(0,budget):900;
  const index=Math.min(hours.length-2,Math.max(0,hours.findIndex((h,i)=>hours[i+1]>=hour))),ratio=(hour-hours[index])/(hours[index+1]-hours[index]);
  const rows=sites.map(s=>{const load=Math.min(100,(s.profile[index]+(s.profile[index+1]-s.profile[index])*ratio)*(peak?({city:1.35,highway:1.65,retail:1.15}[s.id]):1));const capacity=s.ports*s.kwPerPort;return {...s,load,capacity,demand:capacity*load/100};});
  const demand=rows.reduce((n,s)=>n+s.demand,0),factor=demand?Math.min(1,budget/demand):0;
  const allocated=Math.min(demand,budget),result=rows.map(s=>({...s,allocated:s.demand*factor,displayAllocated:Math.floor(s.demand*factor)}));
  // Whole-kW labels add up to the displayed total without rounding drift.
  const remainder=Math.round(allocated)-result.reduce((n,s)=>n+s.displayAllocated,0);
  result.slice().sort((a,b)=>(b.allocated-b.displayAllocated)-(a.allocated-a.displayAllocated)).slice(0,remainder).forEach(s=>s.displayAllocated++);
  return {hour,peak,budget,demand,allocated,limited:demand>budget,sites:result};
 }
 return {sample};
});
