import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '../../common/Icons/RoundedIcons/SearchIcon';

import './HeaderSearchBar.css';

const HeaderSearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="header-search-bar">
      <button type="button">
        <SearchIcon />
      </button>
      <form onSubmit={submitHandler}>
        <input
          type="search"
          placeholder="ПОИСК..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearchBar;
