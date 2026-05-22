import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import API_URL from '../../utils/constants';

import type { TIngredient } from '@/utils/baseTypes';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

type TOrderData = {
  ingredients: string[];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => '/ingredients',
    }),
    createOrder: builder.mutation<TOrderResponse, TOrderData>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = ingredientsApi;
