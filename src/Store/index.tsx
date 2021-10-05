import { configureStore } from '@reduxjs/toolkit';
import * as MySlice from '../feature/mySlice';

export const store = configureStore({
  reducer : {
    data: MySlice.default
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDisatch = typeof store.dispatch;