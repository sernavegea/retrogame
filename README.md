# MenteRetro

Salón recreativo de los 90 en el navegador. Cada visitante monta sus propias máquinas con sus ROMs, que se quedan guardadas en su navegador, y puede invitar a un amigo a jugar a dobles con un código.

## Publicar en GitHub Pages

1. Crea un repositorio público y sube todo el contenido de esta carpeta: `index.html`, `que-es.html`, `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml`, `README.md`, `LICENSE` y las carpetas `iconos` y `capturas`.
2. En el repositorio, ve a Settings → Pages, elige la rama `main` y la carpeta raíz, y guarda.
3. En un par de minutos la web estará en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

No abras `index.html` con doble clic desde el disco: el guardado y los dobles necesitan servirse por `https`.

## Cómo funciona

- **App instalable:** en Chrome/Edge (Android y ordenador) aparece "Instalar app" arriba a la derecha. En iPhone: Safari → Compartir → Añadir a pantalla de inicio. Al actualizar la web, sube también `sw.js` si cambia y sube el número de `VERSION` que tiene dentro.


- **Máquinas:** cada usuario pulsa "Montar máquina" o la máquina libre, pone el nombre, el sistema, el color y la ROM. Todo se guarda en IndexedDB, en su navegador. La web no sube ni aloja ningún juego.
- **Máquinas de la casa:** juegos propios que ya vienen montados para todos, como *Asfalto Rojo* (carpeta `asfalto-rojo`). No usan el emulador: se abren como una página dentro del mismo iframe. Se declaran en `DE_LA_CASA`, al principio del script de `index.html`. Una moneda arranca la partida y cada moneda de más es un crédito para continuar; al salir, los puntos se rellenan solos. Los que llevan `dobles:true` aceptan un invitado con código como jugador 2: sus botones le llegan al juego por `__ar.entrada()` y lo que ve es el lienzo de `__ar.espejo()`, que lleva los marcadores dibujados.
- **Emulación:** EmulatorJS 4.2.3 desde su CDN, dentro de un iframe por partida. Para cambiar de versión, edita `EJS_DATOS` al principio del script (por ejemplo `https://cdn.emulatorjs.org/stable/data/`).
- **Monedas:** en arcade, cada moneda de 25 que echas entra en el juego como un crédito del jugador 1 (la de 100 da cuatro).
- **Dobles:** el anfitrión pulsa "Invitar a dobles" con la partida en marcha (en pantalla completa, el botón "Dobles" de la barra de arriba) y recibe un código de 6 caracteres. El invitado lo mete en "Unirse a dobles", ve la partida en directo y juega como jugador 2 con los botones en pantalla, el teclado o un mando. El invitado no necesita tener la ROM. La conexión va directa entre navegadores (WebRTC con PeerJS); el servidor gratuito de PeerJS solo se usa para que los dos se encuentren.

### Teclas del invitado

Flechas para moverse, Z = B, X = A, A = Y, S = X, Q = L, W = R, 1 = L2, 2 = R2, Enter = Start, Mayúsculas = Select.

## Limitaciones conocidas

- En dobles, el sonido solo se oye en el navegador del anfitrión.
- En algunas redes muy cerradas (corporativas, ciertos 4G) la conexión directa falla. Se arregla añadiendo un servidor TURN en la configuración de PeerJS.
- Las ROMs de arcade tienen que ser del romset que espera el núcleo (FBNeo o MAME 2003-Plus) y con su nombre original.

## Licencia

GPL-3.0, igual que EmulatorJS y los núcleos de libretro. Ver `LICENSE`.

## Posicionamiento (SEO)

1. **Dirección.** Ahora mismo es `https://sernavegea.github.io/retrogame/` en `index.html`, `que-es.html`, `robots.txt` y `sitemap.xml`. Si pasas a un dominio propio, cámbiala en esos cuatro archivos (terminada en `/`).
2. **Dominio propio (opcional, recomendado).** Cómpralo en cualquier registrador, añade en el DNS los registros que indica GitHub y ponlo en Settings → Pages → Custom domain. Marca "Enforce HTTPS".
3. **Google Search Console.** Entra en search.google.com/search-console, añade la web, verifícala (con dominio propio, por DNS; con github.io, subiendo el archivo HTML que te da Google) y en "Sitemaps" envía `sitemap.xml`.
4. **Comprueba la vista previa** al compartir el enlace por WhatsApp o Telegram: tiene que salir la fachada. Si no sale, revisa el paso 1.
