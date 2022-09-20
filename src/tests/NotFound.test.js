import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './utils/renderWithRouter';

describe('Verificando comportamento do componente NotFound', () => {
  it('Verifica se a página contem um título infomando página não encontrada', () => {
    renderWithRouter(<NotFound />);

    const titleNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });

  it('Verifica se carrega uma imagem na página não encontrada', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
