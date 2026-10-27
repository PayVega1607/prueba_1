import { pintarVista } from './controladorCatalogo.js';
import { pintarDetalle } from '../vista/vistaDetalle.js';

const RUTAS = ['inicio', 'destacados', 'hombre', 'dama', 'catalogo', 'contacto', 'perfume'];

export function iniciarNavegacion(catalogo) {
  const main = document.getElementById('vista');
  const menu = document.getElementById('menu');
  const botonMenu = document.getElementById('btn-menu');

  async function mostrar() {
    // Formato: #/ruta  o  #/perfume/<id>
    const [rutaHash, idCrudo] = location.hash.replace('#/', '').split('/');
    let ruta = rutaHash;
    if (!RUTAS.includes(ruta)) ruta = 'inicio';
    let idPerfume = null;
    if (ruta === 'perfume') {
      try { idPerfume = decodeURIComponent(idCrudo ?? ''); } catch { idPerfume = ''; }
    }
    try {
      const resp = await fetch(`vistas/${ruta}.html`);
      if (!resp.ok) throw new Error(resp.status);
      main.innerHTML = await resp.text(); // HTML propio del proyecto (carpeta vistas/)
    } catch {
      main.textContent = 'No se pudo cargar la sección. Abre el sitio con un servidor local (ver README).';
      return;
    }
    if (ruta === 'perfume') pintarDetalle(main, catalogo.porId(idPerfume));
    else pintarVista(main, catalogo);
    const rutaMenu = ruta === 'perfume' ? 'catalogo' : ruta;
    menu.querySelectorAll('a').forEach((a) => a.classList.toggle('activo', a.dataset.ruta === rutaMenu));
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
  }

  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });
  window.addEventListener('hashchange', mostrar);
  return mostrar();
}
