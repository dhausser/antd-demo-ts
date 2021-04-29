import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { CollectionCreateForm } from './App';

test('renders new collection button', () => {
  render(<App />);
  const button = screen.getByRole('button', {  name: /new collection/i})
  expect(button).toBeInTheDocument();
});

// Error: Uncaught [TypeError: window.matchMedia is not a function]
test('renders new collection create form', () => {
  render(<CollectionCreateForm visible onCreate={jest.fn} onCancel={jest.fn} />);
  const titleElement = screen.getByText(/create a new collection/i)
  expect(titleElement).toBeInTheDocument();
});
