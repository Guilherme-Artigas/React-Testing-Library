import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const verdadeiro = true;

describe('Verificando o comportamento do componente Pokemon', () => {
  it('Verificando se possui um card contendo as informações corretas', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ verdadeiro }
        pokemon={ pokemons[0] }
        showDetailsLink={ verdadeiro }
      />,
    );

    const pokeName = screen.getByTestId('pokemon-name');
    const poketype = screen.getByText('Electric');
    const pokeweight = screen.getByTestId('pokemon-weight');
    const imgPoke = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokeName).toBeInTheDocument();
    expect(poketype).toHaveTextContent('Electric');
    expect(pokeweight).toBeInTheDocument();
    expect(imgPoke.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPoke.alt).toBe('Pikachu sprite');
  });

  it('Verificando o link de navegação, onde deve conter mais informações', () => {
    renderWithRouter(
      <Pokemon
        isFavorite={ verdadeiro }
        pokemon={ pokemons[1] }
        showDetailsLink={ verdadeiro }
      />,
    );

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkDetails.href).toBe('http://localhost/pokemons/4');
  });

  it('Verificando se clicar no link de veja mais redireciona para a página', () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite={ verdadeiro }
        pokemon={ pokemons[2] }
        showDetailsLink={ verdadeiro }
      />,
    );

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/10');
  });

  it('Verificando se o pokémon favoritado esta marcado com uma estrela', () => {
    const { history } = renderWithRouter(
      <Pokemon
        isFavorite={ verdadeiro }
        pokemon={ pokemons[5] }
        showDetailsLink={ verdadeiro }
      />,
    );

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/151');

    const isFavorite = screen.getByRole('img', {
      name: /mew is marked as favorite/i,
    });
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorite.alt).toBe('Mew is marked as favorite');
  });
});
