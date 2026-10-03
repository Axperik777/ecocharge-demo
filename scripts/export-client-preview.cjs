'use strict';
// Separate static presentation. Never reads the portable working database or access files.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const arg=n=>{const i=process.argv.indexOf(n);return i<0?undefined:process.argv[i+1];};
const portable=path.resolve(arg('--portable')||process.cwd()),output=path.resolve(arg('--out'));
const base=arg('--url'),website=arg('--website');
for(const url of [base,website])if(!url||new URL(url).protocol!=='https:'||!url.endsWith('/'))throw Error('HTTPS bases ending in / required');
if(fs.existsSync(output))throw Error('Output must be a new directory');
const work=fs.mkdtempSync(path.join(os.tmpdir(),'ecogrid-client-pages-'));
const map=JSON.parse(fs.readFileSync(path.join(portable,'project-map.json'),'utf8'));
for(const [relative,owner]of Object.entries(map.files)){
 const from=path.resolve(portable,owner,relative),to=path.resolve(work,relative);
 if(!from.startsWith(portable+path.sep)||!to.startsWith(work+path.sep))throw Error('Invalid source path');
 fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);
}
const config={mode:'client-preview',clientPreview:true,localeMode:'development',websiteBase:website,accountBase:base,crmBase:'',apiBase:'',landingId:'main'};
fs.writeFileSync(path.join(work,'config/pages-client.json'),JSON.stringify(config));
execFileSync(process.execPath,['build.cjs','--app','account','--config','config/pages-client.json'],{cwd:work,stdio:'inherit'});
const {createServer}=require(path.join(work,'server/server.cjs'));
const adminPassword=crypto.randomBytes(24).toString('hex');
const seed=path.join(work,'isolated-seed.json');
fs.writeFileSync(seed,JSON.stringify({users:[{username:'preview-admin',password:adminPassword,role:'admin',name:'Presentation administrator'},{username:'preview-manager',password:crypto.randomBytes(24).toString('hex'),role:'ftd',name:'EcoGrid team'}]}));
const app=createServer({database:path.join(work,'isolated-preview.sqlite'),seedFile:seed,staticRoot:path.join(work,'dist'),centralBase:base,websiteBase:website,landingOrigins:[]});
(async()=>{
 try{
  const store=app.store,admin=store.authenticate('preview-admin',adminPassword,'staff');
  const client=store.authenticate('lox','lox1','client');
  store.db.prepare('UPDATE users SET username=?,name=?,email=?,phone=?,password=? WHERE id=?').run('public-preview','Alex Morgan','','',crypto.randomBytes(48).toString('hex'),client.id);
  const person=store.safeUser(store.db.prepare('SELECT * FROM users WHERE id=?').get(client.id));
  let row=store.snapshot(admin,client.id);
  row=store.balance(admin,client.id,{id:'preview-opening',version:row.version,kind:'credit',amount:5250,expectedBalance:0,reason:'Static presentation example'});
  const directory=JSON.parse(fs.readFileSync(path.join(work,'dist/stations.json'),'utf8')).stations;
  const selected=directory.filter(s=>(s.country||'US')==='US'&&!s.selectionClosed).slice(0,3).map(s=>s.id);
  const now=new Date(),started=new Date(now);started.setUTCDate(1);started.setUTCMonth(started.getUTCMonth()-1);started.setUTCDate(Math.min(now.getUTCDate(),new Date(Date.UTC(started.getUTCFullYear(),started.getUTCMonth()+1,0)).getUTCDate()));
  const finance=require(path.join(work,'server/finance.cjs'));
  for(const adjustment of row.state.adjustments)adjustment.date=started.toISOString();
  finance.activate(row.state,{tierId:'single',economyModel:'charge-revenue-v1',capital:250,stationIds:selected},new Set(directory.map(s=>s.id)),{id:'preview-energy',role:'admin',actor:'presentation',reason:'Static example: activated one calendar month ago'},started.toISOString());
  let weeks=0;
  for(let week=finance.nextWeek(row.state);Date.parse(week.periodEnd)<=now.getTime();week=finance.nextWeek(row.state)){
   finance.creditWeek(row.state,{id:'preview-week-'+(++weeks),role:'system',actor:'presentation',reason:'Completed sample week',periodStart:week.periodStart},week.periodEnd);
  }
  store.db.prepare('UPDATE accounts SET state=? WHERE user_id=?').run(JSON.stringify(row.state),client.id);
  row=store.addMiningExample(admin,client.id,{presentationOnly:true,id:'preview-asic',version:row.version,minerId:'s21-pro',capital:5000,projectUnits:100,sharePercent:1,country:'CA'});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  const origin='http://127.0.0.1:'+app.server.address().port,headers={Cookie:'eco_client='+store.login(person)};
  const get=async route=>{const r=await fetch(origin+route,{headers});if(!r.ok)throw Error(route+': '+r.status);return r;};
  const fixture={generatedAt:new Date().toISOString(),responses:{}};
  for(const endpoint of ['account','club','chat','identity','plan-document'])fixture.responses['client/'+endpoint]=await(await get('/api/client/'+endpoint)).json();
  // Public fixture identifiers carry no authentication material or operational contact data.
  const snapshot=fixture.responses['client/account'];snapshot.client.invite=null;snapshot.client.email='';snapshot.client.phone='';
  fixture.responses['client/club'].inviteUrl='';
  let html=await(await get('/client/?lang=en')).text();
  html=html.replace(/<script>window\.ECO_SHARED_CONTEXT=[\s\S]*?<\/script>/,'<script src="pages-client-data.js"></script><script src="pages-client-bootstrap.js"></script>');
  html=html.replace('<script src="central/client.js"></script>','<script src="pages-client-adapter.js"></script>');
  html=html.replace('<script src="central/support-chat.js"></script>','');
  html=html.replace('<script src="central/app-install.js"></script>','');
  html=html.replace(/<div class="role-switch"[\s\S]*?<\/div>/,'');
  html=html.replace('</body>','<script src="pages-client-ready.js"></script><script src="pages-client-preview-ui.js"></script></body>');
  fs.mkdirSync(path.join(output,'client'),{recursive:true});
  fs.writeFileSync(path.join(output,'client/index.html'),html);
  fs.writeFileSync(path.join(output,'index.html'),'<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=client/?lang=ru"><a href="client/?lang=ru">EcoGrid · Client preview</a>');
  const files=new Set(['platform-config.js','platform.js','stations.json','station-photos.json','station-visuals.json','central/central.css','pages-client-bootstrap.js','pages-client-adapter.js','pages-client-ready.js']);
  for(const[,ref]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg|webmanifest|png))(?:[?#][^"]*)?"/g))if(!ref.includes(':')&&ref!=='pages-client-data.js')files.add(ref);
  for(const file of files){const source=path.join(work,'dist',file),dest=path.join(output,file);if(!fs.existsSync(source))throw Error('Missing '+file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(source,dest);}
  fs.cpSync(path.join(work,'dist/assets'),path.join(output,'assets'),{recursive:true});
  // The client uses isolated in-memory sample state, not another page's saved workspace.
  const appPath=path.join(output,'app.js');let code=fs.readFileSync(appPath,'utf8');
  code=code.replace(/let demo=\{balance:0[^\n]*\ntry\{const saved=[^\n]*\n/,'let demo=structuredClone(window.ECO_SHARED_CONTEXT.state);\n');
  if(code.includes("const saved=JSON.parse(localStorage.getItem('ecocharge-demo-v1'))"))throw Error('Sample state isolation failed');
  fs.writeFileSync(appPath,code);
  fs.writeFileSync(path.join(output,'pages-client-data.js'),'window.ECO_PAGES_FIXTURE='+JSON.stringify(fixture).replaceAll('<','\\u003c')+';\n');
  fs.writeFileSync(path.join(output,'preview-manifest.json'),JSON.stringify({kind:'client-preview',sampleData:true,authentication:false,apiConnected:false,source:'fresh-isolated-fixture',energyCapital:250,miningCapital:5000,available:snapshot.state.balance,startedAt:started.toISOString(),completedWeeks:weeks},null,2));
  // Content-address local scripts and styles so published UI fixes bypass stale browser caches.
  html=html.replace(/((?:src|href)=")([^"?#]+\.(?:js|css))(?:[?#][^"]*)?(")/g,(all,prefix,ref,suffix)=>{if(ref.includes(':'))return all;const target=path.join(output,ref);if(!fs.existsSync(target))return all;return prefix+ref+'?v='+crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0,12)+suffix;});
  html=html.replace(/\r\n?/g,'\n').replace(/[ \t]+(?=\n)/g,'');
  fs.writeFileSync(path.join(output,'client/index.html'),html);
  fs.writeFileSync(path.join(output,'.nojekyll'),'');
  console.log('CLIENT PREVIEW READY: '+output);
 }finally{await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
