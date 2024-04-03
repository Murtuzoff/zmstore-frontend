import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api/serverAPI';
import { userLogoutAction } from './userActions';

// GET ALL PRODUCTS (GET)
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

// GET PRODUCT BY ID (GET)
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

// ADD REVIEW BY PRODUCT ID (POST)
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

// CLEAR ADD REVIEW
export const productReviewResetAction = createAsyncThunk(
  'product/review',
  async () => '',
);

// ADD PRODUCT (POST)
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
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
        case 'Not authorized as an Admin':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// CLEAR ADD PRODUCT
export const productCreateResetAction = createAsyncThunk(
  'product/create',
  async () => '',
);

// UPDATE PRODUCT BY ID (PUT)
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
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
        case 'Not authorized as an Admin':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);

// CLEAR UPDATE PRODUCT
export const productUpdateResetAction = createAsyncThunk(
  'product/update',
  async () => false,
);

// DELETE PRODUCT BY ID (DELETE)
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
        case 'Not authorized, no token':
        case 'Not authorized, incorrect token format':
        case 'Not authorized, invalid token':
        case 'Not authorized as an Admin':
          await dispatch(userLogoutAction());
          throw message;

        default:
          throw message;
      }
    }
  },
);
