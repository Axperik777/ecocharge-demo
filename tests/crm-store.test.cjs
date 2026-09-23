const {test}=require('node:test'),assert=require('node:assert/strict');
const store=require('../dist/crm-store.js'),funding=require('../dist/funding-policy.js');
const fresh=()=>store.normalize({balance:100});
const operation=overrides=>({id:'OP-1',kind:'credit',amount:250,reason:'Confirmed sample payment',role:'ftd',actor:'ftd',expectedBalance:100,...overrides});
test('FTD credit creates an approved deposit, a before/after audit and first-deposit status',()=>{
 const a=fresh();store.changeBalance(a,operation(),'2026-09-23T12:00:00Z');
 assert.equal(a.balance,350);assert.equal(a.requests.length,1);assert.equal(a.requests[0].payment.totalUSD,250);
 assert.equal(funding.state(a).hasFirstDeposit,true);assert.equal(a.adjustments[0].before.balance,100);assert.equal(a.adjustments[0].after.balance,350);assert.equal(a.adjustments[0].actor,'ftd');
});
test('reviewing a pending request credits it exactly once without duplicating the request',()=>{
 const a=fresh();a.requests=[{id:'PAY-1',type:'topup',amount:250,status:'Pending'}];const op=operation({requestId:'PAY-1'});
 store.changeBalance(a,op);assert.equal(a.requests.length,1);assert.equal(a.requests[0].status,'Approved');assert.equal(a.balance,350);
 assert.throws(()=>store.changeBalance(a,op),/already saved/);
 assert.throws(()=>store.changeBalance(a,operation({id:'OP-2',requestId:'PAY-1',expectedBalance:350})),/already reviewed/);
 assert.equal(a.balance,350);
});
test('debit preserves plan and withdrawal timing and does not register a withdrawal',()=>{
 const a=fresh();a.firstPlanActivatedAt='2026-09-20';a.lastWithdrawalAt='2026-09-22';a.plan={capital:500,status:'active'};
 store.changeBalance(a,operation({kind:'debit',amount:29.95}));assert.equal(a.balance,70.05);assert.deepEqual(a.plan,{capital:500,status:'active'});
 assert.equal(a.firstPlanActivatedAt,'2026-09-20');assert.equal(a.lastWithdrawalAt,'2026-09-22');assert.equal(a.requests.length,0);assert.equal(funding.state(a).hasFirstDeposit,false);
});
test('reserved withdrawals and negative balances cannot be consumed',()=>{
 const a=fresh();a.requests=[{type:'withdraw',status:'Pending',amount:80}];
 assert.throws(()=>store.changeBalance(a,operation({kind:'debit',amount:21})),/reserved/);assert.equal(a.balance,100);
 store.changeBalance(a,operation({kind:'debit',amount:20}));assert.equal(a.balance,80);
 assert.throws(()=>store.changeBalance(fresh(),operation({kind:'debit',amount:101})),/reserved/);
});
test('stale confirmations, unauthorized roles and invalid numbers leave state unchanged',()=>{
 for(const patch of [{expectedBalance:99},{role:'client'},{amount:0},{amount:-1},{amount:Infinity},{amount:2.555},{amount:10000001},{reason:' '},{kind:'withdraw'}]){
  const a=fresh(),before=JSON.stringify(a);assert.throws(()=>store.changeBalance(a,operation(patch)));assert.equal(JSON.stringify(a),before);
 }
});
test('normalization preserves existing profile, acquisition, tariff and account fields',()=>{
 const a=store.normalize({balance:250,client:{name:'Jane',note:'Call Friday'},acquisition:{phone:'+1 555'},tariffs:[{id:'custom'}]});
 assert.equal(a.client.name,'Jane');assert.equal(a.client.note,'Call Friday');assert.equal(a.acquisition.phone,'+1 555');assert.deepEqual(a.tariffs,[{id:'custom'}]);
});
