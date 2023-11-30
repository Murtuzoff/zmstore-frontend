import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api/serverAPI';
import { userLogoutAction } from './userActions';

// ЗАПРОС ВСЕХ ТОВАРОВ (GET)
export const productListAction = createAsyncThunk(
  'product/list',

  async ({ keyword, pagenumber }) => {
    try {
      const { data } = await productAPI.get(
        `?keyword=${keyword}&pagenumber=${pagenumber}`,
      );

      return data;
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// ЗАПРОС ТОВАРА ПО ID (GET)
export const productItemAction = createAsyncThunk(
  'product/item',

  async ({ productId }) => {
    try {
      const { data } = await productAPI.get(`/${productId}`);

      return data;
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// USER ДОБАВЛЕНИЕ НОВОГО ОТЗЫВА ПО ID ТОВАРА (POST)
export const productReviewAction = createAsyncThunk(
  'product/review',

  async ({ productId, rating, comment }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      const { data } = await productAPI.post(
        `/${productId}/review`,
        { rating, comment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      await dispatch(productItemAction({ productId }));

      return data?.message;
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

// USER ОЧИСТКА ДОБАВЛЕНИЯ ОТЗЫВА
export const productReviewResetAction = createAsyncThunk(
  'product/review',
  async () => '',
);

// ADMIN ДОБАВЛЕНИЕ ТОВАРА (POST)
export const productCreateAction = createAsyncThunk(
  'product/create',

  async (
    { name, image, description, price, countInStock },
    { getState, dispatch },
  ) => {
    try {
      const { userInfo } = getState().userLogin;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('countInStock', countInStock);

      const { data } = await productAPI.post('/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return data._id;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
        case 'Не авторизован в качестве Администратора':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ADMIN ОЧИСТКА ДОБАВЛЕНИЯ ТОВАРА
export const productCreateResetAction = createAsyncThunk(
  'product/create',
  async () => '',
);

// ADMIN ОБНОВЛЕНИЕ ТОВАРА ПО ID (PUT)
export const productUpdateAction = createAsyncThunk(
  'product/update',

  async (
    { productId, name, image, description, price, countInStock },
    { getState, dispatch },
  ) => {
    try {
      const { userInfo } = getState().userLogin;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('countInStock', countInStock);

      await productAPI.put(`/${productId}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      return true;
    } catch (error) {
      const message = error.response?.data.message || error.message;

      switch (message) {
        case 'Не авторизован, нет токена':
        case 'Не авторизован, неверный формат токена':
        case 'Не авторизован, недействительный токен':
        case 'Не авторизован в качестве Администратора':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// ADMIN ОЧИСТКА ОБНОВЛЕНИЯ ТОВАРА
export const productUpdateResetAction = createAsyncThunk(
  'product/update',
  async () => false,
);

// ADMIN УДАЛЕНИЕ ТОВАРА ПО ID (DELETE)
export const productDeleteAction = createAsyncThunk(
  'product/delete',

  async ({ productId }, { getState, dispatch }) => {
    try {
      const { userInfo } = getState().userLogin;

      await productAPI.delete(`/${productId}/delete`, {
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
        case 'Не авторизован в качестве Администратора':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);
