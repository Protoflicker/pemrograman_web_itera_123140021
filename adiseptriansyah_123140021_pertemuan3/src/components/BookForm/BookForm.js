import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

const initialState = {
  title: '',
  author: '',
  status: 'milik', 
};

const BookForm = () => {
  const [book, setBook] = useState(initialState);
  const [error, setError] = useState('');
  const { addBook, updateBook, editingBook, setEditingBook } = useBooks();

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
      setError(''); 
    } else {
      setBook(initialState);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Error Handling
    if (!book.title || !book.author) {
      setError('Title and Writer cannot be empty.');
      return;
    }

    if (editingBook) {
      // Mode Update
      updateBook(editingBook.id, book);
    } else {
      // Mode Add
      addBook(book);
    }

    // Reset form dan error
    setBook(initialState);
    setError('');
    setEditingBook(null);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setBook(initialState);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Writer"
        value={book.author}
        onChange={handleChange}
      />
      <select name="status" value={book.status} onChange={handleChange}>
        <option value="milik">Owned</option>
        <option value="baca">Currently Reading</option>
        <option value="beli">Wishlist</option>
      </select>
      
      <div className="form-actions">
        <button type="submit">
          {editingBook ? 'Update' : 'Add'}
        </button>
        {editingBook && (
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;