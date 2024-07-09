import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: () => 'coupons',
    }),
    getOneCoupon: builder.query({
      query: (id) => `coupons/${id}`,
    }),
    deleteCoupons: builder.mutation({
      query: (id) => ({
        url: `coupons/${id}`,
        method: 'DELETE',
      }),
    }),
    postCoupons: builder.mutation({
      query: (newEvent) => ({
        url: 'coupons',
        method: 'POST',
        body: newEvent,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    updateCoupon:builder.mutation({
      query:(id,payload)=>({
        url: `coupons/${id}`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  }),  
});

export const {useDeleteCouponsMutation,useGetCouponQuery,useGetOneCouponQuery,usePostCouponsMutation } = couponApi;
