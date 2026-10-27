import { formatoPrecio } from '../utilidades/formatoPrecio.js';

const $ = (id) => document.getElementById(id);

export function pintarCarrito(carrito) {
  const plantilla = $('tpl-item-carrito');
  const frag = document.createDocumentFragment();
  for (const { perfume, cantidad } of carrito.lista()) {
    const t = plantilla.content.cloneNode(true);
    const li = t.querySelector('li');
    li.dataset.id = perfume.id;
    t.querySelector('img').src = perfume.imagen;
    t.querySelector('.item-nombre').textContent = perfume.nombre;
    t.querySelector('.item-precio').textContent = formatoPrecio(perfume.precio);
    t.querySelector('.item-cant span').textContent = cantidad;
    frag.append(t);
  }
  $('lista-carrito').replaceChildren(frag);
  $('contador').textContent = carrito.cantidadTotal();
  $('total-carrito').textContent = formatoPrecio(carrito.total());
  $('carrito-vacio').hidden = carrito.cantidadTotal() > 0;
  $('nota-consultar').hidden = !carrito.hayPorConsultar();
  $('enviar-pedido').classList.toggle('desactivado', carrito.cantidadTotal() === 0);
}

export function abrirPanel(abierto) {
  $('panel-carrito').classList.toggle('abierto', abierto);
  $('panel-carrito').setAttribute('aria-hidden', String(!abierto));
}
