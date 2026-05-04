<script>
  import { mascotasStore, mascotaEnEdicion } from '$lib/stores/mascotasStore';
  import { authStore } from '$lib/stores/authStore.js';
  import { validarMascota } from '$lib/utils/validaciones';
  import {
    crearMascota as crearMascotaAPI,
    actualizarMascota as actualizarMascotaAPI
  } from '$lib/services/mascotasServices.js';

  let nombre = $state('');
  let especie = $state('');
  let raza = $state('');
  let edad = $state('');
  let peso = $state('');
  let errores = $state({});
  let idMascota = $state(null);

  function limpiarSoloTexto(valor) {
    return valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s-]/g, '');
  }

  function manejarEspecieInput(event) {
    if ($authStore?.rol === 'visor') return;
    especie = limpiarSoloTexto(event.currentTarget.value);
  }

  function manejarRazaInput(event) {
    if ($authStore?.rol === 'visor') return;
    raza = limpiarSoloTexto(event.currentTarget.value);
  }

  $effect(() => {
    const mascota = $mascotaEnEdicion;

    if (mascota) {
      idMascota = mascota.id;
      nombre = mascota.nombre;
      especie = mascota.especie;
      raza = mascota.raza;
      edad = mascota.edad;
      peso = mascota.peso;
    }
  });

  function limpiarFormulario() {
    idMascota = null;
    nombre = '';
    especie = '';
    raza = '';
    edad = '';
    peso = '';
    errores = {};
    mascotaEnEdicion.set(null);
  }

  async function manejarSubmit(event) {
    event.preventDefault();

    if ($authStore?.rol === 'visor') return;

    const datosMascota = {
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: Number(edad),
      peso: Number(peso)
    };

    errores = validarMascota(datosMascota);

    if (Object.keys(errores).length > 0) return;

    try {
      if (idMascota) {
        const mascotaActualizada = await actualizarMascotaAPI(idMascota, datosMascota);

        mascotasStore.update((mascotas) =>
          mascotas.map((mascota) =>
            mascota.id === idMascota ? mascotaActualizada : mascota
          )
        );
      } else {
        const nuevaMascota = await crearMascotaAPI(datosMascota);
        mascotasStore.update((mascotas) => [...mascotas, nuevaMascota]);
      }

      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar mascota:', error);
    }
  }

  function cancelarEdicion() {
    if ($authStore?.rol === 'visor') return;
    limpiarFormulario();
  }

  const esSoloLectura = $derived($authStore?.rol === 'visor');
</script>

<h2>{idMascota ? 'Editar Mascota' : 'Registrar Mascota'}</h2>

{#if esSoloLectura}
  <p class="solo-lectura">Modo solo lectura. No tienes autorización para modificar registros.</p>
{/if}

<form class="formulario" onsubmit={manejarSubmit}>
  <div class="campo">
    <label for="nombre">Nombre</label>
    <input id="nombre" type="text" bind:value={nombre} disabled={esSoloLectura} />
    {#if errores.nombre}
      <span class="error">{errores.nombre}</span>
    {/if}
  </div>

  <div class="campo">
    <label for="especie">Especie</label>
    <input
      id="especie"
      type="text"
      bind:value={especie}
      oninput={manejarEspecieInput}
      disabled={esSoloLectura}
    />
    {#if errores.especie}
      <span class="error">{errores.especie}</span>
    {/if}
  </div>

  <div class="campo">
    <label for="raza">Raza</label>
    <input
      id="raza"
      type="text"
      bind:value={raza}
      oninput={manejarRazaInput}
      disabled={esSoloLectura}
    />
    {#if errores.raza}
      <span class="error">{errores.raza}</span>
    {/if}
  </div>

  <div class="campo">
    <label for="edad">Edad</label>
    <input id="edad" type="number" bind:value={edad} min="0" disabled={esSoloLectura} />
    {#if errores.edad}
      <span class="error">{errores.edad}</span>
    {/if}
  </div>

  <div class="campo">
    <label for="peso">Peso (kg)</label>
    <input id="peso" type="number" bind:value={peso} min="0.1" step="0.1" disabled={esSoloLectura} />
    {#if errores.peso}
      <span class="error">{errores.peso}</span>
    {/if}
  </div>

  <div class="botones">
    <button type="submit" class="guardar" disabled={esSoloLectura}>
      {idMascota ? 'Actualizar Mascota' : 'Guardar Mascota'}
    </button>

    {#if idMascota}
      <button type="button" class="cancelar" onclick={cancelarEdicion} disabled={esSoloLectura}>
        Cancelar
      </button>
    {/if}
  </div>
</form>

<style>
  h2 {
    margin-bottom: 15px;
  }

  .solo-lectura {
    margin: 0 0 15px 0;
    color: #555;
    font-size: 14px;
    font-weight: bold;
  }

  .formulario {
    display: grid;
    gap: 15px;
  }

  .campo {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-weight: bold;
  }

  .botones {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .guardar {
    background-color: #769382;
    color: white;
  }

  .guardar:hover {
    opacity: 0.9;
  }

  .cancelar {
    background-color: #c0c3b9;
    color: #222;
  }

  .cancelar:hover {
    opacity: 0.9;
  }

  button:disabled,
  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    color: #d9534f;
    font-size: 13px;
  }
</style>