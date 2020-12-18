import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JIFFY GIF Search header', () => {
  render(<App />);
  const linkElement = screen.getByText(/JIFFY GIF Search/i);
  expect(linkElement).toBeInTheDocument();
});
