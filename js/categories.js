/* ============================================================
   categories.js — Integrante A
   Navegacion por categorias (requisito 11).
   Filtra la lista que ya cargo catalog.js en memoria y re-render
   con renderProducts(). No hace un segundo fetch por categoria:
   es inmediato y consistente con el buscador de search.js.
   ============================================================ */

import { renderProducts } from './catalog.js';

/** Productos completos, los recibe del evento products:loaded. */
let allProducts = [];

export function initCategories() {
  document.addEventListener('products:loaded', (event) => {
    allProducts = Array.isArray(event.detail?.products) ? event.detail.products : [];
    renderNav(allProducts);
  });
}

/** Deriva las categorias unicas de la lista en memoria. */
function getCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort();
}

function renderNav(products) {
  const nav = document.getElementById('category-nav');
  if (!nav || products.length === 0) return;

  const categories = getCategories(products);
  const chips = [
    `<li><button type="button" class="category-chip" data-category="all" aria-pressed="true">Todas las categorias</button></li>`,
    ...categories.map(
      (category) => `
        <li><button type="button" class="category-chip" data-category="${escapeAttr(category)}" aria-pressed="false">${escapeHtml(category)}</button></li>
      `
    )
  ];

  nav.innerHTML = chips.join('');
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