import { formatoPrecio } from '../utilidades/formatoPrecio.js';

const ETIQUETA_CATEGORIA = { hombre: 'Hombre', dama: 'Dama' };

// Rellena la vista vistas/perfume.html con un perfume. Todo se escribe con textContent / atributos
// (nunca innerHTML), y cada dato vive en su propio elemento. Si el perfume no existe, muestra un aviso.
export function pintarDetalle(contenedor, perfume) {
  const q = (sel) => contenedor.querySelector(sel);
  const contenido = q('[data-contenido]');
  const noEncontrado = q('[data-no-encontrado]');
  const migas = q('.migas');

  if (!perfume) {
    contenido.hidden = true;
    migas.hidden = true;
    noEncontrado.hidden = false;
    document.title = 'Perfume no encontrado — Herrera Perfumes';
    return;
  }

  const categoria = ETIQUETA_CATEGORIA[perfume.categoria] ?? '';
  document.title = `${perfume.nombre} — Herrera Perfumes`;

  q('[data-miga-nombre]').textContent = perfume.nombre;
  q('[data-nombre]').textContent = perfume.nombre;

  const migaCat = q('[data-miga-cat]');
  if (categoria) {
    migaCat.textContent = categoria;
    migaCat.href = `#/${perfume.categoria}`;
    q('[data-categoria]').textContent = categoria;
    q('[data-categoria-titulo]').textContent = `Perfume de ${categoria.toLowerCase()}`;
  } else { // categoría ausente o desconocida: no se muestra nada inventado
    migaCat.hidden = true;
    q('[data-miga-cat-sep]').hidden = true;
    q('[data-miga-cat]').nextElementSibling.hidden = true;
    q('[data-categoria]').closest('div').hidden = true;
    q('[data-categoria-titulo]').hidden = true;
  }

  const img = q('[data-foto]');
  img.src = perfume.imagen;
  img.alt = perfume.nombre;

  const precio = q('[data-precio]');
  precio.textContent = formatoPrecio(perfume.precio);
  precio.classList.toggle('consultar', !perfume.tienePrecio);
  q('[data-nota-precio]').hidden = perfume.tienePrecio;

  // El oyente global de #vista (controladorCarrito) agrega al carrito por data-id.
  const boton = q('[data-agregar]');
  boton.dataset.id = perfume.id;
  let temporizador;
  boton.addEventListener('click', () => {
    boton.textContent = '✓ Añadido';
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { boton.textContent = 'Añadir al carrito'; }, 1500);
  });
}
