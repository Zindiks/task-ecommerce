import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  selectedData: JSON.parse(localStorage.getItem('CART_DATA')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onClickPlus(state, { payload }) {
      const findItem = state.selectedData.find((item) => item.article === payload.article);
      if (findItem) {
        findItem.count++;
      } else {
        state.selectedData.push({ ...payload, count: 1 });
      }
      localStorage.setItem('CART_DATA', JSON.stringify(state.selectedData));
    },
    onClickMinus(state, { payload }) {
      const findItem = state.selectedData.find((item) => item.article === payload.article);

      if (findItem) {
        findItem.count--;
      }

      if (findItem.count < 1) {
        state.selectedData = state.selectedData.filter((item) => item !== findItem);
      }

      localStorage.setItem('CART_DATA', JSON.stringify(state.selectedData));
    },
    cleanData(state) {
      console.log('TRANSFER DATA TO ANOTHER SERVER...!!!');
      console.log(current(state.selectedData));
      localStorage.setItem('CART_DATA', JSON.stringify([]));
      state.selectedData = JSON.parse(localStorage.getItem('CART_DATA'));
    },
  },
});

export const { onClickPlus, onClickMinus, cleanData } = cartSlice.actions;
export default cartSlice.reducer;
