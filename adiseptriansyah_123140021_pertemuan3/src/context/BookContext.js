import React, { createContext, useContext, useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState({ query: '', status: 'all' });
  const [editingBook, setEditingBook] = useState(null); 
  const addBook = (bookData) => {
    const newBook = { 
      ...bookData, 
      id: Date.now() 
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  const updateBook = (id, updatedData) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
    setEditingBook(null); 
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesStatus =
        filter.status === 'all' || book.status === filter.status;
      const matchesQuery =
        book.title.toLowerCase().includes(filter.query.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.query.toLowerCase());
      
      return matchesStatus && matchesQuery;
    });
  }, [books, filter]);

  const value = {
    books,
    filteredBooks,
    filter,
    setFilter,
    addBook,
    updateBook,
    deleteBook,
    editingBook,
    setEditingBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};