
const CACHE_VERSION = "v2-suitefamille";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DATA_CACHE = `data-${CACHE_VERSION}`;
const OFFLINE_URL = "/";
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

// Install : cache les assets de base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      cache.addAll(ASSETS)
    )
  );
  self.skipWaiting();
});

// Activate : clean anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== STATIC_CACHE && key !== DATA_CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy (cache-first offline tools, network-first for APIs)
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // API externe : toujours network-first
  if (/api\.openweathermap\.org|openstreetmap|nominatim|googleapis/.test(url.href)) {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          // backup cache pour certains flux
          const respClone = resp.clone();
          caches.open(DATA_CACHE).then(cache => {
            cache.put(event.request, respClone);
          });
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Données analytiques/offline tools : cache-first
  if (TOOLS_OFFLINE.some(t => url.pathname.startsWith(t))) {
    event.respondWith(
      caches.match(event.request)
        .then(response =>
          response ||
          fetch(event.request).then(resp => {
            // update le cache outils
            caches.open(DATA_CACHE).then(cache => {
              cache.put(event.request, resp.clone());
            });
            return resp;
          })
        )
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Assets du site (html/css/js/icon…) : cache-first
  if (ASSETS.some(asset => url.pathname === asset)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
    return;
  }

  // Par défaut network-first avec fallback offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Update automatique et notification nouvelle version
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener("push", event => {
  const options = {
    body: event.data ? event.data.text() : "Nouvelle version ou donnée prête hors-ligne !",
    icon: "/icon-192.png",
    badge: "/favicon.ico"
  };
  event.waitUntil(
    self.registration.showNotification("Harmonik", options)
  );
});

// Broadcast quand nouvel SW activé
self.addEventListener("activate", event => {
  event.waitUntil(
    self.clients.matchAll().then(clients =>
      clients.forEach(client => client.postMessage("sw-updated"))
    )
  );
});
