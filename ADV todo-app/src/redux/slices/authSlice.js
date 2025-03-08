import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/localStorage';

const initialState = loadState('auth') || {
  isAuthenticated: false,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      saveState('auth', state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveState('auth', state);
    },
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      saveState('auth', state);
    },
    authError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { login, logout, registerSuccess, authError } = authSlice.actions;
export default authSlice.reducer;