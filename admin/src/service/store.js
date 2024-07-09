import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eventApi } from './eventApi'
import { userApi } from './userApi'
import { hallApi } from './hallApi'
import { orderApi } from './orderApi'
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [hallApi.reducerPath]: hallApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware,userApi.middleware,hallApi.middleware,orderApi.middleware)
})


setupListeners(store.dispatch)