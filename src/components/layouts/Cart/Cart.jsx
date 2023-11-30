import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { cartAddAction } from '../../../redux/actions/cartActions';
import { orderCreateResetAction } from '../../../redux/actions/orderActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';
import OrderProduct from '../../modules/OrderProduct/OrderProduct';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './Cart.css';

const Cart = () => {
  const { loading, error, cartItems } = useSelector(
    (state) => state.cartContents,
  );

  const params = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = searchParams.get('quantity');

  const totalPriceValue = cartItems
    .reduce((acc, product) => acc + product.quantity * product.price, 0)
    .toFixed(2);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    dispatch(orderCreateResetAction());
    navigate('/login?redirect=shipping');
  };

  useEffect(() => {
    if (params?.id && quantity) {
      dispatch(cartAddAction({ productId: params.id, quantity }));
      navigate('/cart');
    }
  }, [dispatch, params.id, quantity, navigate]);

  return (
    <main className="cart">
      {loading && <Loading />}
      {error && <MessageDanger message={error} />}

      {cartItems.length === 0 ? (
        <>
          {!loading && !error && (
            <MessageSuccess message="Ваша корзина пуста" />
          )}

          <Link to="/">
            <WoodenButton width="300px" maxWidth="100%" label="ЗА ПОКУПКАМИ" />
          </Link>
        </>
      ) : (
        <>
          {!loading && !error && (
            <MessageSuccess
              message={`Всего наименований в корзине (${cartItems.length})`}
            />
          )}

          {cartItems.map((product) => (
            <OrderProduct key={product._id} product={product} />
          ))}

          <div className="cart-total">
            <div className="cart-total-price">
              <span>СУММА:</span>
            </div>

            <div className="cart-total-value">
              <span>{totalPriceValue}</span> <span>₽</span>
            </div>
          </div>

          <div className="cart-buttons">
            <Link to="/">
              <WoodenButton
                width="300px"
                maxWidth="100%"
                label="ПРОДОЛЖИТЬ ПОКУПКИ"
              />
            </Link>

            <WoodenButton
              width="300px"
              maxWidth="100%"
              label="ОФОРМИТЬ ЗАКАЗ"
              onClick={checkoutHandler}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;
