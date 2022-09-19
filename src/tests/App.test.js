import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Verificando comportamentos do componente App,js', () => {
  it('Verifica se existe uma navegação para Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByText(/home/i);
    const aboutText = screen.getByText(/about/i);
    const favoriteText = screen.getByText(/Favorite Pokémons/i);

    expect(homeText).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(favoriteText).toBeInTheDocument();
  });

  it('Verifica se muda para rota / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Verifica se muda para a rota /about ao clicar no link about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Verifica se muda para a rota /favorites ao clicar no link de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Verifica se aparece o Pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFound = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFound).toBeInTheDocument();
  });
});
