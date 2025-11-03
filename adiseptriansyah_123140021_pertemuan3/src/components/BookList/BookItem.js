import React from 'react';
import { useBooks } from '../../context/BookContext';

const BookItem = ({ book }) => {
  const { deleteBook, setEditingBook } = useBooks();
  const getStatusLabel = (status) => {
    switch (status) {
      case 'milik': return 'Owned';
      case 'baca': return 'Reading';
      case 'beli': return 'Wishlist';
      default: return 'N/A';
    }
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
      <div className="book-meta">
        <span className={`status-badge status-${book.status}`}>
          {getStatusLabel(book.status)}
        </span>
        <div className="book-actions">
          <button className="edit-btn" onClick={() => setEditingBook(book)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => deleteBook(book.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;