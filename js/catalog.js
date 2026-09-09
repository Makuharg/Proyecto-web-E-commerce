/* ============================================================
   catalog.js — Integrante A
   Trae los productos, los renderiza en cards y mantiene la
   lista en memoria para que search.js y categories.js filtren.
   Requisito 1 del enunciado.
   ============================================================ */

import { getProducts } from './api.js';
import { openModal } from './modal.js';

/** Lista completa en memoria. La usan search.js y categories.js
 *  despues de filtrar; se re-asigna en cada carga. */
let allProducts = [];

export function initCatalog() {
  loadProducts();
  bindCardClicks();
}

/** Delegacion de clicks sobre la grilla: un solo listener,
 *  sobrevive a los re-renders de search.js y categories.js. */
function bindCardClicks() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    openModal(findProduct(Number(card.dataset.id)));
  });
}

/** Busca un producto por id en la lista en memoria.
 *  Lo usa modal.js cuando una card dispara el click. */
export function findProduct(id) {
  return allProducts.find((product) => product.id === id);
}

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  const loader = document.getElementById('loader');
  const emptyState = document.getElementById('empty-state');

  showLoader(loader, emptyState, grid);

  try {
    const products = await getProducts();
    allProducts = Array.isArray(products) ? products : [];

    if (allProducts.length === 0) {
      showEmpty(loader, emptyState, grid);
      return;
    }

    renderProducts(allProducts);
  } catch (err) {
    console.error('No se pudieron cargar los productos', err);
    showEmpty(loader, emptyState, grid);
  } finally {
    hideLoader(loader);
  }
}

function showLoader(loader, emptyState, grid) {
  if (loader) loader.hidden = false;
  if (emptyState) emptyState.hidden = true;
  if (grid) grid.innerHTML = '';
}

function hideLoader(loader) {
  if (loader) loader.hidden = true;
}

function showEmpty(loader, emptyState, grid) {
  if (emptyState) {
    emptyState.hidden = false;
    emptyState.innerHTML = `
      <h2 class="empty-state__title">Sin productos</h2>
      <p>No se pudieron cargar los productos. Proba de nuevo en un momento.</p>
    `;
  }
  if (grid) grid.innerHTML = '';
}

/** Dibuja una lista de productos en la grilla. La usan
 *  search.js y categories.js despues de filtrar. */
export function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const list = Array.isArray(products) ? products : [];
  grid.innerHTML = list
    .map(
      (product) => `
        <article class="card" data-id="${product.id}">
          <img class="card__img" src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy">
          <div class="card__body">
            <h3 class="card__title">${escapeHtml(product.title)}</h3>
            <p class="card__category">${escapeHtml(product.category)}</p>
            <p class="card__price">$${Number(product.price).toFixed(2)}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
