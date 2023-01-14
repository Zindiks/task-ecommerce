import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    headerSlice,
    cartSlice,
  },
});

export default store;
