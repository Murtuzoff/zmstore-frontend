import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { orderDetailsAction } from '../../../redux/actions/orderActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import OrderHeader from '../../modules/OrderHeader/OrderHeader';
import OrderProduct from '../../modules/OrderProduct/OrderProduct';
import OrderTotal from '../../modules/OrderTotal/OrderTotal';

import './Order.css';

const Order = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  if (!userInfo) {
    window.location.href = '/login';
  }

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, orderInfo } = orderDetails;

  const params = useParams();
  const orderId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(orderDetailsAction({ orderId }));
    }
  }, [orderId, dispatch]);

  return (
    <main className="order">
      {loading && <Loading />}
      {error && <MessageDanger message={error} />}

      {!orderInfo.orderItems ? (
        !loading && (
          <Link to="/">
            <WoodenButton width="300px" maxWidth="100%" label="ЗА ПОКУПКАМИ" />
          </Link>
        )
      ) : (
        <>
          <OrderHeader
            userInfo={orderInfo.user}
            shippingAddress={orderInfo.shippingAddress}
            paymentMethod={orderInfo.paymentMethod}
            isPlaced
            isPaid={orderInfo.isPaid}
            isDelivered={orderInfo.isDelivered}
          />

          <div className="order-shipment">
            <div className="order-product">
              {orderInfo.orderItems.map((product) => (
                <OrderProduct key={product._id} product={product} inOrder />
              ))}
            </div>

            <OrderTotal
              orderId={orderInfo._id}
              itemsPrice={Number(orderInfo.itemsPrice)}
              shippingPrice={Number(orderInfo.shippingPrice)}
              totalPrice={Number(orderInfo.totalPrice)}
              isPaid={orderInfo.isPaid}
              isDelivered={orderInfo.isDelivered}
              isAdmin={userInfo?.isAdmin}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Order;
