/* ============================================================
   api.js — Integrante A
   Unico punto de contacto con la API. El resto del proyecto
   no hace fetch directo.
   Requisito 1 del enunciado.
   ============================================================ */

const BASE_URL = 'https://fakestoreapi.com';

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
