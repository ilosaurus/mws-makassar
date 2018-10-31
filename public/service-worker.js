
(function() {
    'use strict';
    const filesToCache = [
      '/',
      'assets/css/p404.css',
      'assets/images/0.jpeg',
      'assets/images/GDK.png',
      'assets/project4/css/mystyle.css',
      'assets/project4/images/elektro.jpg',
      'assets/project4/images/sipil.jpg',
      'assets/project4/images/rektorat.jpg',
      'assets/project4/images/ruangitcenter.jpg',
      'assets/project4/images/library.jpg',
      'project1/index.html',
      'project2/index.html',
      'project2/add2numbers.js',
      'project3/index.html',
      'project3/grid1.html',
      'project3/grid2.html',
      'project3/grid1-tugas.html',
      'project4/index.html',
      'index.html',
      'offline.html',
      '404.html'
    ];
  
    const staticCacheName = 'mws-project-cache-v1';
  
    self.addEventListener('install', event => {
      console.log('Attempting to install service worker and cache static assets');
      event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
          return cache.addAll(filesToCache);
        })
      );
    });
  
  
    //  intercept network requests
    self.addEventListener('fetch', event => {
      console.log('Fetch event for ', event.request.url);
      event.respondWith(
        caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
          }
          console.log('Network request for ', event.request.url);
          return fetch(event.request).then(response => { //  Add fetched files to the cache
            if (response.status === 404) {  //  Respond with custom 404 page
              console.log(response.status);
              return caches.match('404.html');
            }
            return caches.open(staticCacheName).then(function(cache) {
              if (event.request.url.indexOf('test') < 0) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            });
          });
    
          
    
        }).catch(function(error) {
  
          // Respond with custom offline page
          console.log('Error, ', error);
          return caches.match('offline.html');
        })
      );
    });
  
  
    
    // Delete unused caches
    self.addEventListener('activate', event => {
      console.log('Activating new service worker...');
    
      const cacheWhitelist = [staticCacheName];
    
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
  
  
  })();
  