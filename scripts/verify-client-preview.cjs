'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
function verify(root){
 const files=fs.readdirSync(root,{recursive:true,withFileTypes:true}).filter(e=>e.isFile()).map(e=>path.join(e.parentPath,e.name));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'preview-manifest.json'),'utf8'));
 assert.equal(manifest.source,'fresh-isolated-fixture');assert.equal(manifest.apiConnected,false);assert.equal(manifest.authentication,false);
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'pages-client-data.js'),'utf8'),ctx);
 const row=ctx.window.ECO_PAGES_FIXTURE.responses['client/account'],state=row.state;
 assert.equal(state.plan.capital,250);assert.equal(state.plan.rate,13);assert.equal(state.plan.tierId,'single');assert.equal(state.sessions.length,4);
 assert.equal(state.miningPositions[0].capital,5000);assert.equal(Math.round(state.balance*100),state.sessions.reduce((sum,s)=>sum+Math.round(s.payout*100),0));
 assert.equal(row.client.email,'');assert.equal(row.client.phone,'');assert.equal(row.client.invite,null);
 const finance=require(path.join(root,'account-finance.js'));
 for(const week of state.sessions)assert.equal(week.payout,finance.weekly(250,13,Date.parse(week.periodStart),'calendar-month'));
 const html=fs.readFileSync(path.join(root,'client/index.html'),'utf8');
 assert(html.includes('pages-client-bootstrap.js'));assert(html.includes('pages-client-adapter.js'));
 assert(!html.includes('src="central/client.js"'));assert(!html.includes('sessionStorage.setItem("ecocharge-entry'));
 for(const [,ref]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg|png|webmanifest))(?:[?#][^"]*)?"/g))if(!ref.includes(':'))assert(fs.existsSync(path.join(root,ref)),'Missing '+ref);
 for(const file of files){const rel=path.relative(root,file).replaceAll('\\','/');assert(!/(^|\/)(?:server|crm|team|staff|private-data|login)(\/|$)|\.sqlite|\.local\.|initial-users|\.env|ДОСТУПЫ|\.cjs$/i.test(rel),'Private/server file '+rel);}
 const boot=fs.readFileSync(path.join(root,'pages-client-bootstrap.js'),'utf8'),adapter=fs.readFileSync(path.join(root,'pages-client-adapter.js'),'utf8'),ready=fs.readFileSync(path.join(root,'pages-client-ready.js'),'utf8');
 assert(boot.includes("method==='GET'?fixture.responses[key]:undefined"));assert(adapter.includes('requestWithdrawal:blocked'));assert(ready.includes('event.stopImmediatePropagation()'));
 return {files:files.length,capital:state.plan.capital,rate:state.plan.rate,weeks:state.sessions.length,balance:state.balance,privateData:false,serverOperations:false};
}
if(require.main===module)console.log(JSON.stringify(verify(path.resolve(process.argv[2]||'public-site/cabinet'))));
module.exports=verify;
