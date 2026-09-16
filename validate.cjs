const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'dist'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,ref]of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(ref.includes(':')||ref.startsWith('#')||ref==='./')continue;if(!fs.existsSync(path.join(root,ref)))throw Error('Missing entry asset: '+ref)}
for(const file of fs.readdirSync(root).filter(s=>s.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
const stations=JSON.parse(fs.readFileSync(path.join(root,'stations.json'))).stations,photos=JSON.parse(fs.readFileSync(path.join(root,'station-photos.json')));
const uniquePhotos=new Set();
for(const [id,p]of Object.entries(photos)){if(!stations.some(s=>s.id===Number(id)))throw Error('Photo has no matching station: '+id);for(const item of [p,...(p.gallery||[])]){if(!fs.existsSync(path.join(root,item.path)))throw Error('Missing photo: '+id);if(!item.source.startsWith('https://')||!item.credit||!item.licenseUrl?.startsWith('https://'))throw Error('Missing source or license: '+id);if(uniquePhotos.has(item.path))throw Error('Photo reused across records: '+item.path);uniquePhotos.add(item.path)}}
if(photos.network)throw Error('Generic station-photo fallback is forbidden');
console.log(JSON.stringify({valid:true,stations:stations.length,photographedLocations:Object.keys(photos).length,exactLocationPhotos:uniquePhotos.size,entryAssets:true,javascriptSyntax:true}));
