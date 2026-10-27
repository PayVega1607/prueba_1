export class Perfume {
  constructor({ id, nombre, categoria, precio, imagen }) {
    Object.assign(this, { id, nombre, categoria, precio, imagen });
  }
  get tienePrecio() { return this.precio != null; }
}
