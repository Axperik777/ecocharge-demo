'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||'public-site');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const previewRoot=path.join(root,'cabinet');
const preview=fs.existsSync(previewRoot)?require('./verify-client-preview.cjs')(previewRoot):null;
const workspaceRoot=path.join(root,'workspace');
const workspace=fs.existsSync(workspaceRoot)?require('./verify-workspace-preview.cjs')(workspaceRoot):null;
const files=walk(root).filter(f=>!f.startsWith(previewRoot+path.sep)&&!f.startsWith(workspaceRoot+path.sep)),manifest=JSON.parse(fs.readFileSync(path.join(root,'app-manifest.json'),'utf8'));
const websiteBase='https://axperik777.github.io/ecocharge-demo/';
const publishedPath=new URL(websiteBase).pathname.replace(/\/?$/,'/');
const legacyAliases=Object.freeze({
 'guides/why-ecogrid-rents-computing-cells':'guides/why-ai-data-centers-need-more-than-chips',
 'guides/digital-assets-need-real-infrastructure':'guides/ai-needs-physical-infrastructure'
});
const retiredPublicRoutes=['\u006dining','participate/\u006dining','guides/what-changes-a-\u006dining-result'];
const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8'),sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.doesNotMatch(robots,/^\s*Disallow:\s*\/\s*$/im,'Public website must not be blocked from search');
assert(robots.includes('Allow: '+publishedPath));assert(robots.includes('Disallow: '+publishedPath+'workspace/'));assert(robots.includes('Disallow: '+publishedPath+'cabinet/'));assert.match(robots,new RegExp('Sitemap:\\s*'+websiteBase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'sitemap\\.xml','i'));
// Template bodies can become active UI after interaction, so scan them too.
const visibleText=html=>html.replace(/<!--[^]*?-->/g,' ').replace(/<(?:script|style)\b[^>]*>[^]*?<\/(?:script|style)>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|quot|#39);/g,' ').replace(/\s+/g,' ');
const renderedSurface=html=>html.replace(/<!--[^]*?-->/g,' ').replace(/<(?:script|style)\b[^>]*>[^]*?<\/(?:script|style)>/gi,' ');
const staleCurrentCadence=/\bweekly\b|\b7[- ]day\b|\bday\s+\d+\s+of\s+7\b|недельн|7\s*(?:дней|дня)|день\s+\d+\s+из\s+7/i;
const retiredPublicVocabulary=new RegExp('\\bM'+'ining\\b|май'+'нинг|май'+'нер|\\bAS'+'IC\\b|\\bEcoM'+'iner\\b','iu');
assert.equal(manifest.app,'website');
assert.equal(manifest.routes.length,35);
for(const r of ['app','academy','learn','guides','club','compute','participate/charge','participate/solar','participate/compute',...Object.keys(legacyAliases)])assert(manifest.routes.includes(r));
for(const route of retiredPublicRoutes){assert(!manifest.routes.includes(route),'Retired public route remains in the manifest: '+route);assert(!fs.existsSync(path.join(root,route)),'Retired public route remains in the export: '+route);assert(!fs.existsSync(path.join(root,'ru',route)),'Retired Russian public route remains in the export: '+route);}
const guideRoutes=manifest.routes.filter(route=>route.startsWith('guides/'));
const activeGuideRoutes=guideRoutes.filter(route=>!legacyAliases[route]);
assert.equal(guideRoutes.length,16,'Expected 14 active guides plus 2 neutral legacy aliases');
assert.equal(activeGuideRoutes.length,14,'Expected 14 active standalone guide articles');
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
   assert.doesNotMatch(renderedSurface(text),retiredPublicVocabulary,'Public HTML exposes retired vocabulary: '+rel);
   const russian=rel.startsWith('ru/'),routeRel=russian?rel.slice(3):rel,route=routeRel==='index.html'?'':routeRel.replace(/\/index\.html$/,'').replace(/\/$/,'');
   const canonicalRoute=legacyAliases[route]||route,englishCanonical=new URL(canonicalRoute?canonicalRoute+'/':'',websiteBase).href,russianCanonical=new URL('ru/'+(canonicalRoute?canonicalRoute+'/':''),websiteBase).href,canonical=russian?russianCanonical:englishCanonical;
   if(legacyAliases[route]){
    assert.match(text,/<meta name="robots" content="noindex,follow">/,'Legacy alias must be noindex,follow: '+rel);
    assert.doesNotMatch(text,/data-lead-form/,'Legacy alias must not expose an active lead form: '+rel);
    assert(text.includes(legacyAliases[route]+'/'),'Legacy alias must send visitors to Compute: '+rel);
   }else{
    assert.match(text,/<meta name="robots" content="index,follow,max-image-preview:large">/,'Public page is not indexable: '+rel);
    assert.doesNotMatch(text,/noindex|nofollow/i,'Public page still blocks search: '+rel);
   }
   assert(text.includes('<link rel="canonical" href="'+canonical+'">'),'Wrong canonical URL: '+rel);
   assert(text.includes('<link rel="alternate" hreflang="en" href="'+englishCanonical+'">'),'Missing English alternate: '+rel);
   assert(text.includes('<link rel="alternate" hreflang="ru" href="'+russianCanonical+'">'),'Missing Russian alternate: '+rel);
   assert(text.includes('<link rel="alternate" hreflang="x-default" href="'+englishCanonical+'">'),'Missing default alternate: '+rel);
   assert(text.includes('id="eco-path-locale"'),'Missing canonical language bootstrap: '+rel);
   if(russian){
    assert.match(text,/<html\b[^>]*\blang="ru"/,'Russian route must declare Russian: '+rel);
    assert(text.includes('<base href="'+websiteBase+'">'),'Russian route must keep root assets: '+rel);
    const title=text.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'',description=text.match(/<meta name="description" content="([^"]*)">/)?.[1]||'';
    assert.match(title,/[А-Яа-яЁё]/,'Russian route title must be localized: '+rel);
    assert.match(description,/[А-Яа-яЁё]/,'Russian route description must be localized: '+rel);
   }
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
   const documentBase=new URL(text.match(/<base href="([^"]+)"/)?.[1]||canonical,canonical);
   for(const match of text.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const ref=match[1].replaceAll('&amp;','&');
    if(/^(?:data:|mailto:|tel:)/.test(ref)||/^(?:\.\.\/)+$/.test(ref))continue;
    const url=new URL(ref,documentBase);
    if(url.origin!==base.origin)continue;
    assert(url.pathname.startsWith(base.pathname),'Escaped Pages base: '+ref);
    const local=decodeURIComponent(url.pathname.slice(base.pathname.length));
    assert(!forbidden.test(local),'Workspace link: '+ref);
    assert(fs.existsSync(path.join(root,local)),'Missing dependency/link: '+rel+' => '+local);
   }
  }
 }
}
for(const route of manifest.routes){assert(fs.existsSync(path.join(root,route,'index.html')));assert(fs.existsSync(path.join(root,'ru',route,'index.html')),'Missing Russian route: '+route);}
for(const route of manifest.routes){const canonical=new URL(route?route+'/':'',websiteBase).href,ru=new URL('ru/'+(route?route+'/':''),websiteBase).href;for(const url of [canonical,ru])legacyAliases[route]?assert(!sitemap.includes('<loc>'+url.replaceAll('&','&amp;')+'</loc>'),'Legacy alias must be excluded from sitemap: '+url):assert(sitemap.includes('<loc>'+url.replaceAll('&','&amp;')+'</loc>'),'Sitemap URL missing: '+url);}
for(const route of ['', 'participate/charge','participate/compute','compute','plans','resources','how-it-works','guides',...activeGuideRoutes]){const file=path.join(root,route,'index.html');assert.doesNotMatch(visibleText(fs.readFileSync(file,'utf8')),staleCurrentCadence,'Current route exposes the retired weekly cadence: /'+route);}
for(const asset of ['site.js','trust.js','trust-content.js','funnel.js'])assert.doesNotMatch(fs.readFileSync(path.join(root,asset),'utf8'),staleCurrentCadence,'Active public UI script exposes the retired weekly cadence: '+asset);
// Public export must keep the ecosystem neutral while every project retains its own request path.
const home=fs.readFileSync(path.join(root,'index.html'),'utf8'),plans=fs.readFileSync(path.join(root,'plans/index.html'),'utf8');
for(const route of ['charge','solar','compute'])assert.match(home,new RegExp('href="participate\\/'+route+'\\/"'),'Homepage project entry is missing: '+route);
assert.match(home,/EcoGrid designs and operates energy infrastructure/,'Homepage must identify EcoGrid as an infrastructure company');
assert.match(home,/href="academy\/#academy-routes"/,'Homepage Academy evidence entry is missing');
assert.doesNotMatch(home,/data-public-plan-form|data-lead-form|src="public-plan-ui\.js/,'Homepage must introduce the company without a calculator or lead form');
assert.doesNotMatch(home,/home-partner-names|Microsoft|Google|Apple|Bank of America/,'Homepage must not borrow authority from unverified partnership names');
assert.match(home,/data-workspace-entry[^>]*class="ec-sign-in"/,'Visible account entry is missing');
assert.match(home,/href="[^"]*workspace\/login\//,'Public sign-in must lead to the entry page');
assert.doesNotMatch(home,/href="[^"]*install=1"/,'Installation belongs inside the account');
for(const route of ['login','register']){
 const entry=fs.readFileSync(path.join(workspaceRoot,route,'index.html'),'utf8');
 assert.match(entry,/public-account-entry\.js/,'Missing public entry screen: '+route);
 assert.match(entry,/data-account-connected="false"/,'Public account entry must not fake a live backend');
 assert.match(entry,/id="entry-fields"/,'Standard account form container missing');
 assert.doesNotMatch(entry,/Посмотреть пример кабинета|Explore the account preview/,'Remove preview links from authentication');
 assert.doesNotMatch(entry,/http-equiv="refresh"|location\.replace\(/,'Public entry must not bypass sign-in or redirect to CRM: '+route);
}
assert.doesNotMatch(plans,/data-public-plan-form|project-calculator/,'Public plans must stay informational and must not activate a browser calculator');
assert.match(plans,/13(?:%|–16%)|16%/,'Public plans must explain the current calendar-month Charge range');
assert.match(plans,/4[- ]day(?:s)?|four[- ]day(?:s)?/i,'Public plans must explain the 4-day settlement cadence');
for(const route of ['charge','solar','compute']){
 const page=fs.readFileSync(path.join(root,'participate',route,'index.html'),'utf8');
 assert.match(page,/data-lead-form/,'Project must expose its own request form: '+route);
 assert.match(page,new RegExp('name="journeyTopic" value="'+route+'"'),'Project request must preserve its topic: '+route);
}
const compute=fs.readFileSync(path.join(root,'participate/compute/index.html'),'utf8'),computeOverview=fs.readFileSync(path.join(root,'compute/index.html'),'utf8'),computeText=visibleText(compute)+' '+visibleText(computeOverview);
assert.match(compute,/name="journeyPurpose"/,'Compute must expose a project-specific intent selector');
assert.match(compute,/<option value="capacity">[^<]+<\/option>/,'Compute must expose the GPU-capacity intent');
assert.match(compute,/<option value="participation">[^<]+<\/option>/,'Compute must expose the infrastructure-participation intent');
assert.match(compute,/name="computeRequestedCapacity"/,'Compute capacity request must collect requested capacity');
assert.doesNotMatch(computeText,/13\s*\/\s*14\s*\/\s*15\s*\/\s*16|42%|Every 4 days|Каждые 4 дня|\+1 percentage point|\+1 процентн/i,'Compute must not inherit Charge economics');
assert.match(computeText,/Solar and storage[^.]{0,240}do not mean continuous operation from sunlight alone/i,'Compute must explain that shared infrastructure is not a solar-only 24/7 claim');
assert.match(plans,/participate\/charge\//,'Public plans must retain the Charge project link');
assert.match(plans,/participate\/solar\//,'Public plans must retain the Solar project link');
assert.match(plans,/participate\/compute\//,'Public plans must retain the Compute project link');
const stations=JSON.parse(fs.readFileSync(path.join(root,'stations.json'),'utf8')).stations;
assert.equal(stations.length,3980);assert.equal(stations.filter(s=>s.selectionClosed).length,1910);
const runtime=fs.readFileSync(path.join(root,'website-only.js'),'utf8');
assert(workspace && runtime.includes('workspace/login/') && fs.readFileSync(path.join(root,'lead-form.js'),'utf8').includes("EcoSandbox.request('public/leads'"));
console.log(JSON.stringify({ok:true,pages:manifest.routes.length,files:files.length,bytes:files.reduce((n,f)=>n+fs.statSync(f).size,0),privateData:false,workspaceRoutes:true,apiConnected:false,clientPreview:preview,workspace}));
