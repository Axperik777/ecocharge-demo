(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EcoArcadeModel=api;})(typeof window==='object'?window:globalThis,()=>{
 const duration=45,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const tracks=[{id:'city',runs:0},{id:'highway',runs:1},{id:'coast',runs:3}];
 function create({seed=1,track='city'}={}){return {time:0,score:0,energy:0,hits:0,x:.5,target:.5,items:[],spawn:0,rng:(seed>>>0)||1,track:tracks.some(t=>t.id===track)?track:'city',status:'ready',cooldown:0,streak:0,bestStreak:0,bonus:0,feedback:'',feedbackFor:0};}
 function random(s){s.rng^=s.rng<<13;s.rng^=s.rng>>>17;s.rng^=s.rng<<5;return (s.rng>>>0)/4294967296;}
 function move(s,target){if(Number.isFinite(target))s.target=clamp(target,1/6,5/6);return s;}
 function step(s,seconds){if(s.status!=='playing'||!Number.isFinite(seconds)||seconds<=0)return s;const dt=Math.min(seconds,.1,duration-s.time);s.time=clamp(s.time+dt,0,duration);s.cooldown=Math.max(0,s.cooldown-dt);s.feedbackFor=Math.max(0,s.feedbackFor-dt);s.x+=(s.target-s.x)*Math.min(1,dt*12);s.spawn-=dt;
  if(s.spawn<=0&&s.time<duration-2){const lane=Math.floor(random(s)*3),other=(lane+1+Math.floor(random(s)*2))%3;s.items.push({x:(lane+.5)/3,y:0,kind:'energy'});if(s.time>2)s.items.push({x:(other+.5)/3,y:0,kind:'obstacle'});s.spawn=.82;}
  for(const item of s.items){const old=item.y;item.y+=dt*(.34+s.time*.0018);if(!item.done&&old<=.84&&item.y>=.76&&Math.abs(item.x-s.x)<.13){item.done=true;if(item.kind==='energy'){s.energy++;s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);const bonus=Math.min(50,Math.floor(s.streak/5)*10);s.bonus+=bonus;s.feedback='+'+(25+bonus);s.feedbackFor=.8;}else if(s.cooldown===0){s.hits++;s.cooldown=1.1;s.streak=0;s.feedback='−15';s.feedbackFor=.8;}}}
  for(const item of s.items)if(item.kind==='energy'&&!item.done&&item.y>.84){item.done=true;s.streak=0;}
  s.items=s.items.filter(item=>item.y<1.1&&!item.done);s.score=Math.max(0,s.energy*25+s.bonus+Math.floor(s.time*4)-s.hits*15);if(s.time>=duration)s.status='finished';return s;
 }
 function records(value){const n=(v,max)=>Number.isInteger(v)&&v>=0?Math.min(v,max):0;return {runs:n(value?.runs,1000000),best:n(value?.best,100000),cells:n(value?.cells,100000000),clean:!!value?.clean,collector:!!value?.collector};}
 function complete(saved,s){const old=records(saved);if(s.status!=='finished')return old;return {runs:old.runs+1,best:Math.max(old.best,s.score),cells:old.cells+s.energy,clean:old.clean||s.hits===0,collector:old.collector||s.energy>=15};}
 const available=saved=>tracks.filter(t=>records(saved).runs>=t.runs).map(t=>t.id);
 return {duration,tracks,create,move,step,records,complete,available};
});
