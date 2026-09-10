/* ============================================================
   modal.js — Integrante A
   Modal de detalle (requisito 2). Se abre al clickear una card,
   renderiza el detalle del producto y se cierra con la X,
   por el boton "agregar al carrito", por click en el backdrop
   y por Escape (requisito 3). Usa addToCart() de cart.js (B).
   ============================================================ */

import { addToCart } from './cart.js';
import { notify } from './notify.js';

/** Elemento enfocado antes de abrir, para restaurarlo al cerrar. */
let lastFocused = null;

export function openModal(product) {
  if (!product) return;
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  lastFocused = document.activeElement;

  modal.innerHTML = `
    <div class="modal__dialog" role="document" tabindex="-1">
      <div class="modal__header">
        <button class="modal__close" type="button" aria-label="Cerrar detalle">&times;</button>
      </div>
      <div class="modal__media">
        <img class="modal__img" src="${product.image}" alt="${escapeHtml(product.title)}">
      </div>
      <div class="modal__body">
        <p class="modal__category">${escapeHtml(product.category)}</p>
        <h2 class="modal__title" id="modal-title">${escapeHtml(product.title)}</h2>
        <p class="modal__price price">$${Number(product.price).toFixed(2)}</p>
        <p class="modal__description">${escapeHtml(product.description)}</p>
      </div>
      <div class="modal__actions">
        <button class="modal__add btn btn-primary" type="button">Agregar al carrito</button>
      </div>
    </div>
  `;

  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  modal.querySelector('.modal__add').addEventListener('click', () => {
    addToCart(product);
    notify('Producto agregado al carrito');
    closeModal();
  });
  modal.hidden = false;
  modal.querySelector('.modal__dialog').focus();
}

export function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;

  modal.hidden = true;
  modal.innerHTML = '';
  if (lastFocused) lastFocused.focus();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
