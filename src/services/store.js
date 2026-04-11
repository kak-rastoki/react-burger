import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './api/ingredientsApi';
import constructorReducer from './constructor/constructorSlice';
import ingredientDetailsReducer from './ingredient/ingredientSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});
