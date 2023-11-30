import { configureStore } from '@reduxjs/toolkit';
import { userLogin, userSignup, userUpdate } from './reducers/userReducers';
import cartContents from './reducers/cartReducers';
import {
  productList,
  productItem,
  productReview,
  productCreate,
  productUpdate,
  productDelete,
} from './reducers/productReducers';
import {
  orderDetails,
  orderCreate,
  orderPay,
  orderDelivery,
  orderList,
  orderListAll,
} from './reducers/orderReducers';

const store = configureStore({
  reducer: {
    userLogin: userLogin.reducer,
    userSignup: userSignup.reducer,
    userUpdate: userUpdate.reducer,
    productList: productList.reducer,
    productItem: productItem.reducer,
    productReview: productReview.reducer,
    productCreate: productCreate.reducer,
    productUpdate: productUpdate.reducer,
    productDelete: productDelete.reducer,
    cartContents: cartContents.reducer,
    orderDetails: orderDetails.reducer,
    orderCreate: orderCreate.reducer,
    orderPay: orderPay.reducer,
    orderDelivery: orderDelivery.reducer,
    orderList: orderList.reducer,
    orderListAll: orderListAll.reducer,
  },

  preloadedState: {
    userLogin: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
      loading: false,
      error: null,
    },

    cartContents: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
      paymentMethod: localStorage.getItem('paymentMethod')
        ? JSON.parse(localStorage.getItem('paymentMethod'))
        : '',
      loading: false,
      error: null,
    },
  },
});

export default store;
