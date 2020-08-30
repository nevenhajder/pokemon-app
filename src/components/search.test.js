import React from 'react';
import Search from './Search';
import { render, screen, fireEvent } from '@testing-library/react';

describe('<Search />', () => {
it('should render without crashing', () => {
    render(<Search />);
  });

it('should fire change handler after typing', () => {
    const mockChangeHandler = jest.fn();
    render(<Search changeHandler={mockChangeHandler} />);
    const input = screen.getByRole('textbox');
  
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'pikachu' } });
  
    setTimeout(() => expect(mockChangeHandler).toHaveBeenCalledTimes(1), 500);
  });
  
  it('should search when user presses Enter inside textbox', async() => {
    const submitHandler = jest.fn();
    render(<Search submitHandler={submitHandler} invalidInput={false} />);
    const textbox = screen.getByRole('textbox');
  
    fireEvent.change(textbox, { target: { value: 'pikachu' } });
    fireEvent.keyPress(textbox, { key: 'Enter', code: 'Enter' });
  
    // Absolutely no clue why this setTimeout is necessary for the test to pass
    setTimeout(() => expect(submitHandler).toHaveBeenCalledTimes(1), 100);
  });

  it('should render an invalid input', () => {
    const { baseElement } = render(<Search invalidInput={true} />);
    const input = baseElement.querySelector('input.is-invalid');
  
    expect(input).toBeTruthy();
  });
})
