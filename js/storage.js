/* ============================================================
   storage.js — FASE 0 — archivo COMPARTIDO
   Unico punto de acceso a localStorage. Nadie llama a
   localStorage directamente en el resto del proyecto.
   Terminado: no hace falta tocarlo mas.
   ============================================================ */

const KEY = 'cart';

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function clear() {
  localStorage.removeItem(KEY);
}
