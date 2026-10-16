// Offline cache: after the first visit the app works with no connection (flight mode is fine).
// Bump VERSION with every change so phones pick up the new files.
const VERSION = "rsd-1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png",
  "vendor/qrcode.min.js", "vendor/jsQR.min.js", "fonts/fonts.css",
  "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-condensed-latin-800-normal.woff2",
  "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-600-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first, so a fresh deploy shows up when online; the cache answers when offline.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html"))));
});
