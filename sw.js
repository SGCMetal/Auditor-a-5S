const CACHE = "mps-5s-v1-4-evidencias-qr";
const CORE = ["./", "./index.html", "./styles.css", "./app.js", "./config.js", "./qr-helper.js", "./manifest.webmanifest", "./logo-mps-header.png", "./icon-mps-192.png", "./icon-mps-512.png", "./favicon-mps.png"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.hostname.includes("gstatic.com") || url.hostname.includes("googleapis.com")) return;
  event.respondWith(fetch(event.request).then(response => {
    const clone = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, clone));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html"))));
});
