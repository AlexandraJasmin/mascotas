import { writable } from 'svelte/store';

const usuarioGuardado =
  typeof localStorage !== 'undefined'
    ? JSON.parse(localStorage.getItem('usuarioAutenticado')) || null
    : null;

export const authStore = writable(usuarioGuardado);

export function guardarSesion(usuario) {
  localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
  authStore.set(usuario);
}

export function cerrarSesion() {
  localStorage.removeItem('usuarioAutenticado');
  authStore.set(null);
}