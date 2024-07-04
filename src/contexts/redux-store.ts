import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import accountReducer from './account-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
