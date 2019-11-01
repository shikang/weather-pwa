const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v2';
const weatherCacheName = 'weather-v1';
const weatherRequestUrl = "https://api.darksky.net/forecast/3343a0f3b0a46dab840ee06daf9c36d9/";
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
  '/img/partly-cloudy-sun.png',
  '/img/partly-cloudy-night.png',

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
        .filter(key => key !== staticCacheName && key !== dynamicCacheName && key !== weatherCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (evt) => {
  
  //console.log('weather Url', weatherRequestUrl);
  //console.log('fetch event', evt);
  if (evt.request.url.indexOf(weatherRequestUrl) > -1) {
    evt.respondWith(
      caches.open(weatherCacheName).then((cache) => {
        return fetch(evt.request).then((response) => {
          cache.put(evt.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
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
  }
});
