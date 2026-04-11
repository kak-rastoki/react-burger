import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import API_URL from '../../utils/constants';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => '/ingredients',
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = ingredientsApi;
