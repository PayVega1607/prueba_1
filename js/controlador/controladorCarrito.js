import { Carrito } from '../modelo/carrito.js';
import { pintarCarrito, abrirPanel } from '../vista/vistaCarrito.js';
import { formatoPrecio } from '../utilidades/formatoPrecio.js';

const WHATSAPP = '573148859091'; // número publicado en el sitio de referencia

export function iniciarCarrito(catalogo) {
  const carrito = new Carrito();
  const redibujar = () => {
    pintarCarrito(carrito);
    const lineas = carrito.lista().map((i) => `- ${i.cantidad} x ${i.perfume.nombre} (${formatoPrecio(i.perfume.precio)})`);
    const texto = `Hola, quiero hacer este pedido:\n${lineas.join('\n')}\nTotal: ${formatoPrecio(carrito.total())}`;
    document.getElementById('enviar-pedido').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  };

  // Un solo oyente para todos los botones "Añadir" (aunque las tarjetas se creen después).
  document.getElementById('vista').addEventListener('click', (e) => {
    const id = e.target.closest('button[data-id]')?.dataset.id;
    if (!id) return;
    carrito.agregar(catalogo.porId(id));
    redibujar();
  });
  document.getElementById('lista-carrito').addEventListener('click', (e) => {
    const accion = e.target.dataset.accion;
    const id = e.target.closest('li')?.dataset.id;
    if (!accion || !id) return;
    accion === 'mas' ? carrito.agregar(catalogo.porId(id)) : carrito.quitar(id);
    redibujar();
  });
  document.getElementById('btn-carrito').addEventListener('click', () => abrirPanel(true));
  document.getElementById('cerrar-carrito').addEventListener('click', () => abrirPanel(false));
  document.getElementById('enviar-pedido').addEventListener('click', (e) => {
    if (carrito.cantidadTotal() === 0) e.preventDefault();
  });
  redibujar();
}
