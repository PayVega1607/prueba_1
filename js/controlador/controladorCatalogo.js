import { pintarTarjetas } from '../vista/vistaTarjetas.js';

// Rellena cada <div data-grid="..."> de la vista actual con los perfumes que le tocan.
export function pintarVista(contenedor, catalogo) {
  const fuentes = {
    destacados: () => catalogo.destacados(),
    hombre: () => catalogo.porCategoria('hombre'),
    dama: () => catalogo.porCategoria('dama'),
    catalogo: () => catalogo.todos(),
  };
  contenedor.querySelectorAll('[data-grid]').forEach((grid) => {
    pintarTarjetas(grid, fuentes[grid.dataset.grid]());
  });
}
