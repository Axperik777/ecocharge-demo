(function(root,factory){const store=factory();if(typeof module==='object'&&module.exports)module.exports=store;else root.EcoCrmStore=store;})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const key='ecocharge-demo-v1';
 function normalize(value){const a=value&&typeof value==='object'?value:{};a.balance=Number.isFinite(a.balance)?a.balance:0;for(const k of ['portfolio','requests','tickets','activity','adjustments','sessions'])if(!Array.isArray(a[k]))a[k]=[];a.client={name:'Lox',email:'lox@example.com',status:'Active',note:'',...a.client};a.manager={name:'Alexander Brown',...a.manager};return a;}
 const validAmount=n=>Number.isFinite(n)&&n>0&&n<=1e7&&Math.abs(n*100-Math.round(n*100))<.00001;
 const reserved=a=>a.requests.filter(r=>r.type==='withdraw'&&r.status==='Pending').reduce((s,r)=>s+r.amount,0);
 function changeBalance(a,operation,now=new Date().toISOString()){
  if(!['ftd','admin'].includes(operation.role))throw Error('This action requires a team account.');
  if(!['credit','debit'].includes(operation.kind)||!validAmount(operation.amount))throw Error('Enter a positive amount with at most two decimal places.');
  if(!operation.reason||operation.reason.trim().length<3)throw Error('Add a reason of at least 3 characters.');
  if(a.adjustments.some(v=>v.operationId===operation.id))throw Error('This operation was already saved.');
  if(a.balance!==operation.expectedBalance)throw Error('The balance changed in another tab. Reopen the operation to review it.');
  let request=null;
  if(operation.requestId){request=a.requests.find(r=>r.id===operation.requestId);if(!request||request.status!=='Pending'||request.type!=='topup'||operation.kind!=='credit'||request.amount!==operation.amount)throw Error('This funding request has changed or was already reviewed.');}
  const next=Math.round((a.balance+(operation.kind==='credit'?operation.amount:-operation.amount))*100)/100;
  if(next<reserved(a)||next>1e7)throw Error('Keep reserved withdrawals covered and the balance within the allowed range.');
  const before={balance:a.balance,capital:a.plan?.capital||0,stations:a.portfolio.length,tariff:a.plan?.name||'None'};
  if(operation.kind==='credit'){
   if(request){request.status='Approved';request.reviewedAt=now;request.reviewedBy=operation.actor;}
   else a.requests.push({id:operation.id,type:'topup',amount:operation.amount,status:'Approved',date:now,reviewedAt:now,reviewedBy:operation.actor,payment:{mode:'preview',method:'manual',currency:'USD',totalUSD:operation.amount,creditedUSD:operation.amount}});
  }
  a.balance=next;
  a.adjustments.unshift({operationId:operation.id,kind:operation.kind,amount:operation.amount,date:now,actor:operation.actor,reason:operation.reason.trim(),before,after:{...before,balance:next},requestId:request?.id||null});
  a.activity.unshift({date:now,text:operation.actor+': '+operation.kind+' $'+operation.amount.toFixed(2)+' · '+operation.reason.trim()});
  return a;
 }
 return Object.freeze({key,normalize,validAmount,reserved,changeBalance});
});
