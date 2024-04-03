import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { userLogoutAction } from '../../../redux/actions/userActions';

import UserIcon from '../../common/Icons/RoundedIcons/UserIcon';

import './HeaderDropdownMenu.css';

const HeaderDropdownMenu = () => {
  const { t } = useTranslation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userLogoutAction());
  };

  return (
    <div className="header-dropdown-menu">
      <button type="button" className="header-dropdown-button">
        <div className="header-dropdown-label">
          {userInfo ? (
            <span>{userInfo.name}</span>
          ) : (
            <span>{t('ACCOUNT')}</span>
          )}
        </div>
        <UserIcon />
      </button>

      <div className="header-dropdown-mask" />

      <ul className="header-dropdown-content">
        {userInfo ? (
          <Link to="/profile">
            <li className="header-dropdown-item">
              <span>{t('myAccount')}</span>
            </li>
          </Link>
        ) : (
          <Link to="/login">
            <li className="header-dropdown-item">
              <span>{t('login')}</span>
            </li>
          </Link>
        )}

        {userInfo ? (
          <Link to="#logout" onClick={logoutHandler}>
            <li className="header-dropdown-item">
              <span>{t('logout')}</span>
            </li>
          </Link>
        ) : (
          <Link to="/signup">
            <li className="header-dropdown-item">
              <span>{t('signup')}</span>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default HeaderDropdownMenu;
