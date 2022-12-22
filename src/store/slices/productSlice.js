import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
  status: 'loading',
  selected: '',
  selectedStatus: 'loading',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateSelectedAttribute(state, { payload }) {
      state.selected.data.product.article = '';
      let article = state.selected.data.product.id;

      const { name, ...rest } = payload;

      const attributes =
        state.selected.data.product.attributes.length > 0 && state.selected.data.product.attributes;

      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name === name) {
          attributes[i].selected = rest;
        }
      }

      for (let i = 0; i < attributes.length; i++) {
        article = article + `-${attributes[i].selected.id}`;
      }

      state.selected.data.product.attributes = attributes;
      state.selected.data.product.article = article;
    },

    setSelectedToEpmty(state) {
      state.selected = '';
    },
  },
});

export const { setSelectedToEpmty, updateSelectedAttribute } = productSlice.actions;

export default productSlice.reducer;
