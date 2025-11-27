const CACHE_NAME = 'retro-tv-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. 安装 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. 拦截网络请求 (离线优先策略)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存里有，直接返回缓存
        if (response) {
          return response;
        }
        // 如果缓存没有，去网络请求
        return fetch(event.request);
      })
  );
});

// 3. 更新 Service Worker (清理旧缓存)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});
