/* Service worker de Recreativos Galaxia.
   Guarda la web para que abra aunque no haya conexión.
   Las ROMs no pasan por aquí: están en el navegador de cada usuario (IndexedDB). */
const VERSION = 'recreativos-v1';
const BASICOS = ['./', './index.html', './manifest.webmanifest', './iconos/icono-192.png', './iconos/icono-512.png', './iconos/apple-touch-icon.png', './iconos/favicon-32.png'];

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
    fetch(e.request).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
