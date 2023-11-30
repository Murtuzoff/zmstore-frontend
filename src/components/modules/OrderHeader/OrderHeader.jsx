import React from 'react';
import PropTypes from 'prop-types';

import UserSuccess from '../../common/Icons/AlertIcons/UserSuccess';
import TruckSuccess from '../../common/Icons/AlertIcons/TruckSuccess';
import TruckDanger from '../../common/Icons/AlertIcons/TruckDanger';
import LocationSuccess from '../../common/Icons/AlertIcons/LocationSuccess';
import LocationDanger from '../../common/Icons/AlertIcons/LocationDanger';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';

import './OrderHeader.css';

const OrderHeader = ({
  userInfo,
  shippingAddress,
  paymentMethod,
  isPlaced,
  isPaid,
  isDelivered,
}) => (
  <div className="order-header">
    <div className="order-status">
      <div className="order-status-content">
        <UserSuccess />

        <strong>Покупатель:</strong>

        <span>{userInfo?.name}</span>

        <span>{userInfo?.email}</span>
      </div>
    </div>

    <div className="order-status">
      <div className="order-status-content">
        {isPlaced && !isPaid ? <TruckDanger /> : <TruckSuccess />}

        <strong>О заказе:</strong>

        <div>
          <span>Страна доставки:</span> <br />
          <span>{shippingAddress.country}</span>
        </div>

        <div>
          <span>Метод оплаты:</span> <span>{paymentMethod}</span>
        </div>
      </div>

      {isPlaced &&
        (!isPaid ? (
          <MessageDanger message="Не оплачен" />
        ) : (
          <MessageSuccess message="Оплачен" />
        ))}
    </div>

    <div className="order-status">
      <div className="order-status-content">
        {isPlaced && !isDelivered ? <LocationDanger /> : <LocationSuccess />}

        <strong>Адрес доставки:</strong>

        <div>
          <span>{shippingAddress.postalCode}</span>,{' '}
          <span>{shippingAddress.city}</span>, <br />
          <span>{shippingAddress.address}</span>
        </div>
      </div>

      {isPlaced &&
        (!isDelivered ? (
          <MessageDanger message="Не доставлен" />
        ) : (
          <MessageSuccess message="Доставлен" />
        ))}
    </div>
  </div>
);

OrderHeader.defaultProps = {
  userInfo: {},
  shippingAddress: {},
  paymentMethod: '',
  isPlaced: false,
  isPaid: false,
  isDelivered: false,
};

OrderHeader.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  shippingAddress: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
  }),
  paymentMethod: PropTypes.string,
  isPlaced: PropTypes.bool,
  isPaid: PropTypes.bool,
  isDelivered: PropTypes.bool,
};

export default OrderHeader;
