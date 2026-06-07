const C='rvm-cache-v1016';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(r){
      try{var cc=r.clone();caches.open(C).then(function(c){c.put(e.request,cc);});}catch(_){}
      return r;
    }).catch(function(){return caches.match(e.request);})
  );
});
