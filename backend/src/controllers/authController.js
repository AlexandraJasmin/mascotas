import { obtenerUsuarioPorCorreo } from '../models/usuarioModel.js';

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await obtenerUsuarioPorCorreo(correo);

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
};