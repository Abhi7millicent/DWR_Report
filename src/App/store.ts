import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from '../features/attendanceSlice';

const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
