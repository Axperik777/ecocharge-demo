'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../public-site/workspace'),ctx={window:{},structuredClone,crypto,URLSearchParams,console};vm.createContext(ctx);
for(const file of ['sandbox-data.js','sandbox-domain.js','sandbox-stations.js','sandbox-model.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const w=ctx.window,seed=w.ECO_SANDBOX_SEED,model=w.createEcoSandbox(seed,w.EcoSandboxDomain,w.ECO_SANDBOX_STATIONS),manager={role:'ftd'},admin={role:'admin'};
let db=model.initial();const get=(p,c=manager)=>model.execute(db,p,'GET',{},c).result;
assert.equal(get('staff/knowledge').articles.length,23);assert(get('staff/knowledge').articles.every(a=>a.status==='published'&&!a.hasDraft));assert.equal(get('staff/knowledge').articles.filter(a=>a.journeyStep).length,8);
// Upgrade the previous published built-ins without resetting accounts or financial history.
const before=JSON.stringify(db.accounts),prior=new Map();for(const a of seed.knowledgeRelease.baselines){const key=a.titleEn+'|'+(a.journeyStep||'');if(!prior.has(key))prior.set(key,a);}db.knowledge=Object.fromEntries([...prior.values()].map(a=>[a.id,structuredClone(a)]));delete db.knowledgeRelease;
let migrated=model.execute(db,'staff/knowledge','GET',{},manager);assert.equal(migrated.result.articles.length,23);assert(migrated.result.articles.some(a=>a.answerEn.includes('58% of gross')));assert.equal(JSON.stringify(migrated.db.accounts),before);
const id=Object.keys(db.knowledge)[0];db.knowledge[id].explanationRu='Авторская правка';db.knowledge[id].hasDraft=true;const preserved=model.execute(db,'staff/knowledge','GET',{},admin);assert.equal(preserved.db.knowledge[id].explanationRu,'Авторская правка');assert.equal(JSON.stringify(preserved.db.accounts),before);
// Deliberate deletion and custom articles remain untouched.
delete db.knowledge[id];db.knowledge.CUSTOM={id:'CUSTOM',titleRu:'Своя статья',status:'draft',version:1,revision:1};const custom=model.execute(db,'staff/knowledge','GET',{},admin).db;assert(!custom.knowledge[id]);assert.equal(custom.knowledge.CUSTOM.titleRu,'Своя статья');assert.equal(JSON.stringify(custom.accounts),before);
// New editorial drafts do not leak through manager reads or helper search.
db=model.initial();let article=get('staff/knowledge').articles[0];const publishedAnswer=article.answerEn;
let result=model.execute(db,'staff/knowledge/'+article.id,'POST',{revision:article.revision,content:{...article,answerEn:'PRIVATE_UNRELEASED_WORDING'}},admin);db=result.db;
assert.equal(get('staff/knowledge/'+article.id).answerEn,publishedAnswer);assert.equal(get('staff/knowledge?q=PRIVATE_UNRELEASED_WORDING').articles.length,0);
assert.equal(model.execute(db,'staff/knowledge-helper','POST',{query:'PRIVATE_UNRELEASED_WORDING'},manager).result.sources.length,0);
assert.throws(()=>get('staff/knowledge/'+article.id+'/versions/1'),e=>e.status===403);
article=get('staff/knowledge/'+article.id,admin);assert.throws(()=>model.execute(db,'staff/knowledge/'+article.id+'/publish','POST',{revision:article.revision},manager),e=>e.status===403);
db=model.execute(db,'staff/knowledge/'+article.id+'/withdraw','POST',{revision:article.revision,reason:'QA'},admin).db;assert.throws(()=>get('staff/knowledge/'+article.id),e=>e.status===410);
console.log('Knowledge release verified: publication, migration, editorial preservation, role isolation and unchanged finance.');
