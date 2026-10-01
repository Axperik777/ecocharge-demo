'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||'public-site');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const previewRoot=path.join(root,'cabinet');
const preview=fs.existsSync(previewRoot)?require('./verify-client-preview.cjs')(previewRoot):null;
const workspaceRoot=path.join(root,'workspace');
const workspace=fs.existsSync(workspaceRoot)?require('./verify-workspace-preview.cjs')(workspaceRoot):null;
const files=walk(root).filter(f=>!f.startsWith(previewRoot+path.sep)&&!f.startsWith(workspaceRoot+path.sep)),manifest=JSON.parse(fs.readFileSync(path.join(root,'app-manifest.json'),'utf8'));
assert.equal(manifest.app,'website');
assert.equal(manifest.routes.length,18);for(const r of ['app','academy','learn','club','participate/charge','participate/solar','participate/mining'])assert(manifest.routes.includes(r));
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'platform-config.js'),'utf8'),context);
const config=context.window.ECO_PLATFORM_CONFIG;
assert.equal(config.websiteOnly,true);
for(const key of ['accountBase','crmBase','apiBase'])assert.equal(config[key],'');
assert.equal(config.websiteBase,'https://axperik777.github.io/ecocharge-demo/');
assert.equal(config.localeMode,'development');
const base=new URL(config.websiteBase),forbidden=/^(?:client|login|register|team|staff|crm|central|server|private-data)(?:\/|$)/;
for(const file of files){
 const rel=path.relative(root,file).replaceAll('\\','/');
 assert(!forbidden.test(rel),'Excluded application: '+rel);
 assert(!/\.sqlite(?:-|$)|\.local\.|initial-users|\.env(?:\.|$)|ДОСТУПЫ/i.test(rel),'Private file: '+rel);
 if(/\.(?:html|css|js|json)$/.test(file)){
  const text=fs.readFileSync(file,'utf8');
  assert(!/https?:\/\/(?:localhost|127\.0\.0\.1)(?=[:/])/i.test(text),'Local URL: '+rel);
  if(file.endsWith('.html')){
   assert(text.includes('website-only.js'),'Missing public-only boundary: '+rel);
   if (workspace && text.includes('data-lead-form')) {
    let previous = -1;
    for (const ref of ['workspace/sandbox-data.js','workspace/sandbox-domain.js','workspace/sandbox-stations.js','workspace/sandbox-model.js','workspace/sandbox-bootstrap.js','lead-form.js']) {
     const at = text.indexOf('src="'+ref);
     assert(at > previous, 'Missing or out-of-order form dependency: '+rel+' => '+ref);
     previous = at;
    }
   }
   assert(!/<section\b[^>]*class="[^"]*\b(?:v-workspace-shell|f-study-finish)\b/.test(text),'Orphaned account preview section: '+rel);
   for(const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const ref=match[1].replaceAll('&amp;','&');
    if(/^(?:data:|mailto:|tel:)/.test(ref)||/^(?:\.\.\/)+$/.test(ref))continue;
    const url=new URL(ref,base);
    if(url.origin!==base.origin)continue;
    assert(url.pathname.startsWith(base.pathname),'Escaped Pages base: '+ref);
    const local=decodeURIComponent(url.pathname.slice(base.pathname.length));
    assert(!forbidden.test(local),'Workspace link: '+ref);
    assert(fs.existsSync(path.join(root,local)),'Missing dependency/link: '+rel+' => '+local);
   }
  }
 }
}
for(const route of manifest.routes)assert(fs.existsSync(path.join(root,route,'index.html')));
// Public export must retain the paths promised by the homepage and plan cards.
const home=fs.readFileSync(path.join(root,'index.html'),'utf8'),plans=fs.readFileSync(path.join(root,'plans/index.html'),'utf8');
assert.match(home,/href="#how-ecogrid-works"/,'Homepage presentation entry is missing');
assert.doesNotMatch(home,/data-public-plan-form|data-lead-form|src="public-plan-ui\.js/,'Homepage must introduce the company without a calculator or lead form');
assert.match(home,/data-workspace-entry[^>]*class="ec-sign-in"/,'Visible account entry is missing');
assert.match(home,/href="[^"]*workspace\/login\//,'Public sign-in must lead to the entry page');
assert.doesNotMatch(home,/href="[^"]*install=1"/,'Installation belongs inside the account');
for(const route of ['login','register']){
 const entry=fs.readFileSync(path.join(workspaceRoot,route,'index.html'),'utf8');
 assert.match(entry,/public-account-entry\.js/,'Missing public entry screen: '+route);
 assert.doesNotMatch(entry,/http-equiv="refresh"|location\.replace\(/,'Public entry must not bypass sign-in or redirect to CRM: '+route);
}
assert.doesNotMatch(plans,/data-public-plan-form|project-calculator|13%|16%/,'Public plans must be removed');
const stations=JSON.parse(fs.readFileSync(path.join(root,'stations.json'),'utf8')).stations;
assert.equal(stations.length,3980);assert.equal(stations.filter(s=>s.selectionClosed).length,1910);
const runtime=fs.readFileSync(path.join(root,'website-only.js'),'utf8');
assert(workspace && runtime.includes('workspace/login/') && fs.readFileSync(path.join(root,'lead-form.js'),'utf8').includes("EcoSandbox.request('public/leads'"));
console.log(JSON.stringify({ok:true,pages:manifest.routes.length,files:files.length,bytes:files.reduce((n,f)=>n+fs.statSync(f).size,0),privateData:false,workspaceRoutes:true,apiConnected:false,clientPreview:preview,workspace}));
