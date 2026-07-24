/* Sarıçam Melek Taksi — Service Worker */
const CACHE = "melek-taksi-v1";
const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/css/styles.css",
  "/js/main.js",
  "/js/pwa.js",
  "/images/logo-brand.png",
  "/images/favicon.png",
  "/images/pwa/icon-192.png",
  "/images/pwa/icon-512.png",
  "/images/pwa/apple-touch-icon.png",
  "/images/pwa/splash-1080x1920.png",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached || caches.match("/offline.html") || caches.match("/index.html"));

      return cached || network;
    })
  );
});
