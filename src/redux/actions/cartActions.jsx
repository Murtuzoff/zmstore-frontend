import { createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../api/serverAPI';

// ADD PRODUCT TO CART
export const cartAddAction = createAsyncThunk(
  'cart/contents',

  async ({ productId, quantity }, { dispatch, getState }) => {
    try {
      const { data } = await productAPI.get(`/${productId}`);

      dispatch({
        type: 'cart/contents/add',
        payload: {
          _id: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          quantity: Number(quantity),
        },
      });

      const { cartItems } = getState().cartContents;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// REMOVE PRODUCT FROM CART
export const cartRemoveAction = createAsyncThunk(
  'cart/contents',

  async ({ productId }, { dispatch, getState }) => {
    try {
      dispatch({
        type: 'cart/contents/remove',
        payload: productId,
      });

      const { cartItems } = getState().cartContents;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// SAVE DELIVERY ADDRESS
export const cartShippingAction = createAsyncThunk(
  'cart/contents',

  async ({ address, city, postalCode, country }, { dispatch }) => {
    try {
      dispatch({
        type: 'cart/contents/shipping',
        payload: { address, city, postalCode, country },
      });

      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({ address, city, postalCode, country }),
      );
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// SAVE PAYMENT METHOD
export const cartPaymentAction = createAsyncThunk(
  'cart/contents',

  async ({ paymentMethod }, { dispatch }) => {
    try {
      dispatch({
        type: 'cart/contents/payment',
        payload: paymentMethod,
      });

      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);

// CLEAR CART
export const cartResetAction = createAsyncThunk(
  'cart/contents',

  async (_, { dispatch }) => {
    try {
      dispatch({
        type: 'cart/contents/reset',
      });

      localStorage.removeItem('cartItems');
      localStorage.removeItem('paymentMethod');
    } catch (error) {
      throw error.response?.data.message || error.message;
    }
  },
);
