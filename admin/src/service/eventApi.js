import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'events',
    }),
    getOneEvent: builder.query({
      query: (id) => `events/${id}`,
    }),
    deleteEvents: builder.mutation({
      query: (id) => ({
        url: `events/${id}`,
        method: 'DELETE',
      }),
    }),
    postEvents: builder.mutation({
      query: (newEvent) => ({
        url: 'events',
        method: 'POST',
        body: newEvent,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateEvent:builder.mutation({
      query:({id,payload})=>({
        url: `events/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  }),
});

export const { useGetEventsQuery, useDeleteEventsMutation, useGetOneEventQuery, usePostEventsMutation,useUpdateEventMutation } = eventApi;
