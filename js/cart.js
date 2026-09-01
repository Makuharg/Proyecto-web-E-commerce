/* ============================================================
   cart.js — Integrante B
   CONTRATO: estas firmas ya estan acordadas. B las implementa,
   A las importa. Si una firma cambia, se avisa al otro antes.

   Requisitos 4, 6, 7 y 8 del enunciado.
   ============================================================ */

import { load, save, clear } from './storage.js';

let items = load();

/** Agrega un producto. Si ya esta, suma 1 a la cantidad.
 *  @param {{id:number,title:string,price:number,image:string}} product */
export function addToCart(product) {
  // TODO(B)
}

/** Quita un producto del carrito por completo. */
export function removeFromCart(id) {
  // TODO(B)
}

/** Suma 1 a la cantidad. */
export function increase(id) {
  // TODO(B)
}

/** Resta 1 a la cantidad. No baja de 1. */
export function decrease(id) {
  // TODO(B)
}

/** Vacia el carrito y limpia localStorage. */
export function clearCart() {
  // TODO(B)
}

/** Devuelve una copia de los items. */
export function getItems() {
  return [...items];
}

/** Total de UNIDADES, no de productos distintos. Para el badge. */
export function getTotalUnits() {
  return 0; // TODO(B)
}

/** Total a pagar. */
export function getTotalPrice() {
  return 0; // TODO(B)
}
