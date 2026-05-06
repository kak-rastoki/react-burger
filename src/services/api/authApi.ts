import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import API_URL from '@/utils/constants';
import { setTokens, dropTokens } from '@/utils/token';

import type { TUser } from '@/utils/baseTypes';

// --- ИНТЕРФЕЙСЫ ОТВЕТОВ СЕРВЕРА
type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

type TUserResponse = {
  success: boolean;
  user: TUser;
};

type TMessageResponse = {
  success: boolean;
  message: string;
};

// --БАЗОВЫЙ ЗАПРОС ---
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

// --- ТИПИЗАЦИЯ ОБЕРТКИ REFRESH---
const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
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

    if (refreshResult.data) {
      const data = refreshResult.data as TAuthResponse;
      setTokens(data.accessToken, data.refreshToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      dropTokens();
    }
  }

  return result;
};

// ---ОПИСАНИЕ API---
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getUser: builder.query<TUserResponse, void>({
      query: () => 'auth/user',
    }),

    updateUser: builder.mutation<TUserResponse, Partial<TUser> & { password?: string }>({
      query: (data) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: data,
      }),
    }),

    register: builder.mutation<TAuthResponse, TUser & { password: string }>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTokens(data.accessToken, data.refreshToken);
        } catch (err) {
          console.error('api error:', err);
        }
      },
    }),

    login: builder.mutation<TAuthResponse, Omit<TUser, 'name'> & { password: string }>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setTokens(data.accessToken, data.refreshToken);
        } catch (err) {
          console.error('api error:', err);
        }
      },
    }),

    logout: builder.mutation<TMessageResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          dropTokens();
        } catch (err) {
          console.error('api error:', err);
        }
      },
    }),

    forgotPassword: builder.mutation<TMessageResponse, string>({
      query: (email) => ({
        url: 'password-reset',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<
      TMessageResponse,
      Record<'password' | 'token', string>
    >({
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
