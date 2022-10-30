import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (query) => {
  const data = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  return await data.json();
});

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (query) => {
    const data = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    return await data.json();
  },
);

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
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      //! [MIDDLEWARE] //////// for Each attribute adds extra object .selected
      const products = payload.data.category.products.map((productItem) => {
        const newAttributes =
          productItem.attributes.length > 0 &&
          productItem.attributes.map((item) => {
            return { ...item, selected: item.items[0] };
          });
        const { attributes, ...data } = productItem;
        const product = Object.assign(data, { attributes: newAttributes });
        if (productItem.attributes.length > 0) {
          productItem = product;
        }

        return productItem;
      });
      state.data = { data: { category: { products } } };

      //! [ENDS] ////////////  for attribute adds extra object .selected
      state.status = 'loaded';
    },
    [fetchProducts.rejected]: (state) => {
      state.data = '';
      state.status = 'error';
    },
    [fetchProductDetails.pending]: (state) => {
      state.selectedStatus = 'loading';
    },
    [fetchProductDetails.fulfilled]: (state, { payload }) => {
      //! [MIDDLEWARE] //////

      const newAttributes =
        payload.data.product.attributes.length > 0 &&
        payload.data.product.attributes.map((item) => {
          return { ...item, selected: item.items[0] };
        });
      const { attributes, ...data } = payload.data.product;
      const product = Object.assign(data, { attributes: newAttributes });

      if (payload.data.product.attributes.length > 0) {
        state.selected = { data: { product: product } };
      } else {
        state.selected = payload;
      }
      //! [ENDS] ////////////

      state.selectedStatus = 'loaded';
    },
    [fetchProductDetails.rejected]: (state) => {
      state.selected = '';
      state.selectedStatus = 'error';
    },
  },
});

export const { setSelectedToEpmty, updateSelectedAttribute } = productSlice.actions;

export default productSlice.reducer;
