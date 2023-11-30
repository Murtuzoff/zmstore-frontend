import React from 'react';
import { useSelector } from 'react-redux';

import CartIcon from '../../common/Icons/RoundedIcons/CartIcon';

import './HeaderCartButton.css';

const HeaderCartButton = () => {
  const cartContents = useSelector((state) => state.cartContents);
  const { cartItems } = cartContents;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="header-cart-button">
      <span className="header-cart-label">КОРЗИНА</span>
      <CartIcon />
      {userInfo && (
        <span className="header-cart-badge">{cartItems.length}</span>
      )}
    </div>
  );
};

export default HeaderCartButton;
