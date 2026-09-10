/* ============================================================
   cart-ui.js — Integrante B
   Render del sidebar y del badge. Escucha los clicks del
   carrito y llama a las funciones de cart.js.
   Requisitos 5, 6, 7, 8 y 9 del enunciado.
   ============================================================ */

import { getItems, getTotalUnits, getTotalPrice, increase, decrease, removeFromCart } from './cart.js';

let toggle, sidebar, badge, overlay;

export function initCartUI() {
  toggle = document.getElementById('cart-toggle');
  sidebar = document.getElementById('cart-sidebar');
  badge = document.getElementById('cart-badge');
  overlay = document.getElementById('overlay');

  renderCart();

  toggle.addEventListener('click', openCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('cart:updated', renderCart);

  sidebar.addEventListener('click', (event) => {
    const itemEl = event.target.closest('.cart-item');
    if (!itemEl) return;
    const id = Number(itemEl.dataset.id);

    if (event.target.matches('.increase')) increase(id);
    if (event.target.matches('.decrease')) decrease(id);
    if (event.target.matches('.remove')) removeFromCart(id);
  });
}

function renderCartItem(item) {
  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-price">$${item.price}</span>
      </div>
      <div class="cart-item-controls">
        <button class="decrease" aria-label="Restar unidad" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
        <span class="cart-item-quantity">${item.quantity}</span>
        <button class="increase" aria-label="Sumar unidad">+</button>
      </div>
      <span class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove" aria-label="Eliminar producto">×</button>
    </div>
  `;
}

function renderCart() {
  const items = getItems();

  if (items.length === 0) {
    sidebar.innerHTML = `<p class="cart-empty">Tu carrito está vacío</p>`;
  } else {
    sidebar.innerHTML = items.map(renderCartItem).join('') +
      `<div class="cart-total">Total: $${getTotalPrice().toFixed(2)}</div>`;
  }

  updateBadge();
}

function updateBadge() {
  const units = getTotalUnits();
  badge.textContent = units;
  badge.hidden = units === 0;
}

function openCart() {
  sidebar.hidden = false;
  overlay.hidden = false;
}

function closeCart() {
  sidebar.hidden = true;
  overlay.hidden = true;
}

