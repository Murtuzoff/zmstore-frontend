import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { orderListAction } from '../../../redux/actions/orderActions';

import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './ProfileOrderList.css';

const ProfileOrderList = () => {
  const { t } = useTranslation();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orderArray } = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  return (
    <div className="profile-orderlist">
      {loading && <Loading marginBottom="20px" />}
      {error && <MessageDanger message={error} marginBottom="20px" />}

      {!loading &&
        !error &&
        (orderArray.length === 0 ? (
          <>
            <MessageSuccess message={t('noOrders')} marginBottom="20px" />
            <Link to="/">
              <WoodenButton
                width="300px"
                maxWidth="100%"
                label={t('goShopping')}
              />
            </Link>
          </>
        ) : (
          <table cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <th>
                  <span>ID</span>
                </th>
                <th width="94px">
                  <span>{t('STATUS')}</span>
                </th>
                <th width="226px">
                  <span>{t('DATE')}</span>
                </th>
                <th className="th-last" width="90px">
                  <span>{t('TOTAL')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...orderArray]
                .sort(
                  (a, b) =>
                    new Date(a.paidAt || a.createdAt) -
                    new Date(b.paidAt || b.createdAt),
                )
                .map((order) => (
                  <tr
                    key={order._id}
                    style={{ background: order.isPaid ? '#dfd' : '#fdd' }}
                  >
                    <td>
                      <a
                        href={`/order/${order._id}`}
                        style={{ color: order.isPaid ? '#060' : '#900' }}
                      >
                        <span>{order._id}</span>
                      </a>
                    </td>

                    <td>
                      {order.isPaid ? (
                        <span>{t('paid')}</span>
                      ) : (
                        <span>{t('notPaid')}</span>
                      )}
                    </td>

                    <td>
                      {order.isPaid ? (
                        <span>{moment(order.paidAt).format('LLL')}</span>
                      ) : (
                        <span>{moment(order.createdAt).format('LLL')}</span>
                      )}
                    </td>

                    <td className="td-last">
                      <div>
                        <span>{order.totalPrice}</span> <span>$</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default ProfileOrderList;
