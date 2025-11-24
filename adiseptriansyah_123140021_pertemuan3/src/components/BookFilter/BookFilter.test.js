import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookProvider, useBooks } from '../../context/BookContext';
import BookFilter from './BookFilter';

// Komponen palsu untuk menguji context
const MockConsumer = () => {
  const { filter } = useBooks();
  return (
    <div>
      <span data-testid="query-value">{filter.query}</span>
      <span data-testid="status-value">{filter.status}</span>
    </div>
  );
};

// Wrapper kustom untuk provider
const renderWithProvider = (ui) => {
  return render(
    <BookProvider>
      {ui}
      <MockConsumer />
    </BookProvider>
  );
};

test('renders search input', () => {
  renderWithProvider(<BookFilter />);
  const searchInput = screen.getByPlaceholderText(/Search with Book Title or Writer/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders status filter select', () => {
  renderWithProvider(<BookFilter />);
  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();
});

test('shows correct default filter values from context', () => {
  renderWithProvider(<BookFilter />);
  expect(screen.getByTestId('query-value')).toHaveTextContent('');
  expect(screen.getByTestId('status-value')).toHaveTextContent('all');
});

test('updates context query on search input change', () => {
  renderWithProvider(<BookFilter />);
  const searchInput = screen.getByPlaceholderText(/Search with Book Title or Writer/i);
  
  fireEvent.change(searchInput, { target: { value: 'React' } });
  
  expect(screen.getByTestId('query-value')).toHaveTextContent('React');
});

test('updates context status on select change', () => {
  renderWithProvider(<BookFilter />);
  const selectElement = screen.getByRole('combobox');
  
  fireEvent.change(selectElement, { target: { value: 'baca' } });
  
  expect(screen.getByTestId('status-value')).toHaveTextContent('baca');
});