import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { ingredientsApi } from './api/ingredientsApi';

const rootReducer = combineSlices(ingredientsApi);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});
