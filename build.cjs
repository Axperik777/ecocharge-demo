const fs=require('fs');
const crypto=require('crypto');
const {brand,favicon}=require('./src/brand.cjs');
require('./src/station-visuals.cjs').buildVisuals();
fs.writeFileSync('dist/assets/ecocharge-mark.svg',favicon);
// Content hashes prevent a cached stylesheet/script from showing the previous identity.
const finalize=html=>html.replace(/((?:src|href)=")([^"?#]+\.(?:css|js|svg))(\")/g,(match,start,file,end)=>{
 if(file.includes(':')||!fs.existsSync('dist/'+file))return match;
 const version=crypto.createHash('sha256').update(fs.readFileSync('dist/'+file)).digest('hex').slice(0,10);
 return start+file+'?v='+version+end;
});
const {pages,renderPage}=require('./src/site-pages.cjs');
for(const [route,page] of Object.entries(pages)){const dir='dist'+(route?'/'+route:'');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',finalize(renderPage(route,page)));}
const template=fs.readFileSync('src/portal.html','utf8');
for(const role of ['client','staff']){fs.mkdirSync('dist/'+role,{recursive:true});fs.writeFileSync('dist/'+role+'/index.html',finalize(template.replaceAll('__ROLE__',role).replace('__BRAND__',brand({dark:true,portal:true}))));}
const login=fs.readFileSync('src/login.html','utf8');
for(const [path,role] of [['login','client'],['team','staff']]){fs.mkdirSync('dist/'+path,{recursive:true});fs.writeFileSync('dist/'+path+'/index.html',finalize(login.replaceAll('__ROLE__',role).replace('__BRAND__',brand({dark:true}))));}
console.log('Built public pages, registration, and separate client/staff demo routes.');
