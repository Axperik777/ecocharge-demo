'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
function verify(root){
 const files=fs.readdirSync(root,{recursive:true,withFileTypes:true}).filter(e=>e.isFile()).map(e=>path.join(e.parentPath,e.name));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'preview-manifest.json'),'utf8'));
 assert.equal(manifest.source,'fresh-isolated-fixture');assert.equal(manifest.apiConnected,false);assert.equal(manifest.authentication,false);assert.equal(manifest.activeOffer,'charge');assert.equal(manifest.miningCapital,0);assert.equal(manifest.chargeModel,'charge-fixed-obligation-v3');assert.equal(manifest.settlementDays,4);assert.equal(manifest.obligationFunding,'fictional-company-reserve');
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'pages-client-data.js'),'utf8'),ctx);
 const row=ctx.window.ECO_PAGES_FIXTURE.responses['client/account'],state=row.state;
 assert.equal(state.plan.capital,250);assert.equal(state.plan.rate,13);assert.equal(state.plan.tierId,'single');assert.equal(state.plan.economyModel,'charge-fixed-obligation-v3');assert.equal(state.sessions.length,manifest.completedSettlements);assert.ok(state.sessions.length>=7);
 assert.deepEqual(state.miningPositions||[],[]);assert.equal(Math.round(state.balance*100),state.sessions.reduce((sum,s)=>sum+Math.round(s.payout*100),0));
 assert.equal(row.client.email,'');assert.equal(row.client.phone,'');assert.equal(row.client.invite,null);
 const finance=require(path.join(root,'account-finance.js'));
 for(const period of state.sessions){assert.equal(period.period,'accrual');assert.equal(period.settlementDays,4);assert.equal(period.funded,period.obligation);assert.equal(period.payout,period.funded);assert.equal(period.companyPayable,0);assert.equal(period.participantPool,0);assert.equal(period.revenueApplied,0);assert.equal(period.reserveApplied,period.obligation);assert.equal(period.source,'manual_verified_settlement');assert.equal(period.obligation,finance.planAccrual(state.plan,period.periodStart,period.periodEnd));}
 const html=fs.readFileSync(path.join(root,'client/index.html'),'utf8');
 const profileAt=html.indexOf('src="central/profile-model.js'),ecosystemAt=html.indexOf('src="central/ecosystem.js');
 assert(profileAt>=0&&profileAt<ecosystemAt,'Profile model must load before the account UI');
 const profile=require(path.join(root,'central/profile-model.js'));
 assert.equal(typeof profile.selectedZone,'function','Client preview profile model is outdated');
 assert.equal(profile.selectedZone('America/New_York'),'America/New_York');
 assert(!html.includes('href="client/?tab=dashboard" aria-label="EcoGrid home"'),'Home logo must point to the website');
 assert(html.includes('pages-client-bootstrap.js'));assert(html.includes('pages-client-adapter.js'));
 assert(!html.includes('src="central/client.js"'));assert(!html.includes('sessionStorage.setItem("ecocharge-entry'));
 for(const [,ref]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg|png|webmanifest))(?:[?#][^"]*)?"/g))if(!ref.includes(':'))assert(fs.existsSync(path.join(root,ref)),'Missing '+ref);
 for(const file of files){const rel=path.relative(root,file).replaceAll('\\','/');assert(!/(^|\/)(?:server|crm|team|staff|private-data|login)(\/|$)|\.sqlite|\.local\.|initial-users|\.env|ДОСТУПЫ|\.cjs$/i.test(rel),'Private/server file '+rel);}
 const boot=fs.readFileSync(path.join(root,'pages-client-bootstrap.js'),'utf8'),adapter=fs.readFileSync(path.join(root,'pages-client-adapter.js'),'utf8'),ready=fs.readFileSync(path.join(root,'pages-client-ready.js'),'utf8');
 assert(boot.includes("method==='GET'?fixture.responses[key]:undefined"));assert(adapter.includes('requestWithdrawal:blocked'));assert(ready.includes('event.stopImmediatePropagation()'));
 const currentUi=['weekly.js','tariffs.js','portal.js','cabinets.js','central/ecosystem.js','central/client-finance.js'].map(file=>fs.readFileSync(path.join(root,file),'utf8')).join('\n');
 assert.doesNotMatch(currentUi,/Record a 4-day accrual|Weekly report available|First closed week|Compare the weekly model|Starting option \/ week|Alternative \/ week|Модель за неделю|Сравнить недельную модель|Недельный отч[её]т|Первая закрытая неделя|Day \d+ of 7|День \d+ из 7|7-day period|Период 7 дней|Unlocked after the Charge journey|Available after confirmed Charge participation/i,'Client preview contains retired current-state copy');
 assert.match(currentUi,/Preview 4-day obligation/);assert.match(currentUi,/Company payable · not withdrawable/);
 assert.match(currentUi,/data-expansion-stage="open"/);
 assert.match(currentUi,/EcoGrid Solar/);assert.match(currentUi,/EcoGrid Mining/);
 assert.doesNotMatch(currentUi,/Not active yet · future company release|future-release/);
 return {files:files.length,capital:state.plan.capital,rate:state.plan.rate,settlements:state.sessions.length,balance:state.balance,privateData:false,serverOperations:false};
}
if(require.main===module)console.log(JSON.stringify(verify(path.resolve(process.argv[2]||'public-site/cabinet'))));
module.exports=verify;
