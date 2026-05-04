import { PUBLIC_API_URL } from '$env/static/public';

const API_URL = `${PUBLIC_API_URL}/mascotas`;

export async function obtenerMascotas() {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al obtener mascotas');
  }

  return data;
}

export async function crearMascota(mascota) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mascota)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al crear mascota');
  }

  return data;
}

export async function actualizarMascota(id, mascota) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mascota)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al actualizar mascota');
  }

  return data;
}

export async function eliminarMascota(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al eliminar mascota');
  }

  return data;
}