(function(root,factory){
 const policy=factory();
 if(typeof module==='object'&&module.exports)module.exports=policy;
 else root.EcoWithdrawals=policy;
})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const days=4,interval=days*24*60*60*1000;
 const timestamp=value=>{if(typeof value!=='string')return null;const n=Date.parse(value);return Number.isFinite(n)?n:null;};
 function activation(account){return timestamp(account.firstPlanActivatedAt)??(account.plan?.status==='active'?timestamp(account.plan.appliedAt):null);}
 function markActivation(account,now=Date.now()){
  const start=activation(account)??now;
  account.firstPlanActivatedAt=new Date(start).toISOString();
  return account.firstPlanActivatedAt;
 }
 function state(account,now=Date.now()){
  const requests=Array.isArray(account.requests)?account.requests:[];
  const withdrawals=requests.filter(r=>r.type==='withdraw');
  const start=activation(account);
  const completed=withdrawals.filter(r=>r.status==='Approved').map(r=>timestamp(r.reviewedAt)??timestamp(r.date)).filter(n=>n!==null);
  const last=completed.length?Math.max(...completed):null;
  const eligibleAt=start===null?null:Math.max(start,last??start)+interval;
  const pending=withdrawals.filter(r=>r.status==='Pending');
  const reserved=pending.reduce((n,r)=>n+(Number(r.amount)||0),0);
  const available=Math.max(0,Math.round(((Number(account.balance)||0)-reserved)*100)/100);
  const timingReady=eligibleAt!==null&&now>=eligibleAt;
  const reason=start===null?'activate':pending.length?'pending':!timingReady?'waiting':available<1?'balance':'ready';
  return {days,start,last,eligibleAt,timingReady,pending:pending.length,reserved,available,reason,canRequest:reason==='ready'};
 }
 return Object.freeze({days,interval,activation,markActivation,state});
});
