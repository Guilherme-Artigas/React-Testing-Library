import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('Validações referentes ao componente Favorite Pokémons', () => {
  it('Verifica se mostra na tela a mensagem de lista de favoritos vazia', () => {
    renderWithRouter(<FavoritePokemons />);

    const emptyList = screen.getByText(/no favorite pokemon found/i);
    expect(emptyList).toBeInTheDocument();
  });

  it('Mostra a lista com os pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreLink).toBeInTheDocument();
    userEvent.click(moreLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritado = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoritado).toBeInTheDocument();
    userEvent.click(favoritado);

    const favoritesList = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritesList).toBeInTheDocument();
    userEvent.click(favoritesList);

    const { pathname: rota } = history.location;
    expect(rota).toBe('/favorites');

    const listSaveds = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(listSaveds).toBeInTheDocument();
  });
});
