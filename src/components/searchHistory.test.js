import React from 'react';
import SearchHistory from './searchHistory';
import { render, screen, fireEvent } from '@testing-library/react';

describe('<SearchHistory />', () => {
  const mockHistoryArray = [
    "Raichu",
    "Pikachu",
    "Alakazam",
    "Kadabra",
    "Abra"
   ];

  it('should render the correct history', () => {
    render(<SearchHistory searchHistoryArray={mockHistoryArray} />);
      const one = screen.getByText(mockHistoryArray[0]);
      const two = screen.getByText(mockHistoryArray[3]);

      expect(one).toBeInTheDocument();
      expect(two).toBeInTheDocument();
    });

  it('should do a search when an item is clicked', () => {
      const mockClickHandler = jest.fn();
      render(<SearchHistory searchHistoryArray={mockHistoryArray} clickHandler={mockClickHandler} />);
      const pokemon = screen.getByText(mockHistoryArray[0]);

      fireEvent.click(pokemon);

      expect(mockClickHandler).toHaveBeenCalledTimes(1);
    })

    it('should remove an item from history when user clicks the X', () => {
      const mockRemoveHandler = jest.fn();
      render(<SearchHistory searchHistoryArray={mockHistoryArray} removeHandler={mockRemoveHandler} />);
      const pokemonItem = screen.getByText(mockHistoryArray[0]);
      const closeButton = pokemonItem.querySelector('button');

      fireEvent.click(closeButton);

      expect(mockRemoveHandler).toHaveBeenCalledTimes(1);
    })
});
