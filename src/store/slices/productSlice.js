import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'loading',
  selected: '',
  selectedStatus: 'loading',
  selectedAttributes: [],
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
    setSelectedAttributes(state, { payload }) {
      const index = state.selectedAttributes.findIndex((item) => item.type === payload.type);

      if (index !== -1) {
        // Replace the object
        state.selectedAttributes.splice(index, 1, payload);
      } else {
        // Add the new object to the end of the array
        state.selectedAttributes.push(payload);
      }
    },
    setSelectedAttributesToEmpty(state) {
      state.selectedAttributes = [];
    },
  },
});

export const {
  setSelectedToEpmty,
  updateSelectedAttribute,
  setSelectedAttributes,
  setSelectedAttributesToEmpty,
} = productSlice.actions;

export default productSlice.reducer;
