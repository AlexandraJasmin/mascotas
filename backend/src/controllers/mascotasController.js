import {
  obtenerMascotas,
  obtenerMascotaPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota
} from '../models/mascotaModel.js';

export const getMascotas = async (req, res) => {
  try {
    const mascotas = await obtenerMascotas();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error: error.message });
  }
};

export const getMascotaById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const mascota = await obtenerMascotaPorId(id);

    if (!mascota) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json(mascota);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la mascota', error: error.message });
  }
};

export const postMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, edad, peso } = req.body;

    if (!nombre || !especie || !raza || edad === undefined || peso === undefined) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaMascota = await crearMascota({
      nombre,
      especie,
      raza,
      edad,
      peso
    });

    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear mascota', error: error.message });
  }
};

export const putMascota = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, especie, raza, edad, peso } = req.body;

    const mascotaActualizada = await actualizarMascota(id, {
      nombre,
      especie,
      raza,
      edad,
      peso
    });

    if (!mascotaActualizada) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar mascota', error: error.message });
  }
};

export const deleteMascota = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const mascotaEliminada = await eliminarMascota(id);

    if (!mascotaEliminada) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json({ mensaje: 'Mascota eliminada correctamente', mascota: mascotaEliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar mascota', error: error.message });
  }
};