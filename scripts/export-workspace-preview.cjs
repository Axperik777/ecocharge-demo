'use strict';
// Export only fresh fictional records and static UI. Never open the portable database.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),cp=require('node:child_process');
const arg=n=>process.argv[process.argv.indexOf(n)+1];
const root=path.resolve(arg('--portable')),out=path.resolve(arg('--out')),base=arg('--url'),website=arg('--website');
if(!base?.startsWith('https://')||!website?.startsWith('https://')||fs.existsSync(out))throw Error('New output directory and HTTPS URLs required');
const work=fs.mkdtempSync(path.join(os.tmpdir(),'ecogrid-workspace-export-'));
for(const [rel,owner]of Object.entries(JSON.parse(fs.readFileSync(path.join(root,'project-map.json'))).files)){
 const from=path.resolve(root,owner,rel),to=path.resolve(work,rel);if(!from.startsWith(root+path.sep)||!to.startsWith(work+path.sep))throw Error('Invalid path');
 fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);
}
fs.writeFileSync(path.join(work,'config/sandbox.json'),JSON.stringify({mode:'shared-local',localeMode:'development',websiteBase:website,accountBase:base,crmBase:base,apiBase:'',landingId:'main',browserSandbox:true}));
cp.execFileSync(process.execPath,['build.cjs','--config','config/sandbox.json'],{cwd:work,stdio:'inherit'});
const pass=crypto.randomBytes(24).toString('hex'),seed=path.join(work,'isolated-seed.json');
fs.writeFileSync(seed,JSON.stringify({users:[{username:'preview.admin',password:pass,role:'admin',name:'Анна Смирнова'},{username:'preview.manager',password:pass,role:'ftd',name:'Михаил Волков'}]}));
const app=require(path.join(work,'server/server.cjs')).createServer({database:path.join(work,'isolated.sqlite'),seedFile:seed,staticRoot:path.join(work,'dist'),centralBase:base,websiteBase:website,landingOrigins:[]});
(async()=>{try{
 const s=app.store,admin=s.authenticate('preview.admin',pass,'staff'),manager=s.authenticate('preview.manager',pass,'staff'),client=s.authenticate('lox','lox1','client');
 s.db.prepare('UPDATE users SET username=?,name=?,email=?,phone=?,password=? WHERE id=?').run('alex.morgan','Алексей Морозов','alex@example.com','',crypto.randomBytes(48).toString('hex'),client.id);
 let a=s.snapshot(admin,client.id);const empty=structuredClone(a);a=s.balance(admin,client.id,{id:'opening-balance',version:a.version,kind:'credit',amount:5250,expectedBalance:0,reason:'Учебный портфель'});
 const stations=JSON.parse(fs.readFileSync(path.join(work,'dist/stations.json'))).stations,ids=new Set(stations.map(v=>v.id));ids.closed=new Set(stations.filter(v=>v.selectionClosed).map(v=>v.id));
 const finance=require(path.join(work,'server/finance.cjs')),started=new Date();started.setUTCMonth(started.getUTCMonth()-1);
 // Keep the sample funding earlier than its backdated charging investment.
 for(const adjustment of a.state.adjustments)if(adjustment.operationId==='opening-balance')adjustment.date=started.toISOString();
 finance.activate(a.state,{tierId:'single',capital:250,stationIds:[stations.find(v=>!v.selectionClosed).id]},ids,{id:'opening-energy',role:'admin',actor:'presentation',reason:'Учебный проект зарядок'},started.toISOString());
 let w=finance.nextWeek(a.state);while(Date.parse(w.periodEnd)<=Date.now()){finance.creditWeek(a.state,{id:'week-'+w.periodStart.slice(0,10),role:'system',actor:'presentation',reason:'Завершённая модельная неделя',periodStart:w.periodStart},w.periodEnd);w=finance.nextWeek(a.state);}
 s.db.prepare('UPDATE accounts SET state=? WHERE user_id=?').run(JSON.stringify(a.state),client.id);
 a=s.addMiningExample(admin,client.id,{presentationOnly:true,id:'opening-mining',version:a.version,minerId:'s21-pro',capital:5000,projectUnits:100,sharePercent:1,country:'CA'});
 for(const [i,name]of ['Мария Белова','Даниил Ким','Елена Соколова','Ирина Петрова'].entries()){
  const l=s.addLead({name,email:'client'+i+'@example.com',phone:'+1 202 555 01'+String(i).padStart(2,'0'),consent:true,context:{tierId:'single',tab:'tariffs'},attribution:{landing_id:'main',utm_source:i%2?'google':'meta'}});
  if(i<3)s.assign(admin,{items:[{kind:'lead',id:l.id,version:1}],owner:manager.id,reason:'Консультация по проекту'});
  if(i<2)s.contact(manager,'lead',l.id,{version:2,status:i?'no_answer':'callback',comment:i?'Повторить звонок':'Подготовить расчёт на $1 000',nextContact:new Date(Date.now()+3600000).toISOString()});
 }
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+app.server.address().port;
 const get=async(route,actor=admin)=>{const response=await fetch(origin+route,{headers:{Cookie:(actor.role==='client'?'eco_client=':'eco_staff=')+s.login(actor)}});if(!response.ok)throw Error(route+' '+response.status);return response;};
 const overview=await(await get('/api/staff/overview')).json();
 const fixture={schema:1,reactionBaselines:{welcome:{like:1293,useful:702,interested:2526}},generatedAt:new Date().toISOString(),overview,empty,accounts:{},leads:{},responses:{},identities:{},chats:{},knowledge:{},reactions:{},archive:[]};
 for(const c of overview.clients){fixture.accounts[c.id]=s.snapshot(admin,c.id);fixture.identities[c.id]=s.identity.profile(admin,c.id);fixture.chats[c.id]=s.chat.read(admin,c.id);}
 for(const l of overview.leads)fixture.leads[l.id]=s.lead(admin,l.id);
 for(const route of ['staff/club','staff/knowledge','staff/community','staff/followups','staff/funnel','client/club','client/invitations'])fixture.responses[route]=await(await get('/api/'+route,route.startsWith('client')?client:admin)).json();
 for(const article of fixture.responses['staff/knowledge'].articles)fixture.knowledge[article.id]=s.knowledge.read(admin,article.id);
 const scrub=value=>{if(!value||typeof value!=='object')return;for(const k of Object.keys(value)){if(/password|token|secret/i.test(k))delete value[k];else if(k==='invite'||k==='inviteUrl')value[k]='';else scrub(value[k]);}};scrub(fixture);
 fs.mkdirSync(out,{recursive:true});
 let clientHtml=await(await get('/client/?lang=ru',client)).text(),crmHtml=fs.readFileSync(path.join(work,'dist/central/crm.html'),'utf8');
 clientHtml=clientHtml.replace(/<script>window\.ECO_SHARED_CONTEXT=[\s\S]*?<\/script>/,'<script src="sandbox-data.js"></script><script src="sandbox-domain.js"></script><script src="sandbox-model.js"></script><script src="sandbox-bootstrap.js"></script>');
 // Keep the account-only PWA in the isolated preview. It never caches account data.
 crmHtml=crmHtml.replace('<script src="central/ui.js" defer></script>','<script src="sandbox-data.js" defer></script><script src="sandbox-domain.js" defer></script><script src="sandbox-model.js" defer></script><script src="sandbox-bootstrap.js" defer></script><script src="central/ui.js" defer></script>');
 for(const [name,html]of [['client',clientHtml],['crm',crmHtml]]){fs.mkdirSync(path.join(out,name),{recursive:true});fs.writeFileSync(path.join(out,name,'index.html'),require(path.join(work,'server/first-paint.cjs')).prepare(html.replace('</body>','<script src="sandbox-ui.js" defer></script><link rel="stylesheet" href="sandbox.css"></body>')));}
 const names=new Set(['platform-config.js','platform.js','stations.json','station-photos.json','station-visuals.json','central/central.css','sandbox-model.js','sandbox-bootstrap.js','sandbox-ui.js','sandbox.css','client/sw.js','client/offline.html','client/app-icon-192.png','client/app-icon-512.png','client/app-icon-maskable-512.png']);
 for(const html of [clientHtml,crmHtml])for(const [,ref]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg|webmanifest|png))(?:[?#][^"]*)?"/g))if(!ref.includes(':')&&!/^sandbox-(?:data|domain)/.test(ref))names.add(ref);
 for(const name of names){const src=path.join(work,'dist',name),to=path.join(out,name);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(src,to);}
 fs.cpSync(path.join(work,'dist/assets'),path.join(out,'assets'),{recursive:true});
 const modules=['dist/public-plan.js','dist/central/profile-model.js','dist/journey-model.js','dist/calendar-yield.js','dist/business-model.js','dist/demand-rhythm.js','dist/account-finance.js','dist/funding-policy.js','dist/withdrawal-policy.js','dist/live-accrual.js','dist/crm-store.js','dist/central/workspace-model.js','dist/central/energy-model.js','dist/central/energy-journal-model.js','dist/central/plan-document.js','dist/central/funnel-model.js','server/finance.cjs','server/account-policy.cjs'];
 const wrapped=modules.map(name=>JSON.stringify(name)+':function(module,exports,require){\n'+fs.readFileSync(path.join(work,name),'utf8')+'\n}').join(',\n');
 fs.writeFileSync(path.join(out,'sandbox-domain.js'),'/* Pure financial models only; no server, database or authentication. */\n(()=>{const modules={'+wrapped+'},cache={};function load(id){if(id==="node:crypto")return {randomUUID:()=>crypto.randomUUID()};if(cache[id])return cache[id].exports;if(!modules[id])throw Error("Missing domain module "+id);const module={exports:{}};cache[id]=module;modules[id](module,module.exports,name=>{if(name.startsWith("node:"))return load(name);const p=id.split("/");p.pop();for(const s of name.split("/")){if(s==="..")p.pop();else if(s!==".")p.push(s);}return load(p.join("/"));});return module.exports;}window.EcoSandboxDomain={publicPlan:load("dist/public-plan.js"),profile:load("dist/central/profile-model.js"),journey:load("dist/journey-model.js"),finance:load("dist/account-finance.js"),operations:load("server/finance.cjs"),policy:load("server/account-policy.cjs"),crm:load("dist/crm-store.js"),planDocument:load("dist/central/plan-document.js"),funnel:load("dist/central/funnel-model.js"),journal:load("dist/central/energy-journal-model.js")};})();\n');
 fs.writeFileSync(path.join(out,'sandbox-data.js'),'window.ECO_SANDBOX_SEED='+JSON.stringify(fixture).replaceAll('<','\\u003c')+';\n');
 fs.writeFileSync(path.join(out,'sandbox-stations.js'),'window.ECO_SANDBOX_STATIONS='+JSON.stringify(stations.map(({id,name,city,state,country,selectionClosed})=>({id,name,city,state,country,selectionClosed})))+';\n');
 for(const name of ['crm','client']){const file=path.join(out,name,'index.html');let html=fs.readFileSync(file,'utf8').replace(/<script src="sandbox-model.js"( defer)?><\/script>/,(_,defer)=>'<script src="sandbox-stations.js"'+(defer||'')+'></script><script src="sandbox-model.js"'+(defer||'')+'></script>');html=html.replace(/((?:src|href)=")([^"?#]+\.(?:js|css))(?:[?#][^"]*)?(")/g,(all,prefix,ref,suffix)=>{const f=path.join(out,ref);return fs.existsSync(f)?prefix+ref+'?v='+crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,12)+suffix:all;});fs.writeFileSync(file,html);}
 for(const name of ['team']){fs.mkdirSync(path.join(out,name),{recursive:true});fs.writeFileSync(path.join(out,name,'index.html'),'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../crm/?lang=ru"><a href="../crm/?lang=ru">Открыть CRM</a>');}
 for(const name of ['login','register']){fs.mkdirSync(path.join(out,name),{recursive:true});fs.writeFileSync(path.join(out,name,'index.html'),require('./public-account-entry.cjs')());}
 fs.copyFileSync(path.join(work,'dist/public-account-entry.js'),path.join(out,'public-account-entry.js'));
 fs.copyFileSync(path.join(work,'dist/account-entry.css'),path.join(out,'account-entry.css'));
 for(const name of ['login','register']){const file=path.join(out,name,'index.html');const html=fs.readFileSync(file,'utf8').replace(/((?:src|href)=")([^"?#]+\.(?:js|css))(")/g,(all,prefix,ref,suffix)=>{const asset=path.join(out,ref);return fs.existsSync(asset)?prefix+ref+'?v='+crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex').slice(0,12)+suffix:all;});fs.writeFileSync(file,html);}
 fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=crm/?lang=ru"><a href="crm/?lang=ru">Открыть CRM</a>');
 fs.writeFileSync(path.join(out,'preview-manifest.json'),JSON.stringify({kind:'workspace-sandbox',source:'fresh-isolated-fixture',sampleData:true,authentication:false,apiConnected:false,persistence:'browser-localStorage',realPayments:false},null,2));
 console.log('WORKSPACE PREVIEW READY '+out);
}finally{await app.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
