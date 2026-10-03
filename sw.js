/* Service worker de MenteRetro.
   Guarda la web para que abra aunque no haya conexión.
   Las ROMs no pasan por aquí: están en el navegador de cada usuario (IndexedDB). */
const VERSION = 'menteretro-v8';
const BASICOS = ['./', './index.html', './que-es.html', './manifest.webmanifest', './iconos/icono-192.png', './iconos/icono-512.png', './iconos/apple-touch-icon.png', './iconos/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(BASICOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(l => Promise.all(l.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // el emulador y los dobles van directos a internet
  // Primero la red, para que las actualizaciones lleguen enseguida; si no hay conexión, la copia guardada.
  e.respondWith(
    fetch(new Request(e.request, { cache:'no-cache' })).then(r => {   // no-cache: pregunta siempre a GitHub si hay versión nueva
      if (r.ok) { const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
