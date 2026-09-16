const fs=require('fs');
const {pages,renderPage}=require('./src/site-pages.cjs');
for(const [route,page] of Object.entries(pages)){const dir='dist'+(route?'/'+route:'');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',renderPage(route,page));}
const template=fs.readFileSync('src/portal.html','utf8');
for(const role of ['client','staff']){fs.mkdirSync('dist/'+role,{recursive:true});fs.writeFileSync('dist/'+role+'/index.html',template.replaceAll('__ROLE__',role));}
const login=fs.readFileSync('src/login.html','utf8');
for(const [path,role] of [['login','client'],['team','staff']]){fs.mkdirSync('dist/'+path,{recursive:true});fs.writeFileSync('dist/'+path+'/index.html',login.replaceAll('__ROLE__',role));}
console.log('Built public pages, registration, and separate client/staff demo routes.');
