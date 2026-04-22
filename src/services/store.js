import { configureStore } from '@reduxjs/toolkit';

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
