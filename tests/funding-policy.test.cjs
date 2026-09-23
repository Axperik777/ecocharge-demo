const {test}=require('node:test');
const assert=require('node:assert/strict');
const policy=require('../dist/funding-policy.js');

test('starting prices have no company commission; historic receipt calculations are preserved',()=>{
  assert.deepEqual(policy.offers.map(o=>[o.capital,o.fee,o.total]),[[250,0,250],[500,0,500],[800,0,800]]);
  assert.deepEqual(policy.pricing({amount:250,payment:{companyFeeUSD:39}}),{net:250,fee:39,total:289});
  assert.deepEqual(policy.pricing({amount:500,payment:{companyFeeUSD:29}}),{net:500,fee:29,total:529});
  assert.deepEqual(policy.pricing({amount:800,payment:{companyFeeUSD:29}}),{net:800,fee:29,total:829});
  assert.deepEqual(policy.pricing({amount:300}),{net:300,fee:0,total:300});
});

test('only an approved positive deposit changes the account from FTD to client care',()=>{
  const request={id:'FIRST',type:'topup',amount:250,status:'Pending',date:'2026-09-23T12:00:00Z'};
  assert.equal(policy.state({balance:10000,plan:{status:'active'},requests:[]}).department,'ftd');
  assert.equal(policy.state({requests:[request]}).stage,'pending');
  assert.equal(policy.state({requests:[{...request,status:'Rejected'}]}).department,'ftd');
  assert.equal(policy.state({requests:[{...request,type:'withdraw',status:'Approved'}]}).department,'ftd');
  assert.equal(policy.state({requests:[{...request,amount:0,status:'Approved'}]}).department,'ftd');
  assert.equal(policy.state({requests:[{...request,status:'Approved'}]}).department,'retention');
});

test('later deposits and pending requests preserve the original first-deposit record',()=>{
  const first={id:'FIRST',type:'topup',amount:250,status:'Approved',date:'2026-09-23T12:00:00Z',reviewedAt:'2026-09-23T13:00:00Z'};
  const second={...first,id:'SECOND',reviewedAt:'2026-09-24T13:00:00Z'};
  const pending={...second,id:'PENDING',status:'Pending'};
  const state=policy.state({requests:[second,pending,first]});
  assert.equal(state.first.id,'FIRST');assert.equal(state.department,'retention');assert.equal(state.pending.length,1);
});

test('pending starter fees are removed while completed payment history stays intact',()=>{
 const pending={id:'pending',type:'topup',status:'Pending',amount:250,payment:{starterId:'start-250',companyFeeUSD:39,totalUSD:289}};
 const approved={...structuredClone(pending),id:'approved',status:'Approved'};
 const account={requests:[pending,approved]};assert.equal(policy.removePendingFees(account),true);
 assert.deepEqual(policy.pricing(pending),{net:250,fee:0,total:250});assert.equal(pending.payment.totalUSD,250);assert.equal(pending.payment.creditedUSD,250);
 assert.deepEqual(policy.pricing(approved),{net:250,fee:39,total:289});assert.equal(policy.removePendingFees(account),false);
});
