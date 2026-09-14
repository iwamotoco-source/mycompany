const CACHE='atelier-direct-shell-v1';
const CORE=['./app.html','./atelier-direct.js','./control.html','./manifest.webmanifest','./icon-512.jpg','./apple-touch-icon.jpg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
async function directApp(request){
  try{
    const res=await fetch(request,{cache:'no-store'});
    let text=await res.text();
    if(!text.includes('atelier-direct.js')) text=text.replace('</body>','<script src="./atelier-direct.js?v=1"></script></body>');
    const headers=new Headers(res.headers);headers.delete('content-length');headers.set('cache-control','no-store');headers.set('content-type','text/html; charset=utf-8');
    return new Response(text,{status:res.status,statusText:res.statusText,headers});
  }catch(err){
    const cached=await caches.match('./app.html');
    if(cached){let text=await cached.text();if(!text.includes('atelier-direct.js'))text=text.replace('</body>','<script src="./atelier-direct.js?v=1"></script></body>');return new Response(text,{headers:{'content-type':'text/html; charset=utf-8'}})}
    throw err;
  }
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  if(u.pathname.endsWith('/app.html')){e.respondWith(directApp(e.request));return;}
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./app.html'))));return;
  }
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)));
});