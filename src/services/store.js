import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './api/ingredientsApi';
import constructorReducer from './constructor/constructorSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    burgerConstructor: constructorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});
