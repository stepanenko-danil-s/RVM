const C='rvm-cache-v1247';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==C)return caches.delete(k);}));})
    .then(function(){return self.clients.claim();})
  );
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(function(cached){
      var net=fetch(e.request).then(function(r){
        try{var cc=r.clone();caches.open(C).then(function(c){c.put(e.request,cc);});}catch(_){}
        return r;
      }).catch(function(){return cached;});
      return cached||net;   /* cache-first: instant launch, sieć obnawia w tle */
    })
  );
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cl){
    for(var i=0;i<cl.length;i++){if('focus' in cl[i])return cl[i].focus();}
    if(self.clients.openWindow)return self.clients.openWindow('./');
  }));
});
