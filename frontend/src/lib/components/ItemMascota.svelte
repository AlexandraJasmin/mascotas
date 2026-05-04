<script>
  import { mascotasStore, mascotaEnEdicion } from '$lib/stores/mascotasStore';
  import { authStore } from '$lib/stores/authStore.js';
  import { eliminarMascota as eliminarMascotaAPI } from '$lib/services/mascotasServices.js';

  let { mascota } = $props();

  const esSoloLectura = $derived($authStore?.rol === 'visor');

  async function eliminar() {
    if (esSoloLectura) return;

    try {
      await eliminarMascotaAPI(mascota.id);
      mascotasStore.update((mascotas) =>
        mascotas.filter((m) => m.id !== mascota.id)
      );
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
    }
  }

  function editar() {
    if (esSoloLectura) return;
    mascotaEnEdicion.set({ ...mascota });
  }
</script>

<div class="item">
  <div class="info">
    <h3>{mascota.nombre}</h3>
    <p><strong>Especie:</strong> {mascota.especie}</p>
    <p><strong>Raza:</strong> {mascota.raza}</p>
    <p><strong>Edad:</strong> {mascota.edad} años</p>
    <p><strong>Peso:</strong> {mascota.peso} kg</p>
  </div>

  <div class="acciones">
    <button class="editar" onclick={editar} disabled={esSoloLectura}>Editar</button>
    <button class="eliminar" onclick={eliminar} disabled={esSoloLectura}>Eliminar</button>
  </div>
</div>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background-color: #fafafa;
  }

  .info h3 {
    margin-bottom: 8px;
  }

  .info p {
    margin: 4px 0;
  }

  .acciones {
    display: flex;
    gap: 10px;
  }

  .editar {
    background-color: #d9cfb9;
    color: #222;
  }

  .eliminar {
    background-color: #d9534f;
    color: white;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>