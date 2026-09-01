/* ============================================================
   catalog.js — Integrante A
   Trae los productos, los renderiza en cards y mantiene la
   lista en memoria para que search.js y categories.js filtren.
   Requisito 1 del enunciado.
   ============================================================ */

export function initCatalog() {
  const grid = document.getElementById('product-grid');
  const loader = document.getElementById('loader');
  const emptyState = document.getElementById('empty-state');

  console.log('catalog listo', { grid, loader, emptyState });
  // TODO(A)
}

/** Dibuja una lista de productos en la grilla. La usan
 *  search.js y categories.js despues de filtrar. */
export function renderProducts(products) {
  // TODO(A)
}
