import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

// Configure the store with proper typing
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Uncomment and add the authSliceReducer when it's available
    // auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;