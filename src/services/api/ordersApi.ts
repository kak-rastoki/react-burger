import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import API_URL from '@/utils/constants';
import { setTokens } from '@/utils/token';

import type { TWSResponse, TOrder } from '@/utils/baseTypes';

type TSingleOrderResponse = {
  success: boolean;
  orders: TOrder[];
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getFeed: builder.query<TWSResponse, void>({
      queryFn: () => ({ data: { success: false, orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(
          'wss://new-stellarburgers.education-services.ru/orders/all'
        );

        try {
          await cacheDataLoaded;
          ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.success) {
              updateCachedData((draft) => {
                draft.success = data.success;
                draft.orders = data.orders;
                draft.total = data.total;
                draft.totalToday = data.totalToday;
              });
            }
          });
        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getProfileOrders: builder.query<TWSResponse, void>({
      queryFn: () => ({ data: { success: false, orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const token = Cookies.get('accessToken')?.replace('Bearer ', '');
        let ws = new WebSocket(
          `wss://new-stellarburgers.education-services.ru/orders?token=${token}`
        );

        try {
          await cacheDataLoaded;

          const handleMessage = async (event: MessageEvent): Promise<void> => {
            const data = JSON.parse(event.data);

            if (data.message === 'Invalid or missing token') {
              ws.close();
              const refreshToken = localStorage.getItem('refreshToken');
              if (refreshToken) {
                try {
                  const res = await fetch(`${API_URL}/auth/token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: refreshToken }),
                  });
                  const refreshData = await res.json();
                  if (refreshData.success) {
                    setTokens(refreshData.accessToken, refreshData.refreshToken);
                    const newToken = refreshData.accessToken.replace('Bearer ', '');
                    ws = new WebSocket(
                      `wss://new-stellarburgers.education-services.ru/orders?token=${newToken}`
                    );
                    ws.addEventListener('message', handleMessage);
                  }
                } catch (err) {
                  console.error(err);
                }
              }
              return;
            }

            if (data.success) {
              updateCachedData((draft) => {
                draft.success = data.success;
                draft.orders = data.orders;
                draft.total = data.total;
                draft.totalToday = data.totalToday;
              });
            }
          };

          ws.addEventListener('message', handleMessage);
        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getOrderById: builder.query<TSingleOrderResponse, string>({
      query: (orderId) => `/orders/${orderId}`,
    }),
  }),
});

export const { useGetFeedQuery, useGetProfileOrdersQuery, useGetOrderByIdQuery } =
  ordersApi;
