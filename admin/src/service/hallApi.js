import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hallApi = createApi({
  reducerPath: 'hallApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getHalls: builder.query({
      query: () => 'halls',
    }),
    getOneHall: builder.query({
      query: (id) => `halls/${id}`,
    }),
    deleteHalls: builder.mutation({
      query: (id) => ({
        url: `halls/${id}`,
        method: 'DELETE',
      }),
    }),
    postHalls: builder.mutation({
      query: (newHalls) => ({
        url: 'halls',
        method: 'POST',
        body: newHalls,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useDeleteHallsMutation,useGetHallsQuery,useGetOneHallQuery,usePostHallsMutation } = hallApi;
