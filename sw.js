const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  // html
  '/',
  '/index.html',

  // javascripts
  '/js/app.js',
  '/js/materialize.min.js',

  // css
  '/css/styles.css',
  '/css/materialize.min.css',

  // image
  '/img/cloudy.png',
  '/img/rain.png',
  '/img/snow.png',
  '/img/storm.png',
  '/img/sunny.png',

  // cdn
];

self.addEventListener('install', (evt) => {
  //console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (evt) => {
  //console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  //console.log('fetch event', evt)
  /*
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request).then( fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      })
    })
  );
  */
});
