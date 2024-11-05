import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/api/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:5000/api/products', product, {
    headers: { Authorization: `Bearer ${token}` },
  });
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export const selectAllProducts = (state) => state.products.products;

export default productSlice.reducer;
