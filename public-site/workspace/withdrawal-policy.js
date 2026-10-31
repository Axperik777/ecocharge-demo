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
 function settledProfit(account){
  const balance=Math.max(0,Number(account.balance)||0),explicit=Number(account.profit?.settled);
  if(Number.isFinite(explicit))return Math.min(balance,Math.max(0,Math.round(explicit*100)/100));
  const recorded=(Array.isArray(account.sessions)?account.sessions:[]).reduce((n,r)=>n+(Number(r.payout)||0),0);
  const withdrawn=(Array.isArray(account.requests)?account.requests:[]).filter(r=>r.type==='withdraw'&&r.status==='Approved').reduce((n,r)=>n+(Number(r.amount)||0),0);
  return Math.min(balance,Math.max(0,Math.round((recorded-withdrawn)*100)/100));
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
  const settled=settledProfit(account),available=Math.max(0,Math.round((settled-reserved)*100)/100);
  const timingReady=eligibleAt!==null&&now>=eligibleAt;
  const reason=start===null?'activate':pending.length?'pending':!timingReady?'waiting':available<1?'profit':'ready';
  return {days,start,last,eligibleAt,timingReady,pending:pending.length,reserved,settledProfit:settled,available,totalBalance:Math.max(0,Number(account.balance)||0),reason,canRequest:reason==='ready'};
 }
 return Object.freeze({days,interval,activation,markActivation,settledProfit,state});
});
