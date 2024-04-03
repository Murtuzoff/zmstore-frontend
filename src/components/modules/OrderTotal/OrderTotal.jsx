import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useTranslation } from 'react-i18next';

import {
  orderDeliveryAction,
  orderPayAction,
} from '../../../redux/actions/orderActions';
import { createOrder, onApprove } from '../../../api/PayPalAPI';

import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';

import './OrderTotal.css';

const OrderTotal = ({
  orderId,
  itemsPrice,
  shippingPrice,
  totalPrice,
  placeOrderHandler,
  isPaid,
  isDelivered,
  isAdmin,
}) => {
  const { t } = useTranslation();

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const currency = process.env.REACT_APP_PAYPAL_CURRENCY;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading, error } = orderPay;

  const dispatch = useDispatch();

  const successPaymentHandler = (data) => {
    const payer = data?.payer;
    const transaction =
      data?.purchase_units?.[0]?.payments?.captures?.[0] ||
      data?.purchase_units?.[0]?.payments?.authorizations?.[0];
    // eslint-disable-next-line no-console
    console.log({
      Approval: data,
      Payer: payer,
      Transaction: transaction,
    });

    dispatch(orderPayAction({ orderId, payer, transaction }));
  };

  return (
    <div className="order-total">
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          <tr>
            <td className="td-left">
              <span>{t('products')}:</span>
            </td>
            <td className="td-right">
              <span>{itemsPrice}</span> <span>$</span>
            </td>
          </tr>

          <tr>
            <td className="td-left">
              <span>{t('delivery')}:</span>
            </td>
            <td className="td-right">
              <span>{shippingPrice}</span> <span>$</span>
            </td>
          </tr>

          <tr>
            <td className="td-left td-last">
              <span>{t('total')}:</span>
            </td>
            <td className="td-right td-last">
              <span>{totalPrice}</span> <span>$</span>
            </td>
          </tr>
        </tbody>
      </table>

      {!orderId ? (
        <WoodenButton
          width="inherit"
          label={t('CHECKOUT')}
          onClick={placeOrderHandler}
        />
      ) : (
        <>
          {!isPaid && loading && <Loading />}
          {!isPaid && error && <MessageDanger message={error} />}
          {!isPaid && (
            <PayPalScriptProvider options={{ 'client-id': clientId, currency }}>
              <PayPalButtons
                createOrder={() => createOrder({ totalPrice, currency })}
                onApprove={(data) => onApprove(data, successPaymentHandler)}
              />
            </PayPalScriptProvider>
          )}
        </>
      )}

      {isAdmin && isPaid && !isDelivered && (
        <WoodenButton
          width="inherit"
          label={t('confirmDelivery')}
          onClick={() => dispatch(orderDeliveryAction({ orderId }))}
        />
      )}
    </div>
  );
};

OrderTotal.defaultProps = {
  orderId: '',
  itemsPrice: null,
  shippingPrice: null,
  totalPrice: null,
  placeOrderHandler: () => {},
  isPaid: false,
  isDelivered: false,
  isAdmin: false,
};

OrderTotal.propTypes = {
  orderId: PropTypes.string,
  itemsPrice: PropTypes.number,
  shippingPrice: PropTypes.number,
  totalPrice: PropTypes.number,
  placeOrderHandler: PropTypes.func,
  isPaid: PropTypes.bool,
  isDelivered: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default OrderTotal;
