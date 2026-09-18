/* ============================================================
   categories.js — Integrante A
   Navegacion por categorias (requisito 11).
   No filtra ni re-renderiza: avisa a search.js con el evento
   category:changed para que combine búsqueda + categoría.
   ============================================================ */

/** Productos completos, los recibe del evento products:loaded. */
let allProducts = [];

export function initCategories() {
  bindNavClicks();

  document.addEventListener('products:loaded', (event) => {
    allProducts = Array.isArray(event.detail?.products) ? event.detail.products : [];
    renderNav(allProducts);
  });
}

/** Delegacion sobre la lista: un solo listener, sobrevive re-renders. */
function bindNavClicks() {
  const nav = document.getElementById('category-nav');
  if (!nav) return;

  nav.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-category]');
    if (!chip) return;

    setActive(chip.dataset.category);

    document.dispatchEvent(new CustomEvent('category:changed', {
      detail: { category: chip.dataset.category }
    }));
  });
}

/** Deriva las categorias unicas de la lista en memoria. */
function getCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort();
}

/** Etiquetas en español para las categorias de fakestoreapi.
 *  La clave queda intacta en data-category: es lo que usa el filtro. */
const CATEGORY_LABELS = {
  "men's clothing": 'Ropa de Hombre',
  "women's clothing": 'Ropa de Mujer',
  electronics: 'Electrónica',
  jewelery: 'Joyería'
};

function labelFor(category) {
  const label = CATEGORY_LABELS[category];
  if (label) return label;
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function renderNav(products) {
  const nav = document.getElementById('category-nav');
  if (!nav || products.length === 0) return;

  const categories = getCategories(products);
  const chipMarkup = (category) => `
        <li><button type="button" class="category-chip" data-category="${escapeAttr(category)}" aria-pressed="${category === 'all'}">
          <span>${escapeHtml(category === 'all' ? 'Todas las categorías' : labelFor(category))}</span>
        </button></li>
      `;

  const totalChip = chipMarkup('all');
  const categoryChips = categories
    .map((category) => chipMarkup(category))
    .join('');

  nav.innerHTML = totalChip + categoryChips;
}

function setActive(activeCategory) {
  document.querySelectorAll('.category-chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.category === activeCategory));
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}