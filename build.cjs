const fs=require('fs');
const crypto=require('crypto');
const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
const target=arg('--app')||'all';
if(!['all','website','account','crm'].includes(target))throw Error('Use --app website, account, crm or all');
const platform=require('./scripts/platform-config.cjs')(arg('--config')||'config/deployment.json',arg('--variant'));
fs.writeFileSync('dist/platform-config.js','window.ECO_PLATFORM_CONFIG='+JSON.stringify(platform)+';\n');
const {favicon}=require('./src/brand.cjs');
require('./src/station-visuals.cjs').buildVisuals();
fs.writeFileSync('dist/assets/ecocharge-mark.svg',favicon);
const trustContent=require('./src/trust-content.json');
const englishCopy=require('./src/locales/en.json');
const publicCopy=text=>{const decoded=text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&#39;/g,"'").replace(/&quot;/g,'"'),normalized=decoded.replace(/\s+/g,' ').trim();let value=englishCopy[normalized];if(value===undefined&&normalized.startsWith('EcoCharge — ')){const title=englishCopy[normalized.slice(12)];if(title)value='EcoCharge — '+title;}return value===undefined?text:decoded.match(/^\s*/)[0]+value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+decoded.match(/\s*$/)[0];};
fs.writeFileSync('dist/trust-content.js','window.ECOCHARGE_TRUST_CONTENT='+JSON.stringify(trustContent).replaceAll('<','\\u003c')+';\n');
fs.writeFileSync('dist/locale-en.js','window.ECOCHARGE_EN='+JSON.stringify(JSON.parse(fs.readFileSync('src/locales/en.json','utf8'))).replaceAll('<','\\u003c')+';\n');
// Content hashes prevent a cached stylesheet/script from showing the previous identity.
fs.writeFileSync('dist/locale-ru.js','window.ECOCHARGE_RU='+JSON.stringify(JSON.parse(fs.readFileSync('src/locales/ru.json','utf8'))).replaceAll('<','\\u003c')+';\n');
const finalize=(html,app)=>{html=html.replace(/data-app="[^"]*"/,'').replace('<html ',`<html data-app="${app}" `);const routing='<script src="platform-config.js"></script><script src="platform.js"></script>';html=html.includes('<script src="entry.js">')?html.replace('<script src="entry.js">',routing+'<script src="entry.js">'):html.replace('</head>',routing+'</head>');return html.replace(/>([^<>]+)</g,(_,text)=>'>'+publicCopy(text)+'<').replace('</head>','<link rel="stylesheet" href="locale.css"><script src="locale-en.js" defer></script><script src="locale-ru.js" defer></script><script src="locale.js" defer></script></head>').replace(/((?:src|href)=")([^"?#]+\.(?:css|js|svg))(\")/g,(match,start,file,end)=>{
 if(file.includes(':')||!fs.existsSync('dist/'+file))return match;
 const content=fs.readFileSync('dist/'+file,'utf8').replaceAll('\r\n','\n');
 const version=crypto.createHash('sha256').update(content).digest('hex').slice(0,10);
 return start+file+'?v='+version+end;
});};
for(const name of target==='all'?['website','account','crm']:[target]){const app=require('./apps/'+name+'/app.cjs');for(const [route,html]of Object.entries(app.render({variant:platform.landingId}))){const dir='dist'+(route?'/'+route:'');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',finalize(html,name));}}
console.log('Built '+target+' application(s).');
