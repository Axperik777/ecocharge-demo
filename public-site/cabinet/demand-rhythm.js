(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoDemandRhythm=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const DAY_MS=86400000,VERSION='demand-v1';
 const hours=Object.freeze([0,6,9,12,17,21,24]);
 const sites=Object.freeze([
  {id:'city',ports:6,kwPerPort:60,profile:[15,30,78,50,90,55,15]},
  {id:'highway',ports:4,kwPerPort:150,profile:[22,42,60,80,75,40,22]},
  {id:'retail',ports:4,kwPerPort:120,profile:[5,10,35,72,95,45,5]}
 ].map(s=>Object.freeze({...s,profile:Object.freeze(s.profile)})));
 const demand=hours.map((_,i)=>sites.reduce((sum,s)=>sum+s.ports*s.kwPerPort*s.profile[i]/100,0));
 // Split at the 900 kW cap so integration is exact for the piecewise-linear Lab curve.
 const segments=[];
 for(let i=0;i<hours.length-1;i++){
  const a=hours[i],b=hours[i+1],u=demand[i],v=demand[i+1],cross=a+(900-u)*(b-a)/(v-u);
  const cuts=[a,...(cross>a&&cross<b?[cross]:[]),b];
  for(let j=0;j<cuts.length-1;j++){const x=cuts[j],y=cuts[j+1],at=h=>Math.min(900,u+(v-u)*(h-a)/(b-a));segments.push({a:x,b:y,u:at(x),v:at(y)});}
 }
 const energy=segments.reduce((n,s)=>n+(s.u+s.v)*(s.b-s.a)/2,0);
 function integral(hour){let sum=0;for(const s of segments){const length=Math.max(0,Math.min(s.b,hour)-s.a);sum+=s.u*length+(s.v-s.u)*length*length/(2*(s.b-s.a));}return sum/energy;}
 function cumulative(time){const day=Math.floor(time/DAY_MS);return day+integral((time-day*DAY_MS)/3600000);}
 function fraction(start,end){if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return 0;return Math.max(0,cumulative(end)-cumulative(start));}
 function pace(time){const hour=((time%DAY_MS)+DAY_MS)%DAY_MS/3600000,s=segments.find(s=>hour>=s.a&&hour<s.b)||segments[0];return (s.u+(s.v-s.u)*(hour-s.a)/(s.b-s.a))*24/energy;}
 return Object.freeze({DAY_MS,VERSION,hours,sites,fraction,pace});
});
