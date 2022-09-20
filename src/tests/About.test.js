import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../pages';

describe('Verificando o comportamento do componente About', () => {
  it('Verifica se a página contem informações sobre a Pokedex', () => {
    renderWithRouter(<About />);

    const infoPokedexText1 = screen.getByText(/This application simulates a Pokédex/i);
    const infoPokedexText2 = screen.getByText(/One can filter Pokémons by type, and se/i);
    expect(infoPokedexText1).toBeInTheDocument();
    expect(infoPokedexText2).toBeInTheDocument();
  });

  it('Verifica se a página contem um título com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Verifica se existem dois paragrafos na tela', () => {
    renderWithRouter(<About />);

    const listParagraphs = screen.getAllByText(/Pokémons/i);
    expect(listParagraphs[0]).toBeInTheDocument();
    expect(listParagraphs[1]).toBeInTheDocument();
  });

  it('Verifica se renderiza uma imagem especifica na tela', () => {
    renderWithRouter(<About />);

    const imgAbout = screen.getByRole('img', { name: /pokédex/i });
    expect(imgAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
