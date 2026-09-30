(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EcoProfileModel=factory();})(typeof window==='undefined'?globalThis:window,()=>{
 'use strict';
 const text=v=>typeof v==='string'?v.trim():'';
 function zone(value){if(typeof value!=='string'||value.length>80)return false;try{new Intl.DateTimeFormat('en-US',{timeZone:value});return true;}catch{return false;}}
 function profile(input){
  const value={name:text(input.name),email:text(input.email).toLowerCase(),phone:text(input.phone),language:input.language,timezone:input.timezone},errors={};
  if(value.name.length<2||value.name.length>100||/[\x00-\x1f]/.test(value.name))errors.name='name';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)||value.email.length>160)errors.email='email';
  if(value.phone&&(!/^[+\d\s().-]+$/.test(value.phone)||value.phone.replace(/\D/g,'').length<7||value.phone.replace(/\D/g,'').length>15||value.phone.length>40))errors.phone='phone';
  if(!['en','ru'].includes(value.language))errors.language='language';if(!zone(value.timezone))errors.timezone='timezone';
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
 return {profile,zone,appointment};
});
