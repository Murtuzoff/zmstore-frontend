import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SearchIcon from '../../common/Icons/RoundedIcons/SearchIcon';

import './HeaderSearchBar.css';

const HeaderSearchBar = () => {
  const { t } = useTranslation();
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
      <button type="button" aria-label="Search">
        <SearchIcon />
      </button>
      <form onSubmit={submitHandler}>
        <input
          type="search"
          placeholder={`${t('search')}...`}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" aria-label="Submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearchBar;
