import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    getOneUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    postUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    updateUser:builder.mutation({
      query:({id,payload})=>({
        url: `users/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
    })
  }),  
});

export const { useDeleteUserMutation,useGetUsersQuery,useGetOneUserQuery,usePostUserMutation,useUpdateUserMutation } = userApi;
