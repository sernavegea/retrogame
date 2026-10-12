/* Service worker de Asfalto Rojo: guarda el juego entero para que la app instalada abra sin conexión.
   El nombre de la caché cambia con cada versión del juego; al publicar una nueva, se descarga y sustituye a la anterior. */
const VERSION = 'asfalto-rojo-648f21d3f6';
const ARCHIVOS = ["index.html", "models.js", "manifest.webmanifest", "lib/GLTFLoader.js", "lib/SkeletonUtils.js", "lib/three.min.js", "fuentes/barlow-condensed-500-normal.woff2", "fuentes/barlow-condensed-700-italic.woff2", "fuentes/barlow-condensed-700-normal.woff2", "fuentes/barlow-condensed-800-italic.woff2", "fuentes/bungee-400.woff2", "iconos/icono-180.png", "iconos/icono-192.png", "iconos/icono-32.png", "iconos/icono-512.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(['./'].concat(ARCHIVOS).map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(l => Promise.all(l.filter(k => k.startsWith('asfalto-rojo-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(c => c.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }))));
});
