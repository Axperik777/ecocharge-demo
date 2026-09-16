const fs=require('fs');
const photos=JSON.parse(fs.readFileSync('dist/station-photos.json','utf8'));
const hero=photos['167597'];
fs.writeFileSync('dist/index.html',fs.readFileSync('src/home.html','utf8').replaceAll('Abingdon, VA','Abingdon, MD').replaceAll('Virginia','Maryland').replace('https://commons.wikimedia.org/wiki/Category:Electrify_America_charging_stations',hero.source).replace('Photo source ↗',hero.credit+' ↗'));
const template=fs.readFileSync('src/portal.html','utf8');
for(const role of ['client','staff']){fs.mkdirSync('dist/'+role,{recursive:true});fs.writeFileSync('dist/'+role+'/index.html',template.replaceAll('__ROLE__',role));}
const login=fs.readFileSync('src/login.html','utf8');
for(const [path,role] of [['login','client'],['team','staff']]){fs.mkdirSync('dist/'+path,{recursive:true});fs.writeFileSync('dist/'+path+'/index.html',login.replaceAll('__ROLE__',role));}
console.log('Built separate client and staff demo routes.');
