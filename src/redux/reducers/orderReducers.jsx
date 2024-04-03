import { createSlice } from '@reduxjs/toolkit';

// GET ORDER BY ID (GET)
export const orderDetails = createSlice({
  name: 'orderDetails',
  initialState: {
    orderInfo: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/details/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/details/fulfilled', (state, action) => {
        state.orderInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('order/details/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ADD ORDER (POST)
export const orderCreate = createSlice({
  name: 'orderCreate',
  initialState: {
    orderId: '',
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/create/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/create/fulfilled', (state, action) => {
        state.orderId = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('order/create/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// PAY BY ORDER ID (PUT)
export const orderPay = createSlice({
  name: 'orderPay',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/pay/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/pay/fulfilled', (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase('order/pay/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// DELIVERY BY ORDER ID (PUT)
export const orderDelivery = createSlice({
  name: 'orderDelivery',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/delivery/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/delivery/fulfilled', (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase('order/delivery/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// USER GET ORDER LIST (GET)
export const orderList = createSlice({
  name: 'orderList',
  initialState: {
    orderArray: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/list/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/list/fulfilled', (state, action) => {
        state.orderArray = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('order/list/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ADMIN GET ALL ORDER LIST (GET)
export const orderListAll = createSlice({
  name: 'orderListAll',
  initialState: {
    orderArray: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('order/listAll/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('order/listAll/fulfilled', (state, action) => {
        state.orderArray = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('order/listAll/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
