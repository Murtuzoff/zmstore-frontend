import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../api/serverAPI';

// USER AUTHORIZATION (POST)
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

// USER REGISTRATION (POST)
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

// USER LOGOUT (POST)
export const userLogoutAction = createAsyncThunk(
  'user/login',

  async (_, { dispatch }) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'order/list/fulfilled', payload: [] });
  },
);

// GET USER PROFILE (GET)
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

// UPDATE USER PROFILE (PUT)
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

// CLEAR UPDATE USER PROFILE
export const userUpdateResetAction = createAsyncThunk(
  'user/update',
  async (_, { dispatch }) => {
    dispatch({ type: 'user/update/fulfilled', payload: '' });
  },
);
