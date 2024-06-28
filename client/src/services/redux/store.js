import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { eventApi } from './eventApi'

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware)
})


setupListeners(store.dispatch)