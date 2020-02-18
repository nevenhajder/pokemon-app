import React from 'react';
import { render } from '@testing-library/react';
import Card from './card';

const mockData = {
  pokemon: {
    name: 'squirtle',
    hp: '15',
    attack: '13',
    defense: '18'
  },
  description: 'Squirtle is the best',
  imgUrl: 'https://img.pokemondb.net/artwork/squirtle.jpg'
};

it('should render without crashing', () => {
  render(
    <Card
      pokemon={mockData.pokemon}
      img={mockData.imgUrl}
      description={mockData.description}
    />
  );
});

it('should render the correct information that has been passed in', () => {
  const { baseElement, getByAltText } = render(
    <Card
      img={mockData.imgUrl}
      pokemon={mockData.pokemon}
      description={mockData.description}
    />
  );

  const heading = baseElement.querySelector('.card-header');
  const image = getByAltText(mockData.pokemon.name);
  const description = baseElement.querySelector('p');

  expect(heading.textContent).toBe(mockData.pokemon.name);
  expect(image.src).toBe(mockData.imgUrl);
  expect(description.textContent).toBe(mockData.description);
});
