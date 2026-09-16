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
    filterProducts(chip.dataset.category);
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

function filterProducts(category) {
  if (category === 'all') {
    renderProducts(allProducts);
    return;
  }
  renderProducts(allProducts.filter((product) => product.category === category));
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