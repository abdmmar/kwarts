import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('should render', () => {
  render(<App />);
  const text = screen.getByText(/button/i);
  expect(text).toBeInTheDocument();
});
