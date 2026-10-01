'use strict';
// Only the public app shell and a fixed list of static learning assets are cached.
// API calls, forms, accounts, social content and arbitrary URLs always use the network.
const VERSION='ecogrid-learning-108-v1',ROOT=new URL('../',self.location.href),APP=new URL('./',self.location.href);
const ASSETS=['community.js','community.css','site.css','brand.css','lead-form.css','journey.css','academy-game.css','club-app.css','locale.css','typography.css','site-system.css','funnel-events.js','eco-guide.js','club-app.js','language-policy.js','platform-config.js','platform.js','business-model.js','business-ui.js','business-model.css','demand-rhythm.js','calendar-yield.js','account-finance.js','website-only.js','locale-en.js','locale-ru.js','locale.js','assets/manrope-regular.ttf','assets/manrope-semibold.ttf','assets/manrope-bold.ttf','assets/ecocharge-mark.svg','assets/ecogrid-app-192.png','assets/ecogrid-app-512.png'];
const allow=new Set(ASSETS.map(x=>new URL(x,ROOT).pathname));
self.addEventListener('install',e=>{e.waitUntil((async()=>{const cache=await caches.open(VERSION);await cache.add(new Request(APP.href,{cache:'reload'}));await Promise.all(ASSETS.map(async x=>{try{await cache.add(new Request(new URL(x,ROOT).href,{cache:'reload'}));}catch{}}));await self.skipWaiting();})());});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('ecogrid-learning-')&&key!==VERSION)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',e=>{const req=e.request,u=new URL(req.url);if(req.method!=='GET'||u.origin!==ROOT.origin)return;
 if(req.mode==='navigate'&&(u.pathname===APP.pathname||u.pathname===APP.pathname+'index.html')){e.respondWith(fetch(req).catch(async()=>{const shell=await caches.match(APP.href);return shell||Response.error();}));return;}
 if(!allow.has(u.pathname))return;
 e.respondWith((async()=>{const cache=await caches.open(VERSION),key=u.origin+u.pathname;try{const response=await fetch(req);if(response.ok&&response.type==='basic')await cache.put(key,response.clone());return response;}catch{return await cache.match(key)||Response.error();}})());
});
