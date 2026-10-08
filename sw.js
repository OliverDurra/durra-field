// Durra Field service worker: cache-first, so the app opens with no network.
const CACHE = "durra-field-63ff12b2f8d4";
const FILES = ["./", "index.html", "app.js", "manifest.webmanifest", "icon.svg"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // reports to the globe go straight to the network
  e.respondWith(caches.match(e.request).then((hit) => hit ?? fetch(e.request)));
});
