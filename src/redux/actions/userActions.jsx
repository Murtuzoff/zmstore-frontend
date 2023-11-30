import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../api/serverAPI';

// АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ (POST)
export const userLoginAction = createAsyncThunk(
  'user/login',

  async ({ email, password }) => {
    try {
      const { data } = await userAPI.post(
        '/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

      return data;
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ (POST)
export const userSignupAction = createAsyncThunk(
  'user/signup',

  async ({ name, email, password }, { dispatch }) => {
    try {
      await userAPI.post(
        '/signup',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      await dispatch(userLoginAction({ email, password }));
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// ВЫХОД ПОЛЬЗОВАТЕЛЯ (POST)
export const userLogoutAction = createAsyncThunk(
  'user/login',

  async (_, { dispatch }) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'order/list/fulfilled', payload: [] });
  },
);

// ЗАПРОС ПОЛЬЗОВАТЕЛЯ USER (GET)
export const userProfileAction = createAsyncThunk(
  'user/profile',

  async (_, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      await userAPI.get('/profile', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
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

// ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ USER (PUT)
export const userUpdateAction = createAsyncThunk(
  'user/update',

  async ({ name, email, password }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      await userAPI.put(
        '/update',
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      await dispatch(userLoginAction({ email, password }));

      return userInfo._id;
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

// ОЧИСТКА ОБНОВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ
export const userUpdateResetAction = createAsyncThunk(
  'user/update',
  async (_, { dispatch }) => {
    dispatch({ type: 'user/update/fulfilled', payload: '' });
  },
);
