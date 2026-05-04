<script>
  import { onMount } from 'svelte';
  import FormularioMascota from '$lib/components/FormularioMascota.svelte';
  import ListaMascotas from '$lib/components/ListaMascotas.svelte';
  import Login from '$lib/components/Login.svelte';
  import { mascotasStore } from '$lib/stores/mascotasStore';
  import { authStore, cerrarSesion } from '$lib/stores/authStore.js';
  import { obtenerMascotas } from '$lib/services/mascotasServices.js';

  let cargando = $state(true);
  let error = $state('');

  async function cargarMascotas() {
    try {
      const mascotas = await obtenerMascotas();
      mascotasStore.set(mascotas);
      error = '';
    } catch (err) {
      error = 'No se pudieron cargar las mascotas';
      console.error(err);
    } finally {
      cargando = false;
    }
  }

  onMount(async () => {
    if ($authStore) {
      await cargarMascotas();
    } else {
      cargando = false;
    }
  });

  $effect(() => {
    if ($authStore) {
      cargando = true;
      cargarMascotas();
    } else {
      mascotasStore.set([]);
      cargando = false;
    }
  });
</script>

<svelte:head>
  <title>CRUD de Mascotas</title>
  <meta name="description" content="Aplicación CRUD de mascotas con SvelteKit" />
</svelte:head>

{#if !$authStore}
  <Login />
{:else}
  <div class="contenedor">
    <div class="barra-superior">
      <div>
        <h1>Gestión de Mascotas</h1>
        <p class="descripcion">
          Bienvenido, {$authStore.nombre} ({$authStore.rol})
        </p>
      </div>

      <button class="btn-salir" onclick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>

    {#if cargando}
      <p>Cargando mascotas...</p>
    {:else if error}
      <p class="error-global">{error}</p>
    {:else}
      <div class="layout-principal">
        <div class="seccion">
          <ListaMascotas />
        </div>

        <div class="seccion formulario-seccion">
          <FormularioMascota />
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .barra-superior {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
  }

  .btn-salir {
    background-color: #769382;
    color: white;
  }

  @media (max-width: 700px) {
    .barra-superior {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>