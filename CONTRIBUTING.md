# Guía de trabajo — Proyecto web E-commerce

Documento de coordinación para los dos integrantes del grupo. Se lee **completo antes de escribir la primera línea de código**.

Repo: `https://github.com/Makuharg/Proyecto-web-E-commerce`

---

## 1. El principio: no se reparten funcionalidades, se reparten archivos

La causa del 90% de los conflictos en un proyecto vanilla de dos personas es que los dos editan `index.html` y `styles.css`. No importa qué tan bien se dividan las tareas: si ambos abren el mismo archivo, Git va a pedir resolver conflictos en cada merge.

La solución tiene tres partes:

1. **Un solo `index.html`, congelado en la fase 0.** Lo escriben juntos, con todos los contenedores vacíos y sus `id` definidos. Después nadie lo toca salvo acuerdo explícito.
2. **CSS partido por componente.** Nadie escribe en el CSS del otro. Las media queries de cada componente van dentro de su propio archivo, no en un `responsive.css` compartido.
3. **JS con módulos ES6.** Un archivo por responsabilidad, con `import`/`export`. Cada uno trabaja en sus archivos y nunca abre los del otro.

Con esto, dos ramas paralelas casi nunca tocan las mismas líneas y los merges son automáticos.

---

## 2. Estructura de archivos y dueño de cada uno

```
/
├─ index.html              FASE 0 — congelado
├─ README.md               FASE 0 + cierre
├─ CONTRIBUTING.md         este archivo
├─ .gitignore              FASE 0
├─ assets/
│  └─ img/                 logo, favicon, placeholder
├─ css/
│  ├─ base.css             FASE 0  reset, variables, tipografía
│  ├─ layout.css           FASE 0  header, nav, footer, grid
│  ├─ catalog.css          → A
│  ├─ modal.css            → A
│  ├─ search.css           → B
│  └─ cart.css             → B
└─ js/
   ├─ main.js              FASE 0  orquestador
   ├─ storage.js           FASE 0  wrapper de localStorage
   ├─ notify.js            FASE 0  mensajes al usuario
   ├─ api.js               → A
   ├─ catalog.js           → A
   ├─ modal.js             → A
   ├─ search.js            → B
   ├─ categories.js        → A
   ├─ cart.js              → B  estado del carrito
   └─ cart-ui.js           → B  render del sidebar y el badge
```

**Regla dura: nadie edita un archivo que no es suyo.** Si necesitás un cambio en un archivo del otro, se lo pedís por WhatsApp y lo hace él en su rama. Cuesta cinco minutos y ahorra una hora de merge.

Los archivos de FASE 0 se tocan solo de a dos, en la misma sesión, en una rama compartida.

---

## 3. Fase 0: el esqueleto (juntos, en una sola sesión)

Es la parte más importante. Hasta que esto no esté en `main` y exista la rama `develop`, nadie abre una rama de feature.

### 3.1 Inicializar

```bash
git clone https://github.com/Makuharg/Proyecto-web-E-commerce.git
cd Proyecto-web-E-commerce
```

### 3.2 `.gitignore`

```
.DS_Store
Thumbs.db
.vscode/
node_modules/
*.log
```

### 3.3 `index.html` congelado

Este archivo define el **contrato del DOM**: los `id` que van acá son los que ambos van a usar desde JS. Si un `id` cambia después, se rompe el código del otro.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nombre de la tienda</title>

  <!-- Todos los links declarados desde el día 1, aunque el archivo esté vacío.
       El orden define la cascada: no reordenar. -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/catalog.css">
  <link rel="stylesheet" href="css/modal.css">
  <link rel="stylesheet" href="css/search.css">
  <link rel="stylesheet" href="css/cart.css">
</head>
<body>

  <header>
    <nav>
      <a href="#" class="logo">Tienda</a>

      <!-- A: buscador -->
      <div id="search-container"></div>

      <!-- A: categorías -->
      <ul id="category-nav"></ul>

      <!-- B: ícono de carrito + badge -->
      <button id="cart-toggle" aria-label="Abrir carrito">
        <span id="cart-badge" hidden>0</span>
      </button>
    </nav>
  </header>

  <main>
    <!-- A: grilla de cards -->
    <section id="product-grid" aria-live="polite"></section>

    <!-- A: estados de carga y vacío -->
    <div id="loader" hidden></div>
    <div id="empty-state" hidden></div>
  </main>

  <!-- A: modal de detalle -->
  <div id="product-modal" hidden></div>

  <!-- B: sidebar del carrito -->
  <aside id="cart-sidebar" hidden></aside>
  <div id="overlay" hidden></div>

  <footer>
    <p>&copy; 2026 — TP Laboratorio de aplicaciones web cliente</p>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>
```

> `type="module"` es lo que permite dividir el JS en archivos independientes. Requiere servir por HTTP: usen la extensión **Live Server** de VS Code, no abran el `index.html` con doble clic (`file://` bloquea los módulos).

### 3.4 Los stubs de contrato

Acá está el truco que permite trabajar en paralelo desde el primer día. **A** necesita llamar al carrito desde el modal, pero **B** todavía no lo escribió. Se crean los stubs vacíos con la firma final acordada, y cada uno los rellena después.

`js/storage.js` — FASE 0, nadie lo toca más:

```js
const KEY = 'cart';

export function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function clear() {
  localStorage.removeItem(KEY);
}
```

`js/notify.js` — FASE 0. Los mensajes al usuario son requisito del TP (puntos 4 y 7), y los usan los dos:

```js
export function notify(message, type = 'success') {
  // Implementación temporal. Se reemplaza por SweetAlert2 en la fase 0.
  console.log(`[${type}] ${message}`);
}
```

`js/cart.js` — lo escribe **B**, pero el stub se crea en fase 0 para que **A** pueda importarlo:

```js
export function addToCart(product) {}
export function removeFromCart(id) {}
export function increase(id) {}
export function decrease(id) {}
export function clearCart() {}
export function getItems() { return []; }
export function getTotalUnits() { return 0; }
```

`js/main.js` — FASE 0. Solo arranca los módulos, no tiene lógica propia:

```js
import { initCatalog } from './catalog.js';
import { initCartUI } from './cart-ui.js';

initCatalog();
initCartUI();
```

Cada uno exporta su `init*` y no toca `main.js` de nuevo.

### 3.5 Confirmar la API

Antes de repartir, prueben en el navegador que la API responde y qué forma tienen los datos:

```
https://fakestoreapi.com/products
https://fakestoreapi.com/products/categories
https://fakestoreapi.com/products/category/electronics
```

El campo que sale de acá (`id`, `title`, `price`, `description`, `image`, `category`) es el que va a viajar entre el catálogo y el carrito. Anótenlo, porque es la otra mitad del contrato.

### 3.6 Cerrar la fase 0 y crear `develop`

```bash
git add .
git commit -m "chore: scaffold project structure and module contracts"
git push origin main

# De main sale develop, que es donde se integra todo el trabajo
git checkout -b develop
git push -u origin develop
```

Después de este push, **nadie vuelve a commitear directo ni en `main` ni en `develop`**. Todo entra por PR.

### 3.7 Configurar el repo en GitHub

Tres ajustes de cinco minutos que evitan errores caros:

**a) Poner `develop` como rama por defecto.**
Settings → General → Default branch → cambiar a `develop`.

Sin esto, cada PR que abras viene con la base en `main` y hay que cambiarla a mano en el dropdown. Alcanza con olvidarse una vez para mergear una funcionalidad a medio hacer directo a `main`.

> En la entrega vuelven a poner `main` como default, así el instructor entra y ve la versión final.

**b) Proteger `main`.**
Settings → Branches → Add branch protection rule → nombre `main` → tildar *Require a pull request before merging*.

**c) Agregar al colaborador.**
Settings → Collaborators → Add people.

---

## 4. Reparto de funcionalidades

Los números refieren a los requisitos del enunciado.

El reparto está balanceado en **archivos y en cantidad de PRs**, no solo en cantidad de requisitos. La nota es individual y sale de los commits, así que los dos tienen que terminar con un historial parecido en volumen y repartido en el tiempo.

### Integrante A — Catálogo

| Req | Funcionalidad | Ramas |
|---|---|---|
| 1 | Fetch de la API y render de cards | `feat/fetch-products`, `feat/product-grid` |
| 2, 3 | Modal de detalle, cierre por X y por "agregar al carrito" | `feat/product-modal`, `feat/modal-close-actions` |
| 11 | Navegación por categorías | `feat/category-filter` |
| — | Loader y estado vacío del catálogo | `feat/loading-states` |

Archivos: `api.js`, `catalog.js`, `modal.js`, `categories.js`, `catalog.css`, `modal.css`.

### Integrante B — Carrito y buscador

| Req | Funcionalidad | Ramas |
|---|---|---|
| 4 | Agregar al carrito + persistencia en localStorage | `feat/cart-state`, `feat/add-to-cart` |
| 5 | Ícono en la nav y badge con unidades totales | `feat/cart-badge` |
| 6 | Sidebar con imagen, título, −, cantidad, +, eliminar, subtotal | `feat/cart-sidebar`, `feat/quantity-controls` |
| 10 | Buscador con filtro en vivo | `feat/product-search` |
| 7 | Botón finalizar compra | `feat/checkout-flow` |
| 8 | Botón vaciar carrito | `feat/clear-cart` |
| 9 | Botones deshabilitados con carrito vacío | `feat/empty-cart-state` |

Archivos: `cart.js`, `cart-ui.js`, `search.js`, `cart.css`, `search.css`.

> **Por qué el buscador va con el carrito.** El carrito es una sola funcionalidad grande concentrada en `cart-ui.js`; el catálogo son cuatro funcionalidades que se parten solas en ramas chicas. Sin este ajuste, B trabaja lo mismo pero muestra la mitad de commits. `search.js` no toca ningún archivo de A: filtra el array en memoria y llama a `renderProducts()`, que ya está en el contrato.

**B: no hagas el carrito en una sola rama.** Es la trampa más fácil de este reparto. Siete ramas, siete PRs. Una rama de dos semanas es un merge imposible y un solo commit gigante en el historial.

### Lo compartido

`base.css` y `layout.css` (header, nav, footer, variables de color y tipografía) se hacen **juntos en la fase 0**. Son el punto de conflicto más probable si se dejan para después, y además el enunciado pide consistencia visual en toda la app.

El commit del esqueleto lo pushea uno solo, pero lo hicieron los dos. Va con co-autoría:

```
chore: scaffold project structure and module contracts

Co-authored-by: Nombre <mail-de-github@ejemplo.com>
```

Sin eso, todo el trabajo conjunto queda atribuido a una sola persona.

### Fase de pulido cruzado (últimos días)

Cuando el desarrollo paralelo termina y ya no hay riesgo de pisarse, **cada uno hace el responsive del archivo del otro**:

| Rama | Quién | Qué |
|---|---|---|
| `style/responsive-cart` | A | media queries de `cart.css` y `search.css` |
| `style/responsive-catalog` | B | media queries de `catalog.css` y `modal.css` |

Sirve para dos cosas. Cubre el requisito de responsive sin que quede para la última noche, y hace que los dos tengan commits en las dos mitades del proyecto, así el historial no se lee como "yo hice esta mitad y él la otra".

Es la única excepción a la regla de no tocar archivos ajenos, y solo aplica en esta fase, cuando el otro ya no tiene ramas abiertas sobre ese archivo.

---

## 5. Las tres ramas

```
main         solo versiones que funcionan. Es lo que ve el instructor.
develop      integración. Acá se juntan todas las funcionalidades.
feat/...     una por funcionalidad. Corta, se borra al mergear.
```

Las funcionalidades **nunca** salen de `main` ni entran a `main` directo. Salen de `develop` y vuelven a `develop`.

### Ciclo día a día

Siempre el mismo, sin excepciones:

```bash
# 1. Partir de develop actualizado
git checkout develop
git pull

# 2. Abrir la rama de la funcionalidad
git checkout -b feat/product-modal

# 3. Trabajar, commiteando al cerrar cada pedazo con sentido
git add js/modal.js css/modal.css
git commit -m "feat(modal): render product detail with title, price and description"

# 4. Subir la rama
git push -u origin feat/product-modal

# 5. Abrir el PR en GitHub con base en develop, mergear, y limpiar
git checkout develop
git pull
git branch -d feat/product-modal
```

**Antes de abrir el PR**, traé lo último de `develop` a tu rama para resolver cualquier conflicto en tu propio terreno y no en el merge:

```bash
git checkout feat/product-modal
git fetch origin
git merge origin/develop
```

### Ciclo de release: `develop` → `main`

Este es el paso que todos se olvidan y el que arruina el flujo. Si `develop` avanza tres semanas y `main` quedó con el esqueleto de la fase 0, el merge final es enorme y `main` no sirvió para nada.

**Cada vez que cierran un bloque de requisitos y la app anda, mergean a `main`.** Tres o cuatro veces en todo el TP alcanza.

```bash
git checkout develop
git pull
# Abrir PR en GitHub: develop → main
# Título: "release: catalog grid and cart state"
```

Los cuatro releases de este proyecto, con sus fechas, están en la sección 6.

Después de mergear a `main`, no hace falta traer nada de vuelta a `develop`: como `main` no recibe commits propios, `develop` ya lo contiene todo.

---

## 6. Cronograma — entrega el 25/09

23 días desde el 2 de septiembre. El calendario está armado para que la app quede **funcionalmente completa el 20/09**, dejando los últimos cinco días para responsive, README y margen de error.

Cada bloque cierra con un release a `main`. Si un bloque se atrasa, se corre todo: no se acumula para el final.

### Bloque 0 — 2 al 4/09 · Fase 0 (juntos)

Esqueleto, `base.css`, `layout.css`, contratos, configuración del repo, nombre de la tienda.
Cierra con el push a `main` y la creación de `develop`.

### Bloque 1 — 5 al 10/09 · Núcleo funcional → **release 1 el 10/09**

| A | B |
|---|---|
| `feat/fetch-products` — traer productos de la API | `feat/cart-state` — lógica de `cart.js` sobre `storage.js` |
| `feat/product-grid` — render de cards en la grilla | `feat/cart-badge` — badge con unidades totales |

Al cerrar el bloque, la app tiene que listar productos y sumar al carrito desde la consola.

### Bloque 2 — 11 al 16/09 · Interacción → **release 2 el 16/09**

| A | B |
|---|---|
| `feat/product-modal` — modal de detalle | `feat/cart-sidebar` — sidebar con los items |
| `feat/modal-close-actions` — cierre por X y por agregar | `feat/quantity-controls` — −, cantidad, +, eliminar |
| | `feat/add-to-cart` — conectar el botón del modal |

Acá es donde se cruzan los dos módulos por primera vez. **El PR de `feat/add-to-cart` de B y el del modal de A tienen que mergearse el mismo día**, porque hasta que no están los dos, ninguno puede probar el flujo completo. Coordínenlo.

### Bloque 3 — 17 al 20/09 · Cierre funcional → **release 3 el 20/09**

| A | B |
|---|---|
| `feat/category-filter` — navegación por categorías | `feat/product-search` — buscador en vivo |
| `feat/loading-states` — loader y estado vacío | `feat/checkout-flow` — finalizar compra |
| | `feat/clear-cart` — vaciar carrito |
| | `feat/empty-cart-state` — botones deshabilitados |

**El 20/09 los 11 requisitos tienen que funcionar.** Si algo queda afuera, se corta el alcance de lo que sea (menos categorías, buscador más simple) antes que empujar la fecha.

### Bloque 4 — 21 al 23/09 · Pulido cruzado → **release 4 el 23/09**

| A | B |
|---|---|
| `style/responsive-cart` | `style/responsive-catalog` |
| `docs/readme-team-contributions` (a cuatro manos) | |

### 24/09 · Margen

Sin código nuevo. Repasar el checklist de la sección 12, probar en mobile de verdad (no solo el devtools), cerrar ramas sueltas, poner `main` como rama por defecto.

### 25/09 · Entrega

---

### Cadencia mínima

**Dos PRs por semana cada uno, como piso.** El riesgo más grande de este TP no es la dificultad técnica, es que uno de los dos arranque el 20/09. Un historial donde A commiteó tres semanas y B concentró todo en 48 horas se lee solo en la pestaña de commits, y ahí el reparto no salva a nadie.

Si en algún momento uno se atrasa, se dice antes de que sea tarde y se mueve trabajo. Es un TP de dos personas: el que queda esperando pierde nota igual.

---

## 7. Convención de commits y ramas

Todo lo que va al repositorio se escribe en **inglés**: nombres de rama, mensajes de commit, títulos y descripciones de PR, y el código (funciones, variables, clases CSS). Este documento y el README quedan en español porque los lee el instructor.

### Ramas

```
feat/      funcionalidad nueva     feat/cart-sidebar
fix/       corrección de bug       fix/badge-not-updating
refactor/  reestructuración        refactor/extract-price-formatter
style/     solo CSS                style/responsive-product-grid
docs/      documentación           docs/readme-team-contributions
chore/     mantenimiento           chore/add-gitignore
```

Los merges de `develop` a `main` no abren rama nueva: se hace el PR directo entre las dos, con título `release: ...`.

### Commits (Conventional Commits)

```
<tipo>(<alcance>): <qué hace, en imperativo, en inglés>
```

Ejemplos para este proyecto:

```
feat(api): fetch products from fakestoreapi
feat(catalog): render product cards in responsive grid
feat(modal): close on X button and on add-to-cart
feat(cart): persist items to localStorage on add
feat(cart): disable decrease button when quantity is 1
fix(cart): recalculate badge after removing an item
style(catalog): add media queries for mobile grid
docs(readme): add team contributions section
```

Tres reglas que cubren casi todo:

1. **Imperativo, no pasado.** `add pagination`, no `added pagination`.
2. **Un commit, un cambio con sentido.** Si el mensaje necesita un "and", probablemente son dos commits.
3. **Nada de `update`, `cambios`, `arreglos`, `asd`.**

Esto no es cosmética. El enunciado dice textual que *"se revisará los commits del proyecto para validar la participación de los integrantes"* y que cada uno recibe **su propia calificación** según eso. Un historial con veinte commits `update` de una sola persona baja la nota individual del otro.

### Regla de oro de la evaluación

**Cada uno commitea con su propia cuenta de GitHub.** Nunca uno sube el trabajo del otro. Si programan juntos en una máquina, usen co-autoría:

```
feat(cart): add quantity controls to sidebar

Co-authored-by: Nombre <email@ejemplo.com>
```

Verificá que tu Git local esté configurado con el mismo mail de tu cuenta de GitHub, o los commits no se te van a atribuir:

```bash
git config user.name "Tu Nombre"
git config user.email "el-mail-de-tu-cuenta-github@ejemplo.com"
```

---

## 8. Pull Requests

Aunque el repo sea de ustedes dos, **todo va por PR**. Es lo que hace visible el criterio de cada uno y es el flujo exacto que van a usar en un trabajo.

**Antes de crear el PR, verificá la rama base.** Arriba del formulario GitHub muestra `base: ??? ← compare: feat/tu-rama`. Para una funcionalidad la base tiene que decir **`develop`**. Solo dice `main` cuando estás haciendo un release.

Plantilla de descripción, corta, tres partes:

```markdown
## What
Adds the cart sidebar with quantity controls and per-item subtotal.

## Why
Requirement 6: each cart item needs image, title, decrease/increase
buttons, remove button and a subtotal that reflects quantity.

## How
- `cart-ui.js` renders the sidebar from the state in `cart.js`
- Decrease button is disabled when quantity is 1
- Every action writes back to localStorage through `storage.js`
- Badge recalculates total units on each change
```

**El otro revisa antes de mergear.** No hace falta una revisión profunda: abrir el PR, mirar los archivos cambiados y confirmar que no tocó nada ajeno alcanza. Lleva dos minutos y evita el 100% de los "¿por qué se rompió lo mío?".

Al mergear, **Squash and merge** aplasta todos los commits de la rama en uno solo. Como acá los commits individuales son parte de la nota, usen siempre **Create a merge commit** (el default), tanto en los PR a `develop` como en los de release a `main`.

Borren la rama después de mergear. GitHub ofrece el botón ahí mismo.

---

## 9. Las siete reglas que evitan los conflictos

1. **Nunca commitear directo en `main` ni en `develop`.** Todo por rama y PR.
2. **Las funcionalidades salen de `develop` y vuelven a `develop`.** A `main` solo llegan los releases.
3. **`git checkout develop && git pull` antes de abrir cada rama nueva.** Siempre.
4. **Nadie edita archivos del otro.** Si hace falta, se pide.
5. **`index.html` está congelado.** Cambiarlo requiere acuerdo de los dos y un commit propio (`chore: add container for X`), avisando al otro para que haga pull.
6. **Ramas cortas.** Una funcionalidad, uno o dos días, PR y merge. Una rama de dos semanas se convierte en un merge imposible.
7. **Avisar cuando se mergea.** Un mensaje de "mergeé el modal a develop, hacé pull" es suficiente.

---

## 10. Si igual aparece un conflicto

No es un desastre, es rutina. Pasa cuando ambos tocaron las mismas líneas.

```bash
git checkout mi-rama
git fetch origin
git merge origin/develop
# CONFLICT (content): Merge conflict in index.html
```

Abrí el archivo. Vas a ver:

```
<<<<<<< HEAD
tu versión
=======
la versión de develop
>>>>>>> origin/develop
```

Borrá los marcadores y dejá el código correcto (a veces es una de las dos, a veces las dos juntas). Después:

```bash
git add index.html
git commit
git push
```

Si te perdiste y querés empezar de nuevo el merge: `git merge --abort`.

**Nunca `git push --force` sobre `main` ni sobre `develop`.** Reescribe historial compartido y le rompe el repo local al otro. Sobre tu propia rama de feature, antes del PR, es aceptable.

---

## 11. README final (es requisito de evaluación)

El enunciado pide: *"El proyecto debe tener un readme donde describa el desarrollo de cada participante adjuntando su username de github"*. Se completa al cierre, en una rama `docs/readme-team-contributions` que sale de `develop` como cualquier otra.

Estructura mínima:

```markdown
# Nombre de la tienda

E-commerce desarrollado para Laboratorio de aplicaciones web cliente.

## Stack
HTML5, CSS3 (vanilla, sin frameworks), JavaScript ES6 (módulos, Fetch, localStorage).
API de productos: fakestoreapi.com

## Cómo correrlo
Clonar el repo y abrir `index.html` con Live Server (los módulos ES6
requieren servirse por HTTP, no funcionan con file://).

## Funcionalidades
- [lista breve de los 11 requisitos]

## Integrantes y desarrollo

### Nombre Apellido — [@usuario](https://github.com/usuario)
Catálogo de productos: consumo de la API, render de cards, modal de
detalle, buscador y filtrado por categorías. Estilos de catálogo,
modal y buscador con su responsive.

### Nombre Apellido — [@usuario](https://github.com/usuario)
Carrito de compras: gestión de estado y persistencia en localStorage,
badge de unidades, sidebar con controles de cantidad, finalizar compra
y vaciado. Estilos del carrito con su responsive.

### Trabajo conjunto
Estructura HTML, sistema de diseño (variables de color y tipografía),
layout de header/nav/footer y grid base.
```

---

## 12. Checklist antes de entregar

**Del flujo de ramas**

- [ ] `develop` mergeado a `main` con el release final
- [ ] `main` volvió a ser la rama por defecto (Settings → General → Default branch)
- [ ] Todas las ramas `feat/` mergeadas y borradas
- [ ] El repo es **público** (el enunciado lo exige)

**Del proyecto**

- [ ] README completo con los dos usernames de GitHub
- [ ] Los 11 requisitos funcionan
- [ ] Responsive verificado en mobile, tablet y desktop
- [ ] HTML5 semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Los dos tienen commits repartidos a lo largo del proyecto, no todos el último día
- [ ] Sin `console.log` sueltos ni código comentado
- [ ] Ningún archivo con credenciales o keys
