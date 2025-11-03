import React from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import { useBooks } from '../../context/BookContext';
import './Home.css';

const Home = () => {
  const { editingBook } = useBooks();

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>{editingBook ? 'UPDATE CATATAN BUKU' : 'Book Collection Tracker'}</h1>
        <p className="page-description">
        </p>
      </div>

      <div className="form-section">
        <BookForm />
      </div>
      
      <hr className="divider" /> 
      
      <div className="list-section">
        <h2>Your Book Collection</h2>
        <p className="section-description">
          View all the books you've bookmarked, use filters and search to find what you're looking for.
        </p>
        <BookFilter />
        <BookList />
      </div>
    </div>
  );
};

export default Home;