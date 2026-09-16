const fs=require('fs');
const directory=JSON.parse(fs.readFileSync('dist/stations.json','utf8')).stations;
const photos=JSON.parse(fs.readFileSync('dist/station-photos.json','utf8'));
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const featuredIds=[371815,167597,127227,152577,147079,164538,121746,187647,199184,165658];
const available=directory.filter(s=>!/taxi|tnc only|private|fleet/i.test(s.name));
const add=s=>{if(s&&!featuredIds.includes(s.id)&&featuredIds.length<50)featuredIds.push(s.id);};
// Start with recognized metros, then spread the remaining locations across states.
for(const city of ['San Francisco','San Diego','Los Angeles','Santa Monica','Seattle','Portland','Denver','Austin','Dallas','Houston','Miami','Orlando','Atlanta','Chicago','Phoenix','Las Vegas','Boston','New York','Philadelphia','Nashville','Charlotte','Minneapolis'])add(available.filter(s=>s.city===city).sort((a,b)=>b.ports-a.ports)[0]);
const represented=new Set(featuredIds.map(id=>directory.find(s=>s.id===id).state));
for(const state of [...new Set(available.map(s=>s.state))].sort())if(!represented.has(state)){add(available.filter(s=>s.state===state).sort((a,b)=>b.ports-a.ports)[0]);represented.add(state);}
for(const s of available.slice().sort((a,b)=>b.ports-a.ports))add(s);

function stationIllustration(s,variant=0){
 const palettes=[['#d8e9ee','#7ba7ba','#c1d0d2','#356773'],['#e4ebde','#8aab96','#d0d8cf','#3b7066'],['#e9e4d9','#b7a78b','#d7d0c4','#6d7e79'],['#dce5ee','#8ca1bb','#c6ced8','#4b6687']];
 const [sky,accent,ground,deep]=palettes[variant%palettes.length];
 const buildings=Array.from({length:8},(_,i)=>{const h=60+((i*29+variant*31)%95);return `<rect x="${i*110-20}" y="${300-h}" width="${65+i%3*12}" height="${h}" rx="3" fill="${accent}" opacity=".22"/>`;}).join('');
 const tree=(x,y,k)=>`<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 0v76" stroke="${deep}" stroke-width="6"/><ellipse cx="0" cy="-10" rx="31" ry="48" fill="${accent}"/><ellipse cx="-18" cy="2" rx="22" ry="31" fill="${deep}" opacity=".45"/></g>`;
 const charger=(x,y)=>`<g transform="translate(${x} ${y})"><path d="m0 0 42-8 15 9-42 9z" fill="#dce7e7"/><path d="M0 0v117l42 5V-8Z" fill="#f5f8f7"/><path d="m42-8 15 9v115l-15 6z" fill="#a8bcbb"/><path d="M9 16h25v42H9z" fill="#203d47"/><path d="M15 24h14v3H15zm0 7h10v2H15z" fill="#8fc7b1"/><path d="M7 100h28v7H7z" fill="${deep}"/><path d="M45 30c28 0 34 43 21 58-7 10-16 6-16-2V49" fill="none" stroke="#344f58" stroke-width="5" stroke-linecap="round"/><path d="M17 70h10v14H17z" fill="#c4d5d0"/></g>`;
 const canopy=variant%3===0?`<path d="m178 208 352-56 202 51-350 74z" fill="#345765"/><path d="m178 208 204 58 350-74v12l-350 75-204-60z" fill="#f0f5f3"/><path d="M230 233v156m418-169v121" stroke="#8da8aa" stroke-width="8"/>`:'';
 const scene=variant%3===1?`<path d="M0 270Q120 170 242 263T520 242T850 270V370H0Z" fill="${accent}" opacity=".22"/>`:buildings;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="Concept illustration for ${esc(s.city)}, ${esc(s.state)}; not a photograph of this location"><rect width="900" height="600" fill="${sky}"/><circle cx="735" cy="116" r="45" fill="#fff" opacity=".5"/>${scene}<path d="M0 347 900 281v319H0Z" fill="${ground}"/><path d="m74 418 482-97 270 95-484 125Z" fill="#a9bfc0" opacity=".8"/><path d="m128 430 424-86 207 71-423 98z" fill="#718c95"/><path d="m148 431 408-80m-305 96 41 46m61-67 49 48m48-68 53 47m42-68 53 47" fill="none" stroke="#e8f4ec" stroke-width="3" opacity=".9"/>${tree(99,305,.85)}${tree(794,300,.7)}${canopy}${charger(266,300)}${charger(407,271)}${charger(551,242)}<g transform="translate(${variant%2?495:377} 412)"><ellipse cx="0" cy="10" rx="88" ry="20" fill="#3b5963" opacity=".2"/><path d="m-82 2 15-22 33-8 38-34 39 3 30 29 28 12v23l-138 21-40-11z" fill="${variant%2?'#edf4f2':deep}"/><path d="m-18-30 26-25 29 3 21 21z" fill="#a2c4cb"/><ellipse cx="-44" cy="20" rx="13" ry="17" fill="#203743"/><ellipse cx="65" cy="0" rx="13" ry="17" fill="#203743"/><ellipse cx="-44" cy="20" rx="6" ry="9" fill="#abbfbd"/><ellipse cx="65" cy="0" rx="6" ry="9" fill="#abbfbd"/></g><rect x="28" y="27" width="211" height="31" rx="5" fill="#fff" opacity=".85"/><text x="42" y="47" fill="#35535a" font-size="11" font-family="Arial,sans-serif" letter-spacing="1.6">CONCEPT ILLUSTRATION</text><text x="32" y="552" fill="#294750" font-size="30" font-family="Arial,sans-serif" font-weight="600">${esc(s.city)}, ${esc(s.state)}</text><text x="33" y="578" fill="#4d686f" font-size="12" font-family="Arial,sans-serif">Location reference · Actual station photo not available</text></svg>`;
}
function buildVisuals(){
 fs.mkdirSync('dist/assets/illustrations',{recursive:true});
 const illustrations={};
 for(const [index,id]of featuredIds.entries())if(!photos[id]){
  const s=directory.find(s=>s.id===id),path='assets/illustrations/station-'+id+'.svg';
  fs.writeFileSync('dist/'+path,stationIllustration(s,index));
  illustrations[id]={kind:'illustration',path,alt:`Concept illustration for ${s.city}, ${s.state}. Not a photograph of this station.`,location:`${s.address}, ${s.city}, ${s.state}`,source:s.source,credit:'EcoCharge · original concept illustration'};
 }
 fs.writeFileSync('dist/assets/station-illustration.svg',stationIllustration({city:'EV charging',state:'US'},2));
 fs.writeFileSync('dist/station-visuals.json',JSON.stringify({featuredIds,illustrations},null,2));
 fs.writeFileSync('dist/station-visuals.js',"'use strict';\nwindow.ECOCHARGE_STATION_VISUALS="+JSON.stringify({featuredIds,illustrations})+';\n');
 return{featuredIds,illustrations};
}
module.exports={featuredIds,buildVisuals};
