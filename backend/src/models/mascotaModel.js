import { pool } from '../config/db.js';

export const obtenerMascotas = async () => {
  const result = await pool.query('SELECT * FROM mascotas ORDER BY id ASC');
  return result.rows;
};

export const obtenerMascotaPorId = async (id) => {
  const result = await pool.query('SELECT * FROM mascotas WHERE id = $1', [id]);
  return result.rows[0];
};

export const crearMascota = async ({ nombre, especie, raza, edad, peso }) => {
  const result = await pool.query(
    `INSERT INTO mascotas (nombre, especie, raza, edad, peso)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, especie, raza, edad, peso]
  );

  return result.rows[0];
};

export const actualizarMascota = async (id, { nombre, especie, raza, edad, peso }) => {
  const result = await pool.query(
    `UPDATE mascotas
     SET nombre = $1, especie = $2, raza = $3, edad = $4, peso = $5
     WHERE id = $6
     RETURNING *`,
    [nombre, especie, raza, edad, peso, id]
  );

  return result.rows[0];
};

export const eliminarMascota = async (id) => {
  const result = await pool.query(
    'DELETE FROM mascotas WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};