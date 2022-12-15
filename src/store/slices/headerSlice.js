import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reqCategories, reqCurrencies } from '../../graphql/requests';

export const fetchCategories = createAsyncThunk('header/fetchCategories', async () => {
  const data = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query: reqCategories }),
  });

  return await data.json();
});
export const fetchCurrencies = createAsyncThunk('header/fetchCurrencies', async () => {
  const data = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query: reqCurrencies }),
  });

  return await data.json();
});
const initialState = {
  isActive: false,
  currency: { label: 'USD', symbol: '$' },
  category: 'all',
  isDrawerOpen: false,
  categoriesData: '',
  categorieStatus: 'loading',
  currenciesData: '',
  currencieStatus: 'loading',
};
const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    onClickActive(state) {
      state.isActive = !state.isActive;
    },
    onClickClose(state) {
      state.isActive = false;
    },
    onClickCurrency(state, { payload }) {
      state.currency = payload;
    },
    setIsDrawerOpen(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerClose(state) {
      state.isDrawerOpen = false;
    },

    setCategory(state, { payload }) {
      state.category = payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.categorieStatus = 'loading';
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.categoriesData = payload.data.categories;
      state.categorieStatus = 'loaded';
    },
    [fetchCategories.rejected]: (state) => {
      state.categorieStatus = 'error';
    },
    [fetchCurrencies.pending]: (state) => {
      state.currencieStatus = 'loading';
    },
    [fetchCurrencies.fulfilled]: (state, { payload }) => {
      state.currenciesData = payload.data.currencies;
      state.currencieStatus = 'loaded';
    },
    [fetchCurrencies.rejected]: (state) => {
      state.currencieStatus = 'error';
    },
  },
});

export const {
  onClickActive,
  onClickCurrency,
  setIsDrawerOpen,
  setCategory,
  onClickClose,
  setDrawerClose,
} = headerSlice.actions;

export default headerSlice.reducer;
