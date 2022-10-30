import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  selectedData: [],
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
    },
    onClickMinus(state, { payload }) {
      const findItem = state.selectedData.find((item) => item.article === payload.article);

      if (findItem) {
        findItem.count--;
      }

      if (findItem.count < 1) {
        state.selectedData = state.selectedData.filter((item) => item !== findItem);
      }
    },
    cleanData(state) {
      console.log('TRANSFER DATA TO ANOTHER SERVER...!!!');
      console.log(current(state.selectedData));
      state.selectedData = [];
    },
  },
});

export const { onClickPlus, onClickMinus, cleanData } = cartSlice.actions;
export default cartSlice.reducer;
