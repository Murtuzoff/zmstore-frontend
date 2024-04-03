import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  orderCreateAction,
  orderCreateResetAction,
} from '../../../redux/actions/orderActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import OrderHeader from '../../modules/OrderHeader/OrderHeader';
import OrderProduct from '../../modules/OrderProduct/OrderProduct';
import OrderTotal from '../../modules/OrderTotal/OrderTotal';

import './PlaceOrder.css';

const PlaceOrder = () => {
  const { t } = useTranslation();

  const { userInfo } = useSelector((state) => state.userLogin);

  if (!userInfo) {
    window.location.href = '/login';
  }

  const cartContents = useSelector((state) => state.cartContents);
  const loadingCart = cartContents.loading;
  const errorCart = cartContents.error;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, orderId } = orderCreate;

  const loadingComponent = loadingCart || loading;
  const errorComponent = errorCart || error;

  const itemsPrice = Number(
    cartContents.cartItems
      .reduce((acc, product) => acc + product.quantity * product.price, 0)
      .toFixed(2),
  );
  const shippingPrice = itemsPrice === 0 || itemsPrice > 30 ? 0 : 5;
  const totalPrice = itemsPrice + shippingPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      orderCreateAction({
        orderItems: cartContents.cartItems,
        shippingAddress: cartContents.shippingAddress,
        paymentMethod: cartContents.paymentMethod,
      }),
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      navigate(`/order/${orderId}`);
      dispatch(orderCreateResetAction());
    }
  }, [orderId, navigate, dispatch]);

  return (
    <main className="place-order">
      {loadingComponent && <Loading />}
      {errorComponent && <MessageDanger message={errorComponent} />}

      {cartContents.cartItems.length === 0 ? (
        <>
          {!loading && !error && <MessageSuccess message={t('cartIsEmpty')} />}
          <Link to="/">
            <WoodenButton
              width="300px"
              maxWidth="100%"
              label={t('goShopping')}
            />
          </Link>
        </>
      ) : (
        <>
          <OrderHeader
            userInfo={userInfo}
            shippingAddress={cartContents.shippingAddress}
            paymentMethod={cartContents.paymentMethod}
          />
          <div className="place-order-shipment">
            <div className="place-order-product">
              {cartContents.cartItems.map((product) => (
                <OrderProduct key={product._id} product={product} inOrder />
              ))}
            </div>

            <OrderTotal
              itemsPrice={itemsPrice}
              shippingPrice={shippingPrice}
              totalPrice={totalPrice}
              placeOrderHandler={placeOrderHandler}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default PlaceOrder;
