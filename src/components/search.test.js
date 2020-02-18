import React from 'react';
import Search from './Search';
import { render, fireEvent } from '@testing-library/react';

it('should render without crashing', () => {
  render(<Search />);
});

it('should fire change handler after typing', () => {
  const mockChangeHandler = jest.fn();
  const { getByRole } = render(<Search changeHandler={mockChangeHandler} />);
  const input = getByRole('textbox');

  fireEvent.click(input);
  fireEvent.change(input, { target: { value: 'pikachu' } });

  setTimeout(() => expect(mockChangeHandler).toHaveBeenCalledTimes(1), 500);
});

it('should render an invalid input', () => {
  const { baseElement, debug } = render(<Search invalidInput={true} />);
  const input = baseElement.querySelector('input.is-invalid');

  expect(input).toBeTruthy();
});
