import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);
  const headerElement = screen.getByText(/file manager/i);
  expect(headerElement).toBeInTheDocument();
});

test('loads data and renders data', () => {
  render(<App />);
  const initialContent = screen.getByText(/root/);
  expect(initialContent).toBeInTheDocument();

  fireEvent.click(initialContent);
  waitFor(() =>{
    expect(screen.findByText(/src/)).toBeInTheDocument();
  });
});
