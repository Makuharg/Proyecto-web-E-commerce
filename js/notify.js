/* ============================================================
   notify.js — FASE 0 — archivo COMPARTIDO
   Mensajes al usuario. Requisitos 4 y 7 del enunciado.
   Usa SweetAlert2 (CDN en index.html) y cae a alert() si no
   esta disponible. Terminado: no hace falta tocarlo mas.
   ============================================================ */

const hasSwal = () => typeof window.Swal !== 'undefined';

export function notify(message, type = 'success') {
  if (!hasSwal()) {
    console.log(`[${type}] ${message}`);
    return;
  }
  window.Swal.fire({
    text: message,
    icon: type,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true
  });
}

export function confirmAction(message, confirmText = 'Confirmar') {
  if (!hasSwal()) return Promise.resolve(window.confirm(message));

  return window.Swal.fire({
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#1F4FD8'
  }).then(result => result.isConfirmed);
}
