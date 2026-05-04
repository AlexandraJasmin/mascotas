import { PUBLIC_API_URL } from '$env/static/public';

const AUTH_URL = `${PUBLIC_API_URL}/auth/login`;

export async function loginUsuario(datosLogin) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosLogin)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al iniciar sesión');
  }

  return data;
}