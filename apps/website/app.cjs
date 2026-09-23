const {pages,renderPage}=require('../../src/site-pages.cjs');
const variants=require('./variants.json');
module.exports={
 name:'website',
 render({variant='main'}={}){
  if(!variants[variant])throw Error('Unknown landing variant: '+variant);
  return Object.fromEntries(Object.entries(pages).filter(([route])=>route!=='register').map(([route,page])=>{
   let html=renderPage(route,page).replaceAll('<a href="team/">Team sign-in ↗</a>','');
   if(!route&&variant!=='main'){const v=variants[variant];html=html.replace('<h1>Explore EV charging.<br><span>Build your own plan.</span></h1>',`<h1>${v.heading}<br><span>${v.secondLine}</span></h1>`).replace('See real U.S. charging stations. Learn how the business works. Build a sample plan before you sign up.',v.description);}
   return [route,html];
  }));
 }
};
