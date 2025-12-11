# Proyecto-final-
# Catálogo de Amigurumis Pastel

## Descripción del Proyecto

Este proyecto es un catálogo web moderno y responsivo dedicado a la venta de adorables **amigurumis** (muñecos de crochet tejidos a mano). La aplicación está construida utilizando **HTML5**, **CSS3** y **JavaScript** Para implementar una experiencia de usuario interactiva y un carrito de compras dinámico con persistencia de datos.

El diseño sigue una paleta de colores **celeste y lila pastel**, creando un ambiente dulce y acogedor, como se solicitó.

## Funcionalidades Implementadas

El proyecto cumple con todas las especificaciones solicitadas, destacando las siguientes características:

### Diseño y Estilos (CSS)

* **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio) mediante Media Queries.
* **Grid Layout:** La sección de **Reseñas** (`#reseñas`) utiliza CSS Grid para una distribución lógica y estética. 
* **Flexbox:** La sección de **Productos** (`#catalogo`) utiliza Flexbox para organizar las tarjetas de manera flexible y responsiva.

### Interactividad (JavaScript)

* **DOM Manipulation:** Manejo de eventos y actualización de elementos en tiempo real.
* **Fetch API (Simulada):** Los productos son inyectados dinámicamente en el HTML a través de JavaScript, simulando la obtención de datos de una API.
* **Formulario de Contacto Funcional:**
    * Implementa **validación de campos** (requeridos y formato de email).
    * Envío de datos mediante la integración con **Formspree**.

### Carrito de Compras Dinámico

* **Agregar Producto:** Los usuarios pueden añadir productos al carrito.
* **Contador Dinámico:** El número total de productos se actualiza en tiempo real en el encabezado.
* **Edición y Eliminación:** El usuario puede **editar la cantidad** de cada ítem o **eliminarlo** directamente desde el sidebar del carrito.
* **Total Dinámico:** El costo total de la compra se recalcula automáticamente con cada modificación.
* **Persistencia de Datos:** El estado del carrito de compras se guarda en **`localStorage`**, asegurando que los productos no se pierdan al actualizar o cerrar la página. 

### Accesibilidad y SEO

* **Accesibilidad:** Uso de atributos `alt` en imágenes y atributos ARIA para mejorar la navegación con teclado.
* **SEO Básico:** Uso de metaetiquetas (`description`, `keywords`) en el `head` del HTML.

