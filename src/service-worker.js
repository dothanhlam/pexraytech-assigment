const CACHE_NAME = 'lamdo-app-test';
const CACHE_FILES = [
    '/',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'];


self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(CACHE_FILES);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request)
          .then(function(response) {
            return response || fetchAndCache(event.request);
          })
  );
});

function fetchAndCache(url) {
  return fetch(url)
      .then(function(response) {
        // Check if we received a valid response
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(url, response.clone());
              return response;
            });
      })
      .catch(function(error) {
        console.log('Request failed:', error);
        // You could return a custom offline 404 page here
      });
}