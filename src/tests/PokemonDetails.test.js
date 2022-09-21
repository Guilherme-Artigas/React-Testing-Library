import { screen } from '@testing-library/react';
import { PokemonDetails } from '../pages';
import renderWithRouter from './utils/renderWithRouter';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const pokeSelected = {
  match: {
    params: {
      id: '25',
    },
  },
};

describe('Verificando comportamentos do componente PokemonDetails', () => {
  it('Verificando se renderiza alguns detalhes do pokémon selecionado na tela', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ pokeSelected.match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const titleDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(titleDetails).toBeInTheDocument();

    const sumaryTitle = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(sumaryTitle).toBeInTheDocument();

    const paragraphDetails = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them..../i,
    );
    expect(paragraphDetails).toBeInTheDocument();
  });

  it('Verificando detalhes da localização na página', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ pokeSelected.match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const titleLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(titleLocations).toBeInTheDocument();

    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();

    const imgLocationRoute = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(imgLocationRoute[0]).toBeInTheDocument();
    expect(imgLocationRoute[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocationRoute[1]).toBeInTheDocument();
    expect(imgLocationRoute[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Verificando checkbox da página detalhes', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ pokeSelected.match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
  });
});
