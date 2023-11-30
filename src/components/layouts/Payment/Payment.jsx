import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { cartPaymentAction } from '../../../redux/actions/cartActions';

import StyledForm from '../../modules/StyledForm/StyledForm';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './Payment.css';

const Payment = () => {
  const cartContents = useSelector((state) => state.cartContents);
  const { shippingAddress } = cartContents;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartPaymentAction({ paymentMethod }));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length !== 4) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <main className="payment">
      <StyledForm onSubmit={submitHandler}>
        <strong>Выберите метод оплаты:</strong>

        <label htmlFor="payment-method">
          <input
            type="radio"
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>PayPal или Банковская карта</span>
        </label>

        <WoodenButton width="100%" label="ПРОДОЛЖИТЬ" type="submit" />
      </StyledForm>
    </main>
  );
};

export default Payment;
