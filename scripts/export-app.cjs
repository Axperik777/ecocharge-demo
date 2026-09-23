// Produce a fresh deployable bundle for one application. Never overwrites a release.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const project=path.resolve(__dirname,'..');process.chdir(project);
const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
const app=arg('--app'),configPath=arg('--config')||'config/deployment.json',variant=arg('--variant');
if(!['website','account','crm'].includes(app))throw Error('Use --app website, account or crm');
const config=require('./platform-config.cjs')(configPath,variant);
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const output=path.join(project,'release',`${app}-${config.landingId}-${stamp}`);
execFileSync(process.execPath,['build.cjs','--app',app,'--config',configPath,...(variant?['--variant',variant]:[])],{stdio:'inherit'});
const pages=require('../apps/'+app+'/app.cjs').render({variant:config.landingId}),files=new Set(['platform-config.js','platform.js']);
const routeApp=ref=>['login','register','client'].includes(ref)?'account':['team','staff','crm'].includes(ref)?'crm':'website';
function links(html){return html.replace(/(<a\b[^>]*\bhref=")([^"#]+)"/g,(match,prefix,ref)=>{
 if(/^(?:[a-z]+:|\/)/i.test(ref)||/\.[a-z0-9]+(?:[?#]|$)/i.test(ref))return match;
 const surface=routeApp(ref.replace(/^\.\//,'').split(/[/?#]/)[0]),base=config[surface+'Base'];
 return base&&surface!==app?prefix+new URL(ref.replaceAll('&amp;','&'),base).href.replaceAll('&','&amp;')+'"':match;
});}
function copy(file){const source=path.join(project,'dist',file);if(!fs.existsSync(source))throw Error('Missing dependency: '+file);const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(source,destination);}
fs.mkdirSync(output,{recursive:true});
for(const route of Object.keys(pages)){
 const file=(route?route+'/':'')+'index.html',html=fs.readFileSync(path.join(project,'dist',file),'utf8');
 for(const [,ref]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|svg))(?:[?#][^" ]*)?"/g))if(!ref.includes(':'))files.add(ref);
 const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,links(html));
}
for(const file of files)copy(file);
for(const file of ['stations.json','station-photos.json','station-visuals.json'])copy(file);
fs.cpSync(path.join(project,'dist/assets'),path.join(output,'assets'),{recursive:true});
fs.writeFileSync(path.join(output,'.nojekyll'),'');
if(app!=='website')fs.writeFileSync(path.join(output,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${app==='account'?'login':'team'}/"><title>ECO CHARGE</title><a href="${app==='account'?'login':'team'}/">Open workspace</a></html>`);
fs.writeFileSync(path.join(output,'app-manifest.json'),JSON.stringify({app,variant:config.landingId,routes:Object.keys(pages),bases:config,createdAt:new Date().toISOString()},null,2)+'\n');
console.log('Export: '+output);
