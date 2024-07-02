import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eventApi } from './eventApi'
import wishlistSlice from '../../features/wishlist/wishlistSlice'
import { userApi } from './userApi'

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware,userApi.middleware)
})


setupListeners(store.dispatch)