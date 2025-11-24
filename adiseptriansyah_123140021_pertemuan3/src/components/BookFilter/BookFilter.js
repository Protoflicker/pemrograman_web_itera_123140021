import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

const BookFilter = () => {
  const { filter, setFilter } = useBooks();

  const handleInputChange = (e) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      query: e.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      status: e.target.value,
    }));
  };

  return (
    <div className="filter-container">
      <input
        type="search"
        placeholder="Search with Book Title or Writer"
        value={filter.query}
        onChange={handleInputChange}
      />
      <select value={filter.status} onChange={handleSelectChange}>
        <option value="all">All</option>
        <option value="milik">Owned</option>
        <option value="baca">Reading</option>
        <option value="beli">Wishlist</option>
      </select>
    </div>
  );
};

export default BookFilter;