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
    deleteHall: builder.mutation({
      query: (id) => ({
        url: `halls/${id}`,
        method: 'DELETE',
      }),
    }),
    postHall: builder.mutation({
      query: (newEvent) => ({
        url: 'halls',
        method: 'POST',
        body: newEvent,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    updateHall:builder.mutation({
      query:(id,payload)=>({
        url: `halls/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  }),  
});

export const { useGetHallsQuery,useGetOneHallQuery,useDeleteHallMutation,usePostHallMutation} = hallApi;
