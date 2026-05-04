const API_URL = `${import.meta.env.PUBLIC_API_URL}/mascotas`;

export async function obtenerMascotas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener mascotas');
  }

  return await response.json();
}

export async function crearMascota(mascota) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mascota)
  });

  if (!response.ok) {
    throw new Error('Error al crear mascota');
  }

  return await response.json();
}

export async function actualizarMascota(id, mascota) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mascota)
  });

  if (!response.ok) {
    throw new Error('Error al actualizar mascota');
  }

  return await response.json();
}

export async function eliminarMascota(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar mascota');
  }

  return await response.json();
}