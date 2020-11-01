const CACHE = 'version1';
const URL = ['index.html', 'offline.html'];
const self = this;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log('Cached!');
      return cache.addAll(URL);
    }),
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    }),
  );
});

self.addEventListener('activate', (event) => {
  const newCache = [];
  newCache.push(CACHE);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!newCache.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});
