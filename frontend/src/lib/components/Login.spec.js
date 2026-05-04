// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Login from './Login.svelte';

describe('Login', () => {
  it('debe mostrar el título Iniciar Sesión', () => {
    render(Login);

    const titulo = screen.getByRole('heading', { name: 'Iniciar Sesión' });
    expect(titulo).toBeTruthy();
  });
});