import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './index.css'; 

function App() {
  return (
    <BookProvider>
      <div className="app-container">
        {/* BrowserRouter */}
        <BrowserRouter>
          <nav>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
            <NavLink 
              to="/stats" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Stats
            </NavLink>
          </nav>

          {/*Routes*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BookProvider>
  );
}

export default App;