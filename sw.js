/* Sarıçam Melek Taksi — Service Worker */
const CACHE = "melek-taksi-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/css/styles.css",
  "/js/main.js",
  "/js/pwa.js",
  "/images/logo-brand.png",
  "/images/favicon.png",
  "/images/pwa/icon-192.png",
  "/images/pwa/icon-512.png",
  "/images/pwa/apple-touch-icon.png",
];

function isHTMLRequest(request) {
  if (request.mode === "navigate") return true;
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function isCacheableResponse(response) {
  return response && response.status === 200 && response.type === "basic";
}

async function precacheAll() {
  const cache = await caches.open(CACHE);
  await Promise.all(
    PRECACHE.map(async (url) => {
      try {
        await cache.add(url);
      } catch (err) {
        /* tek dosya hatası kurulumu bozmasın */
      }
    })
  );
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (isCacheableResponse(response)) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (isHTMLRequest(request)) {
      return (
        (await caches.match("/offline.html")) ||
        (await caches.match("/index.html")) ||
        Response.error()
      );
    }
    throw err;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (isCacheableResponse(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || networkPromise;
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAll().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Service worker ve manifest her zaman ağdan */
  if (url.pathname === "/sw.js" || url.pathname.endsWith(".webmanifest")) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  if (isHTMLRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
