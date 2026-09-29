# Recreativos Galaxia

Salón recreativo de los 90 en el navegador. Cada visitante monta sus propias máquinas con sus ROMs, que se quedan guardadas en su navegador, y puede invitar a un amigo a jugar a dobles con un código.

## Publicar en GitHub Pages

1. Crea un repositorio público y sube `index.html`, `README.md` y `LICENSE`.
2. En el repositorio, ve a Settings → Pages, elige la rama `main` y la carpeta raíz, y guarda.
3. En un par de minutos la web estará en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

No abras `index.html` con doble clic desde el disco: el guardado y los dobles necesitan servirse por `https`.

## Cómo funciona

- **Máquinas:** cada usuario pulsa "Montar máquina" o la máquina libre, pone el nombre, el sistema, el color y la ROM. Todo se guarda en IndexedDB, en su navegador. La web no sube ni aloja ningún juego.
- **Emulación:** EmulatorJS 4.2.3 desde su CDN, dentro de un iframe por partida. Para cambiar de versión, edita `EJS_DATOS` al principio del script (por ejemplo `https://cdn.emulatorjs.org/stable/data/`).
- **Monedas:** en arcade, cada moneda de 25 que echas entra en el juego como un crédito del jugador 1 (la de 100 da cuatro).
- **Dobles:** el anfitrión pulsa "Invitar a dobles" con la partida en marcha y recibe un código de 6 caracteres. El invitado lo mete en "Unirse a dobles", ve la partida en directo y juega como jugador 2 con los botones en pantalla, el teclado o un mando. El invitado no necesita tener la ROM. La conexión va directa entre navegadores (WebRTC con PeerJS); el servidor gratuito de PeerJS solo se usa para que los dos se encuentren.

### Teclas del invitado

Flechas para moverse, Z = B, X = A, A = Y, S = X, Q = L, W = R, Enter = Start, Mayúsculas = Select.

## Limitaciones conocidas

- En dobles, el sonido solo se oye en el navegador del anfitrión.
- En algunas redes muy cerradas (corporativas, ciertos 4G) la conexión directa falla. Se arregla añadiendo un servidor TURN en la configuración de PeerJS.
- Las ROMs de arcade tienen que ser del romset que espera el núcleo (FBNeo o MAME 2003-Plus) y con su nombre original.

## Licencia

GPL-3.0, igual que EmulatorJS y los núcleos de libretro. Ver `LICENSE`.
