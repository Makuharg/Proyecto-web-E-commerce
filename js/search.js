/* ============================================================
   search.js — Integrante B
   Buscador por título. Filtra la lista en memoria y reusa
   el render de catalog.js, sin tocar su código.
   ============================================================ */

import { renderProducts } from './catalog.js';

let allProducts = [];

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

  const input = document.getElementById('search-input');
  input.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    const filtered = query === ''
      ? allProducts
      : allProducts.filter(product =>
          product.title.toLowerCase().includes(query)
        );
    renderProducts(filtered);
  });
}