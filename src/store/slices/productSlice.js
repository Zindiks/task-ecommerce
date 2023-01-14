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
  reducers: {},
});

export const {
  setSelectedToEpmty,
  updateSelectedAttribute,
  setSelectedAttributes,
  setSelectedAttributesToEmpty,
} = productSlice.actions;

export default productSlice.reducer;
