import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice.ts";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
