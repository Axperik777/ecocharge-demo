const fs=require('fs');
const crypto=require('crypto');
const {brand,favicon}=require('./src/brand.cjs');
require('./src/station-visuals.cjs').buildVisuals();
fs.writeFileSync('dist/assets/ecocharge-mark.svg',favicon);
const trustContent=require('./src/trust-content.json');
const englishCopy=require('./src/locales/en.json');
const publicCopy=text=>{const decoded=text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&#39;/g,"'").replace(/&quot;/g,'"'),normalized=decoded.replace(/\s+/g,' ').trim();let value=englishCopy[normalized];if(value===undefined&&normalized.startsWith('EcoCharge — ')){const title=englishCopy[normalized.slice(12)];if(title)value='EcoCharge — '+title;}return value===undefined?text:decoded.match(/^\s*/)[0]+value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+decoded.match(/\s*$/)[0];};
fs.writeFileSync('dist/trust-content.js','window.ECOCHARGE_TRUST_CONTENT='+JSON.stringify(trustContent).replaceAll('<','\\u003c')+';\n');
fs.writeFileSync('dist/locale-en.js','window.ECOCHARGE_EN='+JSON.stringify(JSON.parse(fs.readFileSync('src/locales/en.json','utf8'))).replaceAll('<','\\u003c')+';\n');
// Content hashes prevent a cached stylesheet/script from showing the previous identity.
fs.writeFileSync('dist/locale-ru.js','window.ECOCHARGE_RU='+JSON.stringify(JSON.parse(fs.readFileSync('src/locales/ru.json','utf8'))).replaceAll('<','\\u003c')+';\n');
const finalize=html=>html.replace(/>([^<>]+)</g,(_,text)=>'>'+publicCopy(text)+'<').replace('</head>','<link rel="stylesheet" href="locale.css"><script src="locale-en.js" defer></script><script src="locale-ru.js" defer></script><script src="locale.js" defer></script></head>').replace(/((?:src|href)=")([^"?#]+\.(?:css|js|svg))(\")/g,(match,start,file,end)=>{
 if(file.includes(':')||!fs.existsSync('dist/'+file))return match;
 const content=fs.readFileSync('dist/'+file,'utf8').replaceAll('\r\n','\n');
 const version=crypto.createHash('sha256').update(content).digest('hex').slice(0,10);
 return start+file+'?v='+version+end;
});
const {pages,renderPage}=require('./src/site-pages.cjs');
for(const [route,page] of Object.entries(pages)){const dir='dist'+(route?'/'+route:'');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',finalize(renderPage(route,page)));}
const template=fs.readFileSync('src/portal.html','utf8');
for(const role of ['client','staff']){fs.mkdirSync('dist/'+role,{recursive:true});fs.writeFileSync('dist/'+role+'/index.html',finalize(template.replaceAll('__ROLE__',role).replace('__BRAND__',brand({dark:true,portal:true})).replace('</body>','<script src="locale-documents.js"></script></body>')));}
const login=fs.readFileSync('src/login.html','utf8');
for(const [path,role] of [['login','client'],['team','staff']]){fs.mkdirSync('dist/'+path,{recursive:true});fs.writeFileSync('dist/'+path+'/index.html',finalize(login.replaceAll('__ROLE__',role).replace('__BRAND__',brand({dark:true}))));}
console.log('Built public pages, registration, and separate client/staff demo routes.');
