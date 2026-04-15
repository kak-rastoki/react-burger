import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import API_URL from '@/utils/constants';
import { setTokens, dropTokens } from '@/utils/token';

const baseQuery = fetchBaseQuery({
  // dдоставляет токен в заголовки
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  // рефреш автоматом
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/token',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      },
      api,
      extraOptions
    );

    if (refreshResult.data && refreshResult.data.success) {
      setTokens(refreshResult.data.accessToken, refreshResult.data.refreshToken); // функция из token.js
      result = await baseQuery(args, api, extraOptions);
    } else {
      dropTokens();
      return result;
    }
    return result;
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getUser: builder.query({
      //получить email и name юзера
      query: () => 'auth/user',
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: data,
      }),
    }),
    register: builder.mutation({
      // регистрация
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTokens(data.accessToken, data.refreshToken);
        } catch (err) {
          console.log('api error:', err);
        }
      },
    }),
    login: builder.mutation({
      // авторизация
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTokens(data.accessToken, data.refreshToken);
        } catch (err) {
          console.log('api error:', err);
        }
      },
    }),
    logout: builder.mutation({
      // выход пользователя
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          dropTokens();
        } catch (err) {
          console.log('api error:', err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: 'password-reset',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
