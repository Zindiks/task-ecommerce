import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reqCategories, reqCurrencies } from '../../graphql/queries';

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
  currency: JSON.parse(localStorage.getItem('CURRENCY')) || null,
  category: '',
  isDrawerOpen: false,
  categoriesData: '',
  categorieStatus: '',
  currenciesData: '',
  currencieStatus: '',
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

      if (state.currency === null) {
        state.currency = payload.data.currencies[0]; //NOTE: first currency option by default
      }
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
