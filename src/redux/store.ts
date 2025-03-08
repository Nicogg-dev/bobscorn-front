// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import clientsSlice from './features/clients/clients.slice';

export const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
