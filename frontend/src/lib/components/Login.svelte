<script>
  import { loginUsuario } from '$lib/services/authService.js';
  import { guardarSesion } from '$lib/stores/authStore.js';

  let correo = $state('');
  let password = $state('');
  let error = $state('');
  let cargando = $state(false);

  async function manejarLogin(event) {
    event.preventDefault();
    error = '';
    cargando = true;

    try {
      const respuesta = await loginUsuario({ correo, password });
      guardarSesion(respuesta.usuario);
    } catch (err) {
      error = err.message;
    } finally {
      cargando = false;
    }
  }
</script>

<div class="login-contenedor">
  <div class="login-card">
    <h1>Iniciar Sesión</h1>
    <p class="subtitulo">Accede al sistema de gestión de mascotas</p>

    <form class="login-formulario" onsubmit={manejarLogin}>
      <div class="campo">
        <label for="correo">Correo</label>
        <input id="correo" type="email" bind:value={correo} />
      </div>

      <div class="campo">
        <label for="password">Contraseña</label>
        <input id="password" type="password" bind:value={password} />
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" class="btn-login" disabled={cargando}>
        {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-contenedor {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 20px;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    background-color: #f3efe3;
    border-radius: 14px;
    padding: 28px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  h1 {
    margin-bottom: 8px;
  }

  .subtitulo {
    color: #555;
    margin-bottom: 20px;
  }

  .login-formulario {
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

  .btn-login {
    background-color: #769382;
    color: white;
  }

  .btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error {
    color: #d9534f;
    font-size: 14px;
    margin: 0;
  }
</style>