import { Perfume } from './perfume.js';

// Los datos viven en datos/perfumes.json; Destacados es solo una lista de ids (no hay copias).
export class Catalogo {
  perfumes = [];
  idsDestacados = [];

  async cargar() {
    const [lista, ids] = await Promise.all([
      fetch('datos/perfumes.json').then((r) => r.json()),
      fetch('datos/destacados.json').then((r) => r.json()),
    ]);
    this.perfumes = lista.map((p) => new Perfume(p));
    this.idsDestacados = ids;
  }
  porId(id) { return this.perfumes.find((p) => p.id === id); }
  porCategoria(cat) { return this.perfumes.filter((p) => p.categoria === cat); }
  destacados() { return this.idsDestacados.map((id) => this.porId(id)).filter(Boolean); }
  todos() { return this.perfumes; }
}
