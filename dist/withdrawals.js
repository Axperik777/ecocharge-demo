'use strict';
function withdrawalDate(value){return new Intl.DateTimeFormat(window.EcoLocale?.locale||'en-US',{year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(new Date(value));}
function withdrawalMessage(state){return ({activate:'Activate a plan to start the 4-day withdrawal period.',pending:'A withdrawal request is awaiting review. You can have one open request at a time.',waiting:'Your next withdrawal date is shown below.',balance:'The withdrawal period is open. You need at least $1 in your available balance.',ready:'You can request a withdrawal from your available balance.'})[state.reason];}
function withdrawalNoticeContent(){
 const s=EcoWithdrawals.state(demo);
 return `<div class="withdrawal-policy-heading">${icon('calendar')}<strong>Withdrawals every 4 days</strong></div><p>First withdrawal: 4 days after plan activation. After a successful withdrawal, the next is available 4 days later.</p><div class="withdrawal-policy-state" role="status"><span>${withdrawalMessage(s)}</span>${s.eligibleAt!==null&&s.reason!=='pending'?`<time datetime="${new Date(s.eligibleAt).toISOString()}" translate="no">${escapeHtml(withdrawalDate(s.eligibleAt))}</time>`:''}</div>`;
}
function withdrawalNotice(){return `<div class="withdrawal-policy" data-withdrawal-status>${withdrawalNoticeContent()}</div>`;}
function withdrawalFormError(){const s=EcoWithdrawals.state(demo);return s.canRequest?'':s.reason==='waiting'?'Withdrawals open 4 days after plan activation or the last successful withdrawal.':withdrawalMessage(s);}
let withdrawalTimer;
function refreshWithdrawalPolicy(){
 document.querySelectorAll('[data-withdrawal-status]').forEach(el=>{el.innerHTML=withdrawalNoticeContent();window.EcoLocale?.localize(el);});
 const form=document.querySelector('#payment-form[data-type="withdraw"]');
 if(form){const s=EcoWithdrawals.state(demo);form.querySelector('[type="submit"]').disabled=!s.canRequest;form.querySelector('#payment-amount').max=Math.min(100000,s.available);}
 clearTimeout(withdrawalTimer);
 const at=EcoWithdrawals.state(demo).eligibleAt;
 if(at!==null&&at>Date.now()&&document.querySelector('[data-withdrawal-status]'))withdrawalTimer=setTimeout(refreshWithdrawalPolicy,Math.min(at-Date.now()+20,2147483647));
}
const numbersBeforeWithdrawals=renderNumbers;
renderNumbers=function(){numbersBeforeWithdrawals();refreshWithdrawalPolicy();};
document.addEventListener('ecocharge:locale',refreshWithdrawalPolicy);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshWithdrawalPolicy();});
window.addEventListener('focus',refreshWithdrawalPolicy);
window.addEventListener('storage',e=>{if(e.key==='ecocharge-demo-v1')setTimeout(refreshWithdrawalPolicy,0);});
