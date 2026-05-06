import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '../api/authApi';

import type { TUser } from '@/utils/baseTypes';

import type { RootState } from '../store';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state: TUserState, action: PayloadAction<boolean>): void => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state: TUserState, action: PayloadAction<TUser | null>): void => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.getUser.matchFulfilled,
        (state: TUserState, action: PayloadAction<{ user: TUser }>): void => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(authApi.endpoints.getUser.matchRejected, (state: TUserState): void => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addMatcher(
        (action): boolean =>
          authApi.endpoints.login.matchFulfilled(action) ||
          authApi.endpoints.register.matchFulfilled(action),
        (state: TUserState, action: PayloadAction<{ user: TUser }>): void => {
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state: TUserState): void => {
        state.user = null;
      });
  },
  selectors: {
    selectUser: (state: TUserState): TUser | null => state.user,
    selectIsAuthChecked: (state: TUserState): boolean => state.isAuthChecked,
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export const selectUser = (state: RootState): TUser | null => state.user.user;
export const selectIsAuthChecked = (state: RootState): boolean =>
  state.user.isAuthChecked;

export default userSlice.reducer;
