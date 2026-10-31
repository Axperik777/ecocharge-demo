'use strict';
// Retire the public learning PWA. Only the client account remains installable.
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('ecogrid-learning-'))await caches.delete(key);
 await self.registration.unregister();
 const app=new URL('./',self.location.href);
 for(const client of await self.clients.matchAll({type:'window'}))if(new URL(client.url).pathname.startsWith(app.pathname))await client.navigate(client.url);
})()));
