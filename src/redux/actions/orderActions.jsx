import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderAPI } from '../../api/serverAPI';
import { cartResetAction } from './cartActions';
import { userLogoutAction } from './userActions';

// ЗАПРОС ОДНОГО ЗАКАЗА ПО ID (GET)
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
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ДОБАВЛЕНИЕ ЗАКАЗА (POST)
export const orderCreateAction = createAsyncThunk(
  'order/create',

  async (orderDetails, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await orderAPI.post('/', orderDetails, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      await dispatch(orderDetailsAction({ orderId: data._id }));

      await dispatch(cartResetAction());

      return data._id;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ОЧИСТКА ДОБАВЛЕНИЯ ЗАКАЗА
export const orderCreateResetAction = createAsyncThunk(
  'order/create',
  async () => '',
);

// ОПЛАТА ЗАКАЗА ПО ID (PUT)
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
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ДОСТАВКА ЗАКАЗА ПО ID ADMIN (PUT)
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
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ЗАПРОС СПИСКА ЗАКАЗОВ USER (GET)
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
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ЗАПРОС СПИСКА ЗАКАЗОВ ADMIN (GET)
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
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);
