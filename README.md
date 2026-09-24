# Proyecto Web Ecommerce

E-commerce desarrollado para Laboratorio de aplicaciones web cliente.

## Stack
HTML5, CSS3 (vanilla, sin frameworks), JavaScript ES6 (módulos, Fetch, localStorage).
API de productos: fakestoreapi.com

## Cómo correrlo
Clonar el repo y abrir `index.html` con Live Server (los módulos ES6
requieren servirse por HTTP, no funcionan con file://).

## Funcionalidades
1. Listado de productos consumidos de la API, mostrados en cards.
2. Modal de detalle por producto: título, precio y descripción.
3. El modal se cierra con la 'X' o al agregar el producto al carrito, regresando al listado.
4. Al agregar un producto se persiste en localStorage y se muestra un mensaje de confirmación al usuario.
5. Ícono de carrito en la barra de navegación, con badge que indica la cantidad total de unidades en el carrito (no la cantidad de productos distintos).
6. Sidebar del carrito con, por cada producto: imagen, título, botones (-)/(+), cantidad, botón eliminar y precio final según la cantidad. El botón (-) se deshabilita en cantidad 1 y se rehabilita al superarla. Toda acción actualiza el localStorage.
7. Botón "Finalizar compra": vacía el carrito, limpia el localStorage y muestra un mensaje de confirmación.
8. Botón "Vaciar carrito": elimina todos los productos y limpia el localStorage.
9. Los botones de finalizar compra y vaciar carrito quedan deshabilitados cuando el carrito está vacío.
10. Buscador de productos por título.
11. Navegación por categorías, combinada con el buscador (ambos filtros se aplican en simultáneo).

## Integrantes y desarrollo

### Kerbs Gonzalo — [@sbrekdev](https://github.com/sbrekdev)
Catalogo de productos: consumo de la API, render de las cards y los estados de
carga y vacio. Modal de detalle con sus acciones de cierre (X, backdrop, Escape y agregar al carrito).
Navegacion por categorias derivada de la lista en memoria.
Estilos de catalogo y modal, y, en la fase de pulido cruzado, el responsive del carrito y del buscador.

### Gonzalvez Marcos — [@makuharg](https://github.com/makuharg)
Carrito de compras: gestión de estado y persistencia en localStorage,
badge de unidades, sidebar con controles de cantidad, botones de
finalizar compra y vaciar carrito. Buscador de productos, integrado
con el filtro de categorías mediante eventos cruzados.

### Trabajo conjunto
Estructura HTML, sistema de diseño (variables de color, tipografía
y espaciado), layout de header/nav/footer y grid base. Revisión
cruzada de responsive en el Bloque 4: Marcos ajustó el catálogo y
el modal (nav de categorías y centrado del modal en mobile), Gonzalo
ajustó el carrito.

## Flujo de trabajo

Ver [CONTRIBUTING.md](CONTRIBUTING.md).
