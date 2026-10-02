'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../public-site/workspace'),ctx={window:{},structuredClone,crypto,URLSearchParams,console};vm.createContext(ctx);
for(const file of ['sandbox-data.js','sandbox-domain.js','sandbox-stations.js','sandbox-model.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
const w=ctx.window,seed=w.ECO_SANDBOX_SEED,model=w.createEcoSandbox(seed,w.EcoSandboxDomain,w.ECO_SANDBOX_STATIONS),manager={role:'ftd'},admin={role:'admin'};
let db=model.initial();const get=(p,c=manager)=>model.execute(db,p,'GET',{},c).result;
assert.equal(get('staff/knowledge').articles.length,22);assert(get('staff/knowledge').articles.every(a=>a.status==='published'&&!a.hasDraft));assert.equal(get('staff/knowledge').articles.filter(a=>a.journeyStep).length,8);
// An existing browser gets new built-ins without resetting clients or money.
const before=JSON.stringify(db.accounts);db.knowledge=structuredClone(seed.knowledgeRelease.previous);delete db.knowledgeRelease;let migrated=model.execute(db,'staff/knowledge','GET',{},manager);assert.equal(migrated.result.articles.length,22);assert.equal(JSON.stringify(migrated.db.accounts),before);
const id=Object.keys(db.knowledge)[0];db.knowledge[id].explanationRu='Авторская правка';const preserved=model.execute(db,'staff/knowledge','GET',{},admin);assert.equal(preserved.db.knowledge[id].explanationRu,'Авторская правка');assert.equal(preserved.result.articles.filter(a=>a.status==='published').length,21);
// A deleted built-in is not resurrected; a custom article is not overwritten.
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
