export function validarMascota({ nombre, especie, raza, edad, peso }) {
  const errores = {};
  const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s-]+$/;

  if (!nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  }

  if (!especie.trim()) {
    errores.especie = 'La especie es obligatoria';
  } else if (!soloTexto.test(especie.trim())) {
    errores.especie = 'La especie solo debe contener letras';
  }

  if (!raza.trim()) {
    errores.raza = 'La raza es obligatoria';
  } else if (!soloTexto.test(raza.trim())) {
    errores.raza = 'La raza solo debe contener letras';
  }

  if (edad === '' || edad === null || Number.isNaN(Number(edad)) || Number(edad) < 0) {
    errores.edad = 'La edad debe ser un número válido';
  }

  if (peso === '' || peso === null || Number.isNaN(Number(peso)) || Number(peso) <= 0) {
    errores.peso = 'El peso debe ser mayor que 0';
  }

  return errores;
}