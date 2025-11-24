import React from 'react';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css'; 

const Stats = () => {
  const { 
    totalBooks, 
    ownedBooks, 
    readingBooks, 
    wishlistBooks 
  } = useBookStats();

  const getPercentage = (count) => {
    return totalBooks > 0 ? ((count / totalBooks) * 100).toFixed(0) : 0;
  };

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1>Book Collection</h1>
        <p className="page-description">
          Get a quick overview of your book collection. See how many books you own, are currently reading, or want to buy.
        </p>
      </div>

      <hr className="divider" />

      <div className="stats-grid">
        {/* Total Books*/}
        <div className="stat-card total">
          <h3>Book Total</h3>
          <p className="stat-number">{totalBooks}</p>
          <div className="stat-detail">
            <span className="label">Total Books Registered</span>
          </div>
        </div>

        {/* Owned Books*/}
        <div className="stat-card owned">
          <h3>OWNED BOOK</h3>
          <p className="stat-number">{ownedBooks}</p>
          <div className="progress-bar-container">
            <div className="progress-bar owned" style={{ width: `${getPercentage(ownedBooks)}%` }}></div>
          </div>
        </div>

        <div className="stat-card reading">
          <h3>CURRENTLY READING</h3>
          <p className="stat-number">{readingBooks}</p>
          <div className="progress-bar-container">
            <div className="progress-bar reading" style={{ width: `${getPercentage(readingBooks)}%` }}></div>
          </div>
        </div>

        <div className="stat-card wishlist">
          <h3>WISHLIST</h3>
          <p className="stat-number">{wishlistBooks}</p>
          <div className="progress-bar-container">
            <div className="progress-bar wishlist" style={{ width: `${getPercentage(wishlistBooks)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;