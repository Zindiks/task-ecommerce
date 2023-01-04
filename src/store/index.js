import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    headerSlice,
    productSlice,
    cartSlice,
  },
});

export default store;
