/* ============================================================
   main.js — FASE 0 — archivo COMPARTIDO
   Solo arranca los modulos. Sin logica propia.
   Cada integrante exporta su init* y no vuelve a tocar
   este archivo.
   ============================================================ */

import { initCatalog } from './catalog.js';
import { initCartUI } from './cart-ui.js';

initCatalog();
initCartUI();
