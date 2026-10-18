/* Catálogo de espacios publicitarios de Asfalto Rojo.
   Lo usan el juego (dónde va cada espacio), la página de anunciantes (el plano) y la de administración.
   El número de un espacio es «nivel-espacio»: 3-05 es el quinto espacio del nivel 3, contando de izquierda a derecha.
   Lo que cambia (libre u ocupado, el negocio, la imagen, la fecha de fin y los precios) no está aquí sino en anuncios/anuncios.json. */
var ESPACIOS = (function(){
  var NIVELES = ['El barrio', 'El centro', 'El polígono', 'El desguace', 'El puerto', 'El paseo marítimo', 'El mercado', 'Las vías', 'La zona de copas', 'Las torres'];
  var LOCALES = ['Dobletinta', 'Peluquería Tijeras', 'SoulBody', 'Casino del Chatarrero', 'La lonja', 'Chiringuito Las Olas', 'Estudio Aguja Negra', 'Taller El Grasas', 'Discoteca Ritmo', 'Ático de la Torre Roja'];
  var TIPOS = {
    fachada: { nombre: 'Fachada en la calle', ancho: 1200, alto: 800, pide: 'Foto de frente de la fachada, en horizontal (3:2).' },
    valla: { nombre: 'Valla publicitaria', ancho: 1200, alto: 600, pide: 'Cartel o logotipo en horizontal (2:1).' },
    jefe: { nombre: 'Local del jefe', ancho: 1200, alto: 900, pide: 'Foto de frente de la fachada (4:3). Dentro del local se ve la misma imagen en un cartel.' }
  };
  // posición en metros a lo largo de la calle (x) y ancho (w); el local del jefe es la puerta del final y la sala de dentro
  var SITIOS = [
    { n: 1, tipo: 'fachada', x: 4.4, w: 10, donde: 'La primera fachada, justo donde empieza el nivel' },
    { n: 2, tipo: 'fachada', x: 18, w: 9, donde: 'Fachada en la primera pelea' },
    { n: 3, tipo: 'valla', x: 31, w: 5.2, donde: 'Valla de la primera pelea' },
    { n: 4, tipo: 'fachada', x: 44, w: 9, donde: 'Fachada en la segunda pelea' },
    { n: 5, tipo: 'valla', x: 57, w: 5.2, donde: 'Valla entre la segunda y la tercera pelea' },
    { n: 6, tipo: 'valla', x: 73, w: 5.2, donde: 'Valla de la tercera pelea, antes del local' },
    { n: 7, tipo: 'jefe', x: 86, w: 8, donde: 'La puerta del final y la sala de la pelea contra el jefe' }
  ];
  // los que ya están hechos a mano en el juego, a partir de fotos
  var FIJOS = { '1-01': 'Dimpresión · Dosmares', '1-07': 'Dobletinta', '3-07': 'SoulBody' };
  var lista = [];
  NIVELES.forEach(function(nombre, i){ SITIOS.forEach(function(s){
    var id = (i + 1) + '-' + (s.n < 10 ? '0' : '') + s.n;
    lista.push({ id: id, nivel: i + 1, nombreNivel: nombre, n: s.n, tipo: s.tipo, x: s.x, w: s.w, donde: s.tipo === 'jefe' ? LOCALES[i] + ': ' + s.donde.toLowerCase() : s.donde, fijo: FIJOS[id] || '' });
  }); });
  // el estado de partida, antes de que haya un anuncios.json publicado
  function inicial(){ var e = {}; lista.forEach(function(s){ e[s.id] = s.fijo ? { estado: 'ocupado', negocio: s.fijo } : { estado: 'libre' }; });
    return { version: 1, actualizado: '', precios: { fachada: {}, valla: {}, jefe: {} }, espacios: e }; }
  // ¿se ve en el juego ahora? ocupado y sin fecha de fin pasada
  function activo(e, hoy){ return !!e && e.estado === 'ocupado' && (!e.hasta || e.hasta >= (hoy || new Date().toISOString().slice(0, 10))); }
  return { NIVELES: NIVELES, LOCALES: LOCALES, TIPOS: TIPOS, lista: lista, inicial: inicial, activo: activo, porId: function(id){ for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i]; return null; } };
})();
if (typeof window !== 'undefined') window.ESPACIOS = ESPACIOS;
