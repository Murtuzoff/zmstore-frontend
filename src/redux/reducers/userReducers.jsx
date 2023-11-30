import { createSlice } from '@reduxjs/toolkit';

// АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
export const userLogin = createSlice({
  name: 'userLogin',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('user/login/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('user/login/fulfilled', (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('user/login/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
export const userSignup = createSlice({
  name: 'userSignup',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('user/signup/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('user/signup/fulfilled', (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase('user/signup/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ USER
export const userUpdate = createSlice({
  name: 'userUpdate',
  initialState: {
    userId: '',
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase('user/update/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('user/update/fulfilled', (state, action) => {
        state.userId = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase('user/update/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
