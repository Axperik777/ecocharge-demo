(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('../live-accrual.js'));else root.LiveAccrualController=factory(root.EcoLiveAccrual);})(typeof window==='undefined'?globalThis:window,function(model){
 'use strict';
 return class LiveAccrualController{
  constructor({document,clock=Date.now,schedule=setInterval,cancel=clearInterval,media,format,labels,dayLabel=(day,active)=>active?`Day ${day} of 7`:"Not active",onPeriodClose=async()=>{},onResume=()=>{},onTick=()=>{}}){
   Object.assign(this,{document,clock,media,format,labels,dayLabel,onPeriodClose,onResume,onTick});this.schedule=(...args)=>schedule(...args);this.cancel=(...args)=>cancel(...args);this.timer=null;this.running=false;this.pending=false;this.shown=null;this.retryAt=0;this.offset=0;
   this.visibility=()=>{if(this.document.hidden){this.pause();return;}if(this.running){this.tick(true);this.arm();this.onResume();}};
   this.motion=()=>{this.tick(true);};document.addEventListener('visibilitychange',this.visibility);media?.addEventListener('change',this.motion);
  }
  update(payload){const previous=this.payload?.periodStartedAt;this.payload=payload||{active:false};const server=Date.parse(this.payload.serverNow);if(Number.isFinite(server))this.offset=server-this.clock();if(previous!==this.payload.periodStartedAt){this.shown=null;this.retryAt=0;}if(this.running){this.tick(previous!==this.payload.periodStartedAt);this.arm();}}
  start(){this.running=true;this.tick(true);this.arm();}
  pause(){if(this.timer!==null)this.cancel(this.timer);this.timer=null;}
  stop(){this.running=false;this.pause();for(const el of this.document.querySelectorAll('[data-live-accrual], [data-live-wallet]'))el.classList?.remove('eco-credit-a','eco-credit-b');}
  destroy(){this.stop();this.document.removeEventListener('visibilitychange',this.visibility);this.media?.removeEventListener('change',this.motion);}
  arm(){if(!this.running||this.document.hidden||!this.payload?.active){this.pause();return;}if(this.timer===null)this.timer=this.schedule(()=>this.tick(),300);}
  tick(instant=false){if(!this.running||this.document.hidden)return;
   const p=this.payload||{active:false},value=model.liveAccrual({...p,now:this.clock()+this.offset}),target=Math.round(value.liveEarned*100),previous=this.shown;
   if(instant||p.curve==='demand-v1'||this.media?.matches||this.shown===null||target<this.shown)this.shown=target;
   else this.shown=Math.min(target,this.shown+Math.max(1,Math.ceil((target-this.shown)*.8)));
   for(const el of this.document.querySelectorAll('[data-live-accrual]')){const text=this.format(this.shown/100);if(el.textContent!==text)el.textContent=text;el.dataset.liveCents=String(this.shown);}
   for(const el of this.document.querySelectorAll('[data-live-confirmed]'))el.textContent=this.format(p.confirmedCredits||0);
   for(const el of this.document.querySelectorAll('[data-live-capital]'))el.textContent=this.format(p.active?p.capital:0);
   for(const el of this.document.querySelectorAll('[data-live-status]'))el.textContent=this.labels(!p.active?'inactive':value.progress>=1?'closing':'live');
   this.onTick(p,this.clock()+this.offset);
   // Ring shows elapsed time; the demand curve only redistributes displayed cents within the week.
   const percent=Number((value.progress*100).toFixed(2)),day=Math.min(7,Math.floor(value.progress*7)+1),dayText=this.dayLabel(day,p.active);
   for(const el of this.document.querySelectorAll('[data-live-progress]')){el.style.setProperty('--week-progress',String(value.progress*100));el.setAttribute('aria-valuenow',String(percent));el.setAttribute('aria-valuetext',`${dayText} · ${percent}%`);}
   for(const el of this.document.querySelectorAll('[data-live-day]'))if(el.textContent!==dayText)el.textContent=dayText;
   if(!instant&&!this.media?.matches&&p.active&&previous!==null&&this.shown>previous&&this.clock()>=(this.flashAt||0)){
    this.flashAt=this.clock()+3000;this.flashPhase=!this.flashPhase;
    for(const el of this.document.querySelectorAll('[data-live-accrual], [data-live-wallet]')){el.classList?.remove('eco-credit-a','eco-credit-b');el.classList?.add(this.flashPhase?'eco-credit-a':'eco-credit-b');}
   }
   if(p.active&&value.progress>=1&&!this.pending&&this.clock()>=this.retryAt){this.pending=true;this.retryAt=this.clock()+10000;Promise.resolve().then(()=>this.onPeriodClose(p.periodStartedAt)).catch(()=>{}).finally(()=>{this.pending=false;});}
  }
 };
});
