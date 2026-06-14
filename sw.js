const C='rvm-cache-v1111';
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
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cl){
    for(var i=0;i<cl.length;i++){if('focus' in cl[i])return cl[i].focus();}
    if(self.clients.openWindow)return self.clients.openWindow('./');
  }));
});
