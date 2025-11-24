import React from 'react';
import { useBooks } from '../../context/BookContext';
import BookItem from './BookItem'; 
import './BookList.css';

const BookList = () => {
  const { filteredBooks } = useBooks();

  if (filteredBooks.length === 0) {
    return <p className="empty-list-message">No Book Listed for This Filter.</p>;
  }

  return (
    <div className="book-list">
      {filteredBooks.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;