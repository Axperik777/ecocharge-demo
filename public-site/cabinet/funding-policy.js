(function(root,factory){
  const policy=factory(typeof module==='object'&&module.exports?require('./account-finance.js'):root.EcoFinance);
  if(typeof module==='object'&&module.exports)module.exports=policy;
  else root.EcoFunding=policy;
})(typeof window==='undefined'?globalThis:window,function(finance){
  'use strict';
  const offers=Object.freeze(finance.presets.map(capital=>Object.freeze({id:'start-'+capital,capital,fee:finance.companyFee,total:capital+finance.companyFee}))); 
  const offer=id=>offers.find(item=>item.id===id)||null;
  function state(account){
    const requests=(Array.isArray(account.requests)?account.requests:[]).filter(r=>r.type==='topup'&&Number.isFinite(r.amount)&&r.amount>0);
    const approved=requests.filter(r=>r.status==='Approved'&&r.payment?.method!=='manual').sort((a,b)=>(Date.parse(a.reviewedAt||a.date)||0)-(Date.parse(b.reviewedAt||b.date)||0));
    const pending=requests.filter(r=>r.status==='Pending');
    const first=approved[0]||null;
    const verified=approved.filter(r=>r.payment?.mode==='live'&&r.reviewSource==='provider_verified');
    return {first,pending,approved,hasFirstDeposit:!!first,hasVerifiedDeposit:verified.length>0,department:first?'retention':'ftd',stage:first?'funded':pending.length?'pending':offer(account.starterSelection?.id)?'selected':'new'};
  }
  function pricing(request){
    const net=Number(request.amount)||0;
    const fee=Number(request.payment?.companyFeeUSD)||0;
    return {net,fee,total:Math.round((net+fee)*100)/100};
  }
  function removePendingFees(account){let changed=false;for(const r of account.requests||[]){if(r.type==='topup'&&r.status==='Pending'&&r.payment?.starterId&&Number(r.payment.companyFeeUSD)>0){r.payment={...r.payment,companyFeeUSD:0,totalUSD:r.amount,creditedUSD:r.amount};changed=true;}}return changed;}
  // This is a funding intent, not a plan change or a balance entry.
  function intent(account){
    const s=finance.summary(account),history=state(account),draft=s.draft;
    const visible=!s.active&&!s.pending.length&&(draft?s.gap>0:s.balance===0&&!history.hasFirstDeposit);
    const required=draft&&s.gap>0?s.gap:finance.minimum;
    return {visible,amount:Math.max(finance.paymentMinimum,Math.min(required,finance.paymentMaximum)),required,remaining:Math.max(0,finance.round(required-finance.paymentMaximum)),draft,managerDraft:visible&&draft?.savedBy==='manager',available:s.available,collapseLab:visible};
  }
  function amountChips(amount){
    const anchors=[250,500,1000,2500,5000,10000,15000,20000,25000,50000,100000];
    const x=finance.valid(amount)?amount:finance.minimum;
    const lower=anchors.filter(n=>n<x).at(-1),upper=anchors.find(n=>n>x);
    return [...new Set([finance.minimum,lower,x,upper])].filter(n=>finance.valid(n)&&n>=finance.paymentMinimum&&n<=finance.paymentMaximum).sort((a,b)=>a-b);
  }
  function activation(account){
    const s=finance.summary(account),p=s.draft;
    const ready=!!(!s.active&&p&&finance.valid(p.capital)&&p.capital>=finance.minimum&&s.available>=p.capital);
    return {visible:ready,draft:p,available:s.available,reserved:s.reserved,after:ready?finance.round(s.available-p.capital):null};
  }
  function previewNotice(lang='en'){return lang==='ru'?'Превью оплаты: отправка заявки уведомит менеджера и администратора. Автоматического зачисления нет.':'Payment preview: submitting a request notifies your manager and administrator. No automatic credit.';}
  return Object.freeze({offers,offer,state,pricing,removePendingFees,intent,activation,amountChips,previewNotice});
});
