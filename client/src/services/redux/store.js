import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eventApi } from './eventApi'
import { userApi } from './userApi'
import { hallApi } from './hallApi'
import { couponApi } from './couponApi'
import { orderApi } from './orderApi'

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [hallApi.reducerPath]: hallApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware,userApi.middleware,hallApi.middleware,couponApi.middleware,orderApi.middleware)
})


setupListeners(store.dispatch)