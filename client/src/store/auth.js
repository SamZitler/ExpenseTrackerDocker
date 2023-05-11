import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;   
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions

export default authSlice.reducer