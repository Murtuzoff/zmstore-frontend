import { createSlice } from '@reduxjs/toolkit';

// ЗАПРОС ВСЕХ ТОВАРОВ (GET)
export const productList = createSlice({
  name: 'productList',
  initialState: {
    productArray: [],
    pageCurrent: null,
    pageCount: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/list/pending', (state) => {
        state.productArray = [];
        state.loading = true;
        state.error = null;
      })
      .addCase('product/list/fulfilled', (state, action) => {
        state.productArray = action.payload.productArray;
        state.pageCurrent = action.payload.pageCurrent;
        state.pageCount = action.payload.pageCount;
        state.loading = false;
        state.error = null;
      })
      .addCase('product/list/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ЗАПРОС ТОВАРА ПО ID (GET)
export const productItem = createSlice({
  name: 'productItem',
  initialState: {
    productInfo: { reviews: [] },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/item/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('product/item/fulfilled', (state, action) => {
        state.productInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('product/item/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// USER ДОБАВЛЕНИЕ НОВОГО ОТЗЫВА ПО ID ТОВАРА (POST)
export const productReview = createSlice({
  name: 'productReview',
  initialState: {
    message: '',
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/review/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('product/review/fulfilled', (state, action) => {
        state.message = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('product/review/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ADMIN ДОБАВЛЕНИЕ ТОВАРА (POST)
export const productCreate = createSlice({
  name: 'productCreate',
  initialState: {
    productId: '',
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/create/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('product/create/fulfilled', (state, action) => {
        state.productId = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('product/create/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ADMIN ОБНОВЛЕНИЕ ТОВАРА ПО ID (PUT)
export const productUpdate = createSlice({
  name: 'productUpdate',
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/update/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('product/update/fulfilled', (state, action) => {
        state.success = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('product/update/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ADMIN УДАЛЕНИЕ ТОВАРА ПО ID (DELETE)
export const productDelete = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('product/delete/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('product/delete/fulfilled', (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase('product/delete/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
