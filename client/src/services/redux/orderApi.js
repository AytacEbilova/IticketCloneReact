import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => 'orders',
    }),
    getOneOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
    }),
    postOrder: builder.mutation({
      query: (newEvent) => ({
        url: 'orders',
        method: 'POST',
        body: newEvent,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    updateOrder:builder.mutation({
      query:(id,payload)=>({
        url: `orders/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  }),  
});

export const {useDeleteOrderMutation,useGetOneOrderQuery,useGetOrdersQuery,usePostOrderMutation } = orderApi;
