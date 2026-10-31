(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoProfileModel=factory();})(typeof window==='undefined'?globalThis:window,()=>{
 'use strict';
 const text=v=>typeof v==='string'?v.trim():'';
  const timeZones=Object.freeze([
   ['US','America/New_York','New York'],['US','America/Chicago','Chicago'],['US','America/Denver','Denver'],['US','America/Los_Angeles','Los Angeles'],['US','America/Phoenix','Phoenix, Arizona'],['US','America/Anchorage','Anchorage, Alaska'],['US','America/Adak','Adak, Aleutian Islands'],['US','Pacific/Honolulu','Honolulu, Hawaii'],
   ['CA','America/Toronto','Toronto / Montreal'],['CA','America/Winnipeg','Winnipeg'],['CA','America/Edmonton','Edmonton / Calgary'],['CA','America/Vancouver','Vancouver'],['CA','America/Halifax','Halifax'],['CA','America/St_Johns',"St. John’s, Newfoundland"],['CA','America/Regina','Regina, Saskatchewan'],['CA','America/Whitehorse','Whitehorse, Yukon'],['CA','America/Dawson_Creek','Dawson Creek'],['CA','America/Creston','Creston'],['CA','America/Atikokan','Atikokan'],['CA','America/Blanc-Sablon','Blanc-Sablon']
  ].map(([country,id,en])=>Object.freeze({country,id,en})));
 const canonical=value=>{try{return new Intl.DateTimeFormat('en-US',{timeZone:value}).resolvedOptions().timeZone;}catch{return '';}};
 function selectedZone(value){if(typeof value!=='string'||!value||value.length>80)return '';const id=canonical(value);return timeZones.find(z=>canonical(z.id)===id)?.id||'';}
 function zone(value){return !!selectedZone(value);}
  function zoneGroups(){return ['US','CA'].map(country=>({country,label:country==='US'?'United States':'Canada',zones:timeZones.filter(z=>z.country===country).map(z=>({id:z.id,label:z.en}))}));}
 function profile(input){
   const value={name:text(input.name),email:text(input.email).toLowerCase(),phone:text(input.phone),language:'en',timezone:input.timezone},errors={};
  if(value.name.length<2||value.name.length>100||/[\x00-\x1f]/.test(value.name))errors.name='name';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)||value.email.length>160)errors.email='email';
  if(value.phone&&(!/^[+\d\s().-]+$/.test(value.phone)||value.phone.replace(/\D/g,'').length<7||value.phone.replace(/\D/g,'').length>15||value.phone.length>40))errors.phone='phone';
   if(!zone(value.timezone))errors.timezone='timezone';
  return {value,errors};
 }
 // The same wall-clock matching approach used by the existing callback form.
 // Reject a skipped or repeated DST time rather than choosing an arbitrary instant.
 function appointment(value,now=Date.now()){
  if(!value||!/^\d{4}-\d{2}-\d{2}$/.test(value.date)||!/^\d{2}:\d{2}$/.test(value.time)||!zone(value.timeZone))return null;
  const anchor=Date.parse(value.date+'T'+value.time+':00Z');if(!Number.isFinite(anchor))return null;
  const format=new Intl.DateTimeFormat('en-CA',{timeZone:value.timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}),matches=[];
  for(let offset=-840;offset<=840;offset+=15){const instant=anchor+offset*60000,p=Object.fromEntries(format.formatToParts(instant).map(p=>[p.type,p.value]));if(`${p.year}-${p.month}-${p.day}`===value.date&&`${p.hour}:${p.minute}`===value.time)matches.push(instant);}
  return matches.length===1&&matches[0]>now?{date:value.date,time:value.time,timeZone:value.timeZone,instant:new Date(matches[0]).toISOString()}:null;
 }
 return {profile,zone,appointment,timeZones,selectedZone,zoneGroups};
});
