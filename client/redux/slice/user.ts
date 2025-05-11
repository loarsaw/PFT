import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null, // e.g., { email, name }
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
