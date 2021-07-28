var cacheName = 'khim';
var filesToCache = [
  './',
  './index.html',
  './audio/A2.wav',
  './audio/A3.wav',
  './audio/A4.wav',
  './audio/B2.wav',
  './audio/B3.wav',
  './audio/C3.wav',
  './audio/C4.wav',
  './audio/D3.wav',
  './audio/D4.wav',
  './audio/E3.wav',
  './audio/E4.wav',
  './audio/F3.wav',
  './audio/F4.wav',
  './audio/G3.wav',
  './audio/G4.wav',
  './img/khim.png',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
