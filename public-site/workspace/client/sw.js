'use strict';
// Only a public offline page is stored. Never cache signed-in HTML, APIs or mutations.
const ROOT=new URL('./',self.location.href),CACHE='eco-client-offline-v2-'+ROOT.pathname,OFFLINE=new URL('offline.html',ROOT).href;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add(new Request(OFFLINE,{cache:'reload',credentials:'omit'}))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('eco-client-offline-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||request.mode!=='navigate'||url.origin!==self.location.origin||!url.pathname.startsWith(ROOT.pathname))return;
 event.respondWith(fetch(request).catch(()=>caches.open(CACHE).then(cache=>cache.match(OFFLINE)).then(page=>page||new Response('Offline. Reconnect and reload your account.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))));
});
