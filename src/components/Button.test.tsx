import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from './Button';

test('should render', () => {
  render(<Button />);
  const text = screen.getByText(/button/i);
  expect(text).toBeInTheDocument();
});
