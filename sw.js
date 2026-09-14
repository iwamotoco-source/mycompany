const CACHE_PREFIX='atelier-';

self.addEventListener('install',event=>{
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)||key.includes('my-company')).map(key=>caches.delete(key)));
    }catch(_){ }
    await self.clients.claim();
  })());
});

// IMPORTANT:
// Do not intercept or rewrite app.html here.
// The 3.2 MB MY COMPANY document contains inline scripts/templates; rewriting
// the HTML as a string can insert markup inside JavaScript source and make
// Safari render source text on screen. This worker is intentionally passive.
