// import { configureStore } from '@reduxjs/toolkit';
// import headerSlice from './slices/headerSlice';

// const store = configureStore({
//   reducer: {
//     headerSlice,
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';

// export const reducer = combineReducers({
//   headerReducer,
// });

const store = configureStore({
  reducer: {
    headerSlice,
    productSlice,
    cartSlice,
  },
});

export default store;
