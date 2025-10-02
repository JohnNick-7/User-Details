import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import loginReducer from './slices/loginSlice.ts';
import loaderReducer from './slices/loaderSlice.ts';

export const store = configureStore({
  reducer: {
    users: userReducer,
    login: loginReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// User Selectors
export const selectUsers = (state: RootState) => state.users;
export const selectDisplayedUsers = (state: RootState) => state.users.displayedUsers;
export const selectPagination = (state: RootState) => ({
  currentPage: state.users.currentPage,
  totalPages: state.users.totalPages,
  itemsPerPage: state.users.itemsPerPage,
});
export const selectSearch = (state: RootState) => state.users.searchQuery;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

// Login Selectors
export const selectLogin = (state: RootState) => state.login;
export const selectToken = (state: RootState) => state.login.token;
export const selectUsername = (state: RootState) => state.login.username;
export const selectLoginLoading = (state: RootState) => state.login.loading;
export const selectLoginError = (state: RootState) => state.login.error;

// Loader Selectors
export const selectLoaderState = (state: RootState) => state.loader.loading;
