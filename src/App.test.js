import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('should render without crashing', () => {
  render(<App />);
});
