/* ============================================================
   search.js — Integrante B
   Buscador por título. Se combina con el filtro de categoría
   de categories.js mediante eventos cruzados.
   ============================================================ */

import { renderProducts } from './catalog.js';

let allProducts = [];
let currentQuery = '';
let currentCategory = 'all';

export function initSearch() {
  const container = document.getElementById('search-container');
  container.innerHTML = `
    <input
      type="search"
      id="search-input"
      class="search-input"
      placeholder="Buscar productos..."
      aria-label="Buscar productos"
    >
  `;

  document.addEventListener('products:loaded', (event) => {
    allProducts = event.detail.products;
  });

  document.addEventListener('category:changed', (event) => {
    currentCategory = event.detail.category;
    applyFilters();
  });

  const input = document.getElementById('search-input');
  input.addEventListener('input', (event) => {
    currentQuery = event.target.value.trim().toLowerCase();
    document.dispatchEvent(new CustomEvent('search:changed', {
      detail: { query: currentQuery }
    }));
    applyFilters();
  });
}

function applyFilters() {
  let filtered = allProducts;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(product => product.category === currentCategory);
  }
  if (currentQuery !== '') {
    filtered = filtered.filter(product => product.title.toLowerCase().includes(currentQuery));
  }

  renderProducts(filtered);
}