import { pool } from '../config/db.js';

export const obtenerUsuarioPorCorreo = async (correo) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE correo = $1',
    [correo]
  );

  return result.rows[0];
};