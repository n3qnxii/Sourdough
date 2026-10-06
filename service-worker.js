const CACHE_NAME = "sourdough-pos-v8-12";

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./login-logo-transparent.png",
  "./assets/branding/login-bg.png",
  "./assets/branding/logo.png",
  "./assets/branding/shop-logo-transparent.png",
  "./assets/classic.svg",
  "./assets/wholewheat.svg",
  "./assets/multigrain.svg",
  "./assets/sesame.svg",
  "./assets/cranberry.svg",
  "./assets/walnut.svg",
  "./assets/milk.svg",
  "./assets/wheatbread.svg",
  "./assets/nosugar.svg",
  "./assets/brownie.svg",
  "./assets/buttercookie.svg",
  "./assets/graincookie.svg",
  "./assets/fries.svg",
  "./assets/staff/avatar-owner.svg",
  "./assets/staff/avatar-staff1.svg",
  "./assets/staff/avatar-staff2.svg",
  "./assets/staff/avatar-staff3.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const url = new URL(request.url);

  // Keep page navigation fresh so GitHub Pages updates are picked up quickly.
  if (request.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("./index.html")),
        ),
    );
    return;
  }

  // Code files are network-first so GitHub Pages receives hotfixes immediately.
  if (url.pathname.endsWith("/app.js") || url.pathname.endsWith("/style.css")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok && url.origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
