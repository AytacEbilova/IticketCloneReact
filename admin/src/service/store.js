import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eventApi } from './eventApi'
import { userApi } from './userApi'
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware,userApi.middleware)
})


setupListeners(store.dispatch)