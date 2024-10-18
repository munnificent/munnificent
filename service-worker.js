
// service-worker.js

const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/project.html',
    '/css/reset.css',
    '/css/style.css',
    '/js/main.js',
    '/js/game.js',
    '/assets/images/profile.jpg',
    '/assets/images/background.jpg',
    '/assets/images/profile.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Открыт кэш');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Кэш найден - возвращаем из кэша
                if (response) {
                    return response;
                }
                // Кэш не найден - запрашиваем из сети
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Удаляем устаревший кэш
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
