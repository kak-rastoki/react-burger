import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { authApi } from './api/authApi';
import { ingredientsApi } from './api/ingredientsApi';
import constructorReducer from './constructor/constructorSlice';
import ingredientDetailsReducer from './ingredient/ingredientSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
