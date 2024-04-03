import { createSlice } from '@reduxjs/toolkit';

const cartContents = createSlice({
  name: 'cartContents',
  initialState: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase('cart/contents/pending', (state) => {
        state.loading = true;
        state.error = null;
      })

      // ADD TO CART
      .addCase('cart/contents/add', (state, action) => {
        const newProduct = action.payload;

        const existProduct = state.cartItems.find(
          (product) => product._id === newProduct._id,
        );

        if (existProduct) {
          state.cartItems = state.cartItems.map((product) =>
            product._id === existProduct._id ? newProduct : product,
          );
        } else {
          state.cartItems.push(newProduct);
        }
        state.loading = false;
        state.error = null;
      })

      // REMOVE FROM CART
      .addCase('cart/contents/remove', (state, action) => {
        state.cartItems = state.cartItems.filter(
          (product) => product._id !== action.payload,
        );
        state.loading = false;
        state.error = null;
      })

      // DELIVERY ADDRESS
      .addCase('cart/contents/shipping', (state, action) => {
        state.shippingAddress = action.payload;
        state.loading = false;
        state.error = null;
      })

      // PAYMENT METHOD
      .addCase('cart/contents/payment', (state, action) => {
        state.paymentMethod = action.payload;
        state.loading = false;
        state.error = null;
      })

      // CLEAR CART
      .addCase('cart/contents/reset', (state) => {
        state.cartItems = [];
        // state.shippingAddress = {};
        state.paymentMethod = '';
        state.loading = false;
        state.error = null;
      })

      .addCase('cart/contents/fulfilled', (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase('cart/contents/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartContents;
