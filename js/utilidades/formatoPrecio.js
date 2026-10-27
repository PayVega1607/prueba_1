// Convierte 110000 en "$110.000"; si no hay precio, "Consultar precio".
export const formatoPrecio = (precio) =>
  precio == null ? 'Consultar precio' : '$' + precio.toLocaleString('es-CO');
