import { describe, it, expect } from 'vitest';
import { validarMascota } from './validaciones.js';

describe('validarMascota', () => {
  it('debe devolver errores cuando los campos están vacíos', () => {
    const errores = validarMascota({
      nombre: '',
      especie: '',
      raza: '',
      edad: '',
      peso: ''
    });

    expect(errores.nombre).toBe('El nombre es obligatorio');
    expect(errores.especie).toBe('La especie es obligatoria');
    expect(errores.raza).toBe('La raza es obligatoria');
    expect(errores.edad).toBe('La edad debe ser un número válido');
    expect(errores.peso).toBe('El peso debe ser mayor que 0');
  });

  it('debe devolver error si especie o raza tienen números', () => {
    const errores = validarMascota({
      nombre: 'Luna',
      especie: 'Perro1',
      raza: 'Labrador2',
      edad: 3,
      peso: 18
    });

    expect(errores.especie).toBe('La especie solo debe contener letras');
    expect(errores.raza).toBe('La raza solo debe contener letras');
  });

  it('no debe devolver errores si los datos son válidos', () => {
    const errores = validarMascota({
      nombre: 'Luna',
      especie: 'Perro',
      raza: 'Labrador',
      edad: 3,
      peso: 18
    });

    expect(errores).toEqual({});
  });
});