import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../../api/serverAPI';
import { cartResetAction } from './cartActions';
import { userLogoutAction } from './userActions';

// GET ORDER BY ID (GET)
export const orderDetailsAction = createAsyncThunk(
  'order/details',

  async ({ orderId }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await orderAPI.get(`/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return data;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ADD ORDER (POST)
export const orderCreateAction = createAsyncThunk(
  'order/create',

  async (
    { orderItems, shippingAddress, paymentMethod },
    { getState, dispatch },
  ) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await orderAPI.post(
        '/',
        { orderItems, shippingAddress, paymentMethod },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      await dispatch(orderDetailsAction({ orderId: data._id }));

      await dispatch(cartResetAction());

      return data._id;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// CLEAR ADD ORDER
export const orderCreateResetAction = createAsyncThunk(
  'order/create',
  async () => '',
);

// PAY BY ORDER ID (PUT)
export const orderPayAction = createAsyncThunk(
  'order/pay',

  async ({ orderId, payer, transaction }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      await orderAPI.put(
        `/${orderId}/paid`,
        { payer, transaction },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      await dispatch(orderDetailsAction({ orderId }));
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ADMIN DELIVERY BY ORDER ID (PUT)
export const orderDeliveryAction = createAsyncThunk(
  'order/delivery',

  async ({ orderId }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      await orderAPI.put(
        `/${orderId}/delivered`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      await dispatch(orderDetailsAction({ orderId }));
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// USER GET ORDER LIST (GET)
export const orderListAction = createAsyncThunk(
  'order/list',

  async (_, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await orderAPI.get('/', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return data;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ADMIN GET ALL ORDER LIST (GET)
export const orderListAllAction = createAsyncThunk(
  'order/listAll',

  async (_, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await orderAPI.get('/all', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return data;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);
