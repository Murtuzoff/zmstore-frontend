import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cartShippingAction } from '../../../redux/actions/cartActions';

import StyledForm from '../../modules/StyledForm/StyledForm';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './Shipping.css';

const Shipping = () => {
  const cartContents = useSelector((state) => state.cartContents);
  const { shippingAddress } = cartContents;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartShippingAction({ address, city, postalCode, country }),
    );
    navigate('/payment');
  };

  return (
    <main className="shipping">
      <StyledForm onSubmit={submitHandler}>
        <strong>Адрес доставки:</strong>

        <input
          type="text"
          placeholder="Укажите адрес..."
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Укажите город..."
          value={city || ''}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Укажите индекс..."
          value={postalCode || ''}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Укажите страну..."
          value={country || ''}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <WoodenButton width="100%" label="ПРОДОЛЖИТЬ" type="submit" />
      </StyledForm>
    </main>
  );
};

export default Shipping;
