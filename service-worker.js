const CACHE_NAME = 'tecfaktory-v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/favicon.ico',
	'/style.css',
	'/icons/icon-192.png',
	'/icons/icon-512.png'
];

//install the service worker
self.addEventListener('install',
	event => {
		event.waitUntil(
			caches.open(CACHE_NAME)
				.then(cache =>
					cache.addAll(urlsToCache))
			);
	});

//fetch assets from cache or network 
self.addEventListener('fetch', event
	=>{
		event.respondWith(
			caches.match(event.request)
			.then(response => response || fetch(event.request))
			);
	});

//activate the service worker
self.addEventListener('activate',
	event => {
		const cacheWhiteList = [CACHE_NAME];
		event.waitUntil(
			caches.keys().then(cacheNames => 
				Promise.all(
					cacheNames.map(name => {
						if(!
							cacheWhiteList.includes(name)){
							return
						caches.delete(name);
						}
					})
					)

				)

			);
	});