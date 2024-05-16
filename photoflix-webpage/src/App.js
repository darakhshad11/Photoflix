import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Favourites from './components/Favourites';
import Photo from './components/Photo';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {

  const[Query , setQuery] = useState("")
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target[0].value)
  }



  return (
    <BrowserRouter>
      <div>
        <nav className='navbar'>
          <div className='navbar_logo'>
            Photoflix
          </div>
          <form action='' className='nav_search_bar' onSubmit={handleSearch}>
            <input type='text' className='form_input' placeholder='Search' />
            <button type='submit' className='submit-btn'><FaSearch/>
            </button>
          </form>

          <div className='navbar_links'>
            <NavLink to="/favourites" activeClassName="active">Favourites</NavLink>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Photo />} />
          <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
