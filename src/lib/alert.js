import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const notifySuccess = (mensaje) =>
  Toast.fire({ icon: 'success', title: mensaje });

export const notifyError = (mensaje) =>
  Swal.fire({ icon: 'error', title: 'Error', text: mensaje, confirmButtonColor: '#2563eb' });

export const confirmDelete = (nombre) =>
  Swal.fire({
    title: '¿Eliminar contacto?',
    text: `"${nombre}" será eliminado permanentemente.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
