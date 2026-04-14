import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../api/authApi';

const initialState = {
  user: null,
  isAuthChecked: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addMatcher(
        (action) =>
          authApi.endpoints.login.matchFulfilled(action) ||
          authApi.endpoints.register.matchFulfilled(action),
        (state, action) => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;

export default userSlice.reducer;
