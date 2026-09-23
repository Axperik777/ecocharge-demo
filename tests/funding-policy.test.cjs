const {test}=require('node:test');
const assert=require('node:assert/strict');
const policy=require('../dist/funding-policy.js');

test('starting prices disclose a separate company fee, excluded from credited capital',()=>{
  assert.deepEqual(policy.offers.map(o=>[o.capital,o.fee,o.total]),[[250,39,289],[500,29,529],[800,29,829]]);
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
