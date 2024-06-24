import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
    }),
    getOneUsers: builder.query({
        query: (id) => `users/${id}`,
      }),
      deleteUsers: builder.mutation({
        query: (id) => ({
            url:`users/${id}`,
            method:'DELETE'
        }),
      }),
      postUsers: builder.mutation({
        query: (newEvent) => ({
            url:`users`,
            method:'POST',
            body:newEvent,
            headers:{
                "Content-type":'application/json'
            }
        }),
      }),
  }),
})


export const { useDeleteUsersMutation,useGetOneUsersQuery,usePostUsersMutation,useGetUsersQuery} = userApi