import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

import WoodenHeaderBackground from '../../common/Backgrounds/WoodenHeaderBackground';
import HomeIcon from '../../common/Icons/RoundedIcons/HomeIcon';
import EnvelopeIcon from '../../common/Icons/RoundedIcons/EnvelopeIcon';
import HeaderSearchBar from '../../modules/HeaderSearchBar/HeaderSearchBar';
import HeaderDropdownMenu from '../../modules/HeaderDropdownMenu/HeaderDropdownMenu';
import HeaderCartButton from '../../modules/HeaderCartButton/HeaderCartButton';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';

import './Header.css';

const Header = () => (
  <div className="header">
    <WoodenHeaderBackground />
    <div className="header-container">
      <div className="header-left">
        <HashLink to="/#">
          <HomeIcon />
        </HashLink>

        <HashLink to="/#home-subscription">
          <EnvelopeIcon />
        </HashLink>

        <span className="header-contact">+994 99 700 2907</span>
        <span className="header-contact">zoreslava.murtuzoff@gmail.com</span>
      </div>

      <div className="header-right">
        <HeaderSearchBar />
        <HeaderDropdownMenu />
        <Link to="/cart">
          <HeaderCartButton />
        </Link>
      </div>
      <LanguageSwitcher />
    </div>
  </div>
);

export default Header;
