(function(root,factory){
  const policy=factory();
  if(typeof module==='object'&&module.exports)module.exports=policy;
  else root.EcoFunding=policy;
})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  const offers=Object.freeze([
    Object.freeze({id:'start-250',capital:250,fee:0,total:250,tierId:'single'}),
    Object.freeze({id:'start-500',capital:500,fee:0,total:500,tierId:'network'}),
    Object.freeze({id:'start-800',capital:800,fee:0,total:800,tierId:'portfolio'})
  ]);
  const offer=id=>offers.find(item=>item.id===id)||null;
  function state(account){
    const requests=(Array.isArray(account.requests)?account.requests:[]).filter(r=>r.type==='topup'&&Number.isFinite(r.amount)&&r.amount>0);
    const approved=requests.filter(r=>r.status==='Approved').sort((a,b)=>(Date.parse(a.reviewedAt||a.date)||0)-(Date.parse(b.reviewedAt||b.date)||0));
    const pending=requests.filter(r=>r.status==='Pending');
    const first=approved[0]||null;
    return {first,pending,approved,hasFirstDeposit:!!first,department:first?'retention':'ftd',stage:first?'funded':pending.length?'pending':offer(account.starterSelection?.id)?'selected':'new'};
  }
  function pricing(request){
    const net=Number(request.amount)||0;
    const fee=Number(request.payment?.companyFeeUSD)||0;
    return {net,fee,total:Math.round((net+fee)*100)/100};
  }
  function removePendingFees(account){let changed=false;for(const r of account.requests||[]){if(r.type==='topup'&&r.status==='Pending'&&r.payment?.starterId&&Number(r.payment.companyFeeUSD)>0){r.payment={...r.payment,companyFeeUSD:0,totalUSD:r.amount,creditedUSD:r.amount};changed=true;}}return changed;}
  return Object.freeze({offers,offer,state,pricing,removePendingFees});
});
