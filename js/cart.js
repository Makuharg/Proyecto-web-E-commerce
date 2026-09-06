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

export function removeFromCart(id) {
  // filtrar items y pasarlo por commit()
}

export function increase(id) {
  // mismo patrón que el segundo caso de addToCart
}

export function decrease(id) {
  // igual que increase pero restando, sin bajar de 1
}

export function clearCart() {
  // vaciar items y limpiar localStorage con clear()
}

export function getItems() {
  return [...items];
}

export function getTotalUnits() {
  // reduce sobre quantity, no items.length
}

export function getTotalPrice() {
  // reduce sobre price * quantity, redondeado a 2 decimales al final
}