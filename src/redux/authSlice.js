import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await axios.post('http://localhost:5000/auth/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data.token;
});

export const registerUser = createAsyncThunk('auth/register', async ({ username, email, password }) => {
  await axios.post('http://localhost:5000/auth/register', { username, email, password });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'succeeded';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
