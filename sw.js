self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("streetmood-v1").then(cache =>
      cache.addAll([
        "/streetm00d_/",
        "/streetm00d_/style.css",
        "/streetm00d_/script.js",
        "/streetm00d_/products.json"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
