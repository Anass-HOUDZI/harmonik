// Service worker sécurisé pour Family Suite
const CACHE_VERSION = "v2-suitefamille-secure";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DATA_CACHE = `data-${CACHE_VERSION}`;
const OFFLINE_URL = "/";

// Headers de sécurité appliqués à toutes les réponses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Domaines autorisés pour les requêtes externes
const ALLOWED_ORIGINS = [
  'https://api.unsplash.com',
  'https://images.unsplash.com',
  'https://source.unsplash.com',
  'https://api.openweathermap.org',
  'https://nominatim.openstreetmap.org',
  'https://googleapis.com'
];

const TOOLS_OFFLINE = [
  "/tools/keyword-density",
  "/tools/meta-generator", 
  "/tools/readability-checker",
  "/tools/structured-data-gen",
  "/tools/html-structure-analyzer"
];

// Fichiers à pré-cacher
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json", 
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  ...TOOLS_OFFLINE,
];

// Validation sécurisée des URLs
function isAllowedOrigin(url) {
  try {
    const urlObj = new URL(url);
    
    // Autoriser les requêtes de même origine
    if (urlObj.origin === self.location.origin) {
      return true;
    }
    
    // Vérifier les domaines externes autorisés
    return ALLOWED_ORIGINS.some(allowedOrigin => {
      const allowedUrl = new URL(allowedOrigin);
      return urlObj.origin === allowedUrl.origin;
    });
  } catch (error) {
    console.warn('Invalid URL in security check:', url);
    return false;
  }
}

// Ajouter headers de sécurité à une réponse
function addSecurityHeaders(response) {
  if (!response) return response;
  
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  
  return newResponse;
}

// Installation : cache sécurisé des assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(ASSETS).catch(error => {
        console.error('Failed to cache assets during install:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activation : nettoyage sécurisé des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(key => key !== STATIC_CACHE && key !== DATA_CACHE)
            .map(key => caches.delete(key))
        )
      ),
      // Notifier les clients de la mise à jour
      self.clients.matchAll().then(clients =>
        clients.forEach(client => 
          client.postMessage({ type: 'sw-updated', secure: true })
        )
      )
    ])
  );
  self.clients.claim();
});

// Stratégie de fetch sécurisée
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Validation de sécurité : bloquer les origines non autorisées
  if (!isAllowedOrigin(request.url)) {
    console.warn('Blocked request to unauthorized origin:', request.url);
    event.respondWith(
      new Response('Forbidden', { 
        status: 403,
        headers: SECURITY_HEADERS
      })
    );
    return;
  }
  
  // API externes : network-first avec validation
  if (ALLOWED_ORIGINS.some(origin => request.url.startsWith(origin))) {
    event.respondWith(
      fetch(request, {
        mode: 'cors',
        credentials: 'omit', // Ne pas envoyer de credentials pour les APIs externes
        referrer: 'no-referrer'
      })
        .then(response => {
          if (!response.ok && response.status !== 404) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Backup cache pour certaines réponses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DATA_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          
          return addSecurityHeaders(response);
        })
        .catch(error => {
          console.warn('Network request failed, trying cache:', error);
          return caches.match(request).then(cachedResponse => 
            addSecurityHeaders(cachedResponse)
          );
        })
    );
    return;
  }
  
  // Outils offline : cache-first avec sécurité
  if (TOOLS_OFFLINE.some(tool => url.pathname.startsWith(tool))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return addSecurityHeaders(response);
          }
          
          return fetch(request)
            .then(networkResponse => {
              if (networkResponse.ok) {
                const responseClone = networkResponse.clone();
                caches.open(DATA_CACHE).then(cache => {
                  cache.put(request, responseClone);
                });
              }
              return addSecurityHeaders(networkResponse);
            });
        })
        .catch(error => {
          console.warn('Failed to serve tool page:', error);
          return caches.match(OFFLINE_URL).then(fallback =>
            addSecurityHeaders(fallback)
          );
        })
    );
    return;
  }
  
  // Assets statiques : cache-first
  if (ASSETS.some(asset => url.pathname === asset)) {
    event.respondWith(
      caches.match(request)
        .then(response => 
          addSecurityHeaders(response || fetch(request))
        )
    );
    return;
  }
  
  // Par défaut : network-first avec fallback sécurisé
  event.respondWith(
    fetch(request)
      .then(response => addSecurityHeaders(response))
      .catch(error => {
        console.warn('Network request failed:', error);
        return caches.match(request).then(cachedResponse =>
          addSecurityHeaders(cachedResponse)
        );
      })
  );
});

// Communication sécurisée avec les clients
self.addEventListener('message', event => {
  // Validation de l'origine du message
  if (event.origin && event.origin !== self.location.origin) {
    console.warn('Blocked message from unauthorized origin:', event.origin);
    return;
  }
  
  const { data } = event;
  
  if (typeof data === 'string') {
    if (data === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    return;
  }
  
  if (data && typeof data === 'object') {
    switch (data.type) {
      case 'SECURITY_CHECK':
        // Réponse au check de sécurité
        event.ports[0]?.postMessage({
          type: 'SECURITY_STATUS',
          secure: true,
          timestamp: Date.now(),
          cacheVersion: CACHE_VERSION
        });
        break;
        
      case 'CLEAR_CACHE':
        // Nettoyage sécurisé du cache
        Promise.all([
          caches.delete(STATIC_CACHE),
          caches.delete(DATA_CACHE)
        ]).then(results => {
          event.ports[0]?.postMessage({
            type: 'CACHE_CLEARED',
            success: results.every(Boolean)
          });
        });
        break;
        
      default:
        console.warn('Unknown secure message type:', data.type);
    }
  }
});

// Notifications push sécurisées
self.addEventListener('push', event => {
  // Valider que la notification est autorisée
  if (!self.registration.scope.includes(self.location.origin)) {
    return;
  }
  
  const options = {
    body: event.data ? 
      event.data.text() : 
      'Mise à jour de sécurité disponible',
    icon: '/icon-192.png',
    badge: '/favicon.ico',
    tag: 'family-suite-update',
    renotify: false,
    silent: false
  };
  
  event.waitUntil(
    self.registration.showNotification('Family Suite', options)
  );
});