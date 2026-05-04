<script>
  import ItemMascota from './ItemMascota.svelte';
  import { mascotasStore } from '$lib/stores/mascotasStore';
</script>

<h2>Lista de Mascotas</h2>

{#if $mascotasStore.length > 0}
  <div class="lista">
    {#each $mascotasStore as mascota}
      <ItemMascota {mascota} />
    {/each}
  </div>
{:else}
  <p>No hay mascotas registradas.</p>
{/if}

<style>
  h2 {
    margin-bottom: 15px;
  }

  .lista {
    display: grid;
    gap: 12px;
  }
</style>