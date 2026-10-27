// Guarda { perfume, cantidad } por id. Los precios "Consultar" no suman al total.
export class Carrito {
  items = new Map();
  agregar(perfume) {
    const it = this.items.get(perfume.id) ?? { perfume, cantidad: 0 };
    it.cantidad++;
    this.items.set(perfume.id, it);
  }
  quitar(id) {
    const it = this.items.get(id);
    if (!it) return;
    if (--it.cantidad <= 0) this.items.delete(id);
  }
  lista() { return [...this.items.values()]; }
  cantidadTotal() { return this.lista().reduce((n, i) => n + i.cantidad, 0); }
  total() { return this.lista().reduce((s, i) => s + (i.perfume.precio ?? 0) * i.cantidad, 0); }
  hayPorConsultar() { return this.lista().some((i) => !i.perfume.tienePrecio); }
}
