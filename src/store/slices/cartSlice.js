import { createSlice, current } from '@reduxjs/toolkit';
import { getCartCount } from '../../utils/calculations';

const initialState = {
  selectedData: JSON.parse(localStorage.getItem('CART_DATA')) || [],
  cartCount: getCartCount(JSON.parse(localStorage.getItem('CART_DATA'))) || 0,
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
      state.cartCount = getCartCount(state.selectedData);
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
      state.cartCount = getCartCount(state.selectedData);
    },
    cleanData(state) {
      console.log('HERE IS AN ORDER');

      let order = {};

      state.selectedData.forEach((selectedItem) => {
        const { id, article, selected, count, name, category, brand } = selectedItem;

        order[article] = {
          id,
          article,
          count,
          selected: JSON.stringify(selected),
          name,
          category,
          brand,
        };
      });
      console.log(order);

      localStorage.setItem('CART_DATA', JSON.stringify([]));
      state.selectedData = JSON.parse(localStorage.getItem('CART_DATA'));
      state.cartCount = getCartCount(state.selectedData);
    },
  },
});

export const { onClickPlus, onClickMinus, cleanData } = cartSlice.actions;
export default cartSlice.reducer;
