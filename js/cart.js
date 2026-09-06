import { load, save, clear } from './storage.js';

let items = load();

/** Toda mutación pasa por acá. Un solo lugar que persiste. */
function commit(next) {
  items = next;
  save(items);
}

/** Producto de la API → item de carrito. Solo lo que el sidebar usa. */
function toCartItem(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1
  };
}

export function addToCart(product) {
  const existing = items.find(item => item.id === product.id);
  if (existing) {
    commit(items.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    return;
  }
  commit([...items, toCartItem(product)]);
}

export function increase(id) {
  commit(items.map(item =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  ));
}

export function decrease(id) {
  commit(items.map(item =>
    item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
  ));
}

export function removeFromCart(id) {
  commit(items.filter(item => item.id !== id));
}

export function clearCart() {
  items = [];
  clear();
}

export function getItems() {
  return [...items];
}

export function getTotalUnits() {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice() {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Math.round(total * 100) / 100;
}