# Perfumería Herrera — sitio web (HTML + CSS + JavaScript puro, patrón MVC)

Catálogo con Inicio, Destacados, Hombre, Dama, Catálogo general, Contacto y un carrito que envía el pedido por WhatsApp.
Sin frameworks ni librerías. Productos, precios y fotos salen de los dos PDF del catálogo.

## Cómo ejecutarlo
El sitio carga archivos con `fetch` y módulos ES6, así que **no funciona con doble clic (`file://`)**. Usa un servidor local, dentro de esta carpeta:

    python3 -m http.server 8000      (o: npx serve)

y abre http://localhost:8000.

**Más fácil:** haz doble clic en `iniciar.bat` (Windows) o `iniciar.command` (Mac/Linux); abren el servidor y el navegador solos (necesitan Python instalado). Si abres `index.html` con doble clic, la página mostrará un aviso en lugar del catálogo. En VS Code también sirve la extensión "Live Server".
Las tipografías vienen de Google Fonts (necesitan internet; sin ellas se usan tipos de respaldo).

## Cómo está organizado (MVC explicado simple)
Piensa en un restaurante: el **Modelo** es la cocina (los datos), la **Vista** es la mesa servida (lo que se ve) y el **Controlador** es el mesero (lleva pedidos entre ambos).

| Carpeta / archivo | Para qué sirve |
|---|---|
| `servidor.py`, `iniciar.bat`, `iniciar.command` | Arrancan el servidor local con un clic |
| `index.html` | Cabecera, menú, pie, panel del carrito y las *plantillas* de tarjeta (`<template>`) |
| `vistas/*.html` | Una sección por archivo (inicio, destacados, hombre, dama, catalogo, contacto) |
| `datos/perfumes.json` | **Todos los perfumes** (nombre, categoría, precio, imagen). Es la única fuente de datos |
| `datos/destacados.json` | Lista de `id` de los perfumes destacados (no copia productos) |
| `css/` | `estilos.css` (base), `componentes.css` (tarjetas, botones, carrito), `responsive.css` (móvil/tableta) |
| `js/modelo/` | `perfume.js`, `catalogo.js` (lee y consulta los datos), `carrito.js` |
| `js/vista/` | `vistaTarjetas.js` y `vistaCarrito.js`: clonan las plantillas y rellenan textos |
| `js/controlador/` | `controladorNavegacion.js` (menú y secciones), `controladorCatalogo.js`, `controladorCarrito.js` |
| `js/utilidades/formatoPrecio.js` | Convierte `110000` en `$110.000` ("Consultar precio" si no hay precio) |
| `assets/imagenes/perfumes/` | Una foto por perfume (el nombre del archivo es el `id`) |

## Cómo cambiar cosas
- **Agregar un perfume:** copia la foto a `assets/imagenes/perfumes/` y agrega un bloque en `datos/perfumes.json`:
  `{ "id": "h-nuevo-perfume", "nombre": "Nuevo Perfume", "categoria": "hombre", "precio": 90000, "imagen": "assets/imagenes/perfumes/h-nuevo-perfume.jpg" }`
  (`categoria` es `hombre` o `dama`; el `id` no se puede repetir; sin precio usa `"precio": null`).
- **Cambiar un precio:** en `datos/perfumes.json`, edita el número (sin puntos) de ese perfume.
- **Cambiar una imagen:** reemplaza el archivo en `assets/imagenes/perfumes/` (mismo nombre) o cambia el campo `imagen`.
- **Modificar Destacados:** edita `datos/destacados.json`; pon los `id` de los perfumes que quieras (6 a 8 es lo ideal).
- **Agregar una sección nueva:** (1) crea `vistas/mi-seccion.html`; (2) agrega `'mi-seccion'` a `RUTAS` en `js/controlador/controladorNavegacion.js`; (3) agrega un enlace `<a href="#/mi-seccion" data-ruta="mi-seccion">` en el menú de `index.html`. Si muestra perfumes, pon `<div class="grilla" data-grid="hombre"></div>` (valores: `destacados`, `hombre`, `dama`, `catalogo`).
- **Cambiar el número de WhatsApp:** constante `WHATSAPP` en `js/controlador/controladorCarrito.js` y el enlace de `vistas/contacto.html`.
- **Colores y tipografías:** variables al inicio de `css/estilos.css`.

## Notas sobre los datos del PDF
Ver el informe de entrega: algunos puntos del catálogo necesitan tu confirmación (tarjetas duplicadas, nombres que no coinciden con la foto, descripciones).
