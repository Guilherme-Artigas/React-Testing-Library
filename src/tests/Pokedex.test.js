import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

const favoritePokemonIds = readFavoritePokemonIds();
const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
  return acc;
}, {});

describe('Verificando comportamento do componente Pokedex', () => {
  it('Verificando se a página possui um título', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavorite }
        pokemons={ pokemons }
      />,
    );

    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(titleHome).toBeInTheDocument();
  });

  it('Verifica se muda para o próximo pokemon da lista quando o botão é clicado', () => {
    const { history } = renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavorite }
        pokemons={ pokemons }
      />,
    );

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const buttonNext = screen.getByText(/próximo pokémon/i);
    expect(buttonNext).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      if (name !== 'Dragonair') {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(buttonNext);
      }
    });

    userEvent.click(buttonNext);

    const pokeImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokeImg).toBeInTheDocument();
  });

  it('Verifica os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isPokemonFavorite }
        pokemons={ pokemons }
      />,
    );

    const numberButtons = 7;
    const buttonsList = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsList.length).toBe(numberButtons);

    const buttonPsychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(buttonPsychic);

    const firstPoke = pokemons.find(({ type }) => type === 'Psychic');
    expect(firstPoke.type).toBe('Psychic');

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);

    const fistPokeList = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(fistPokeList).toBeInTheDocument();
  });
});
