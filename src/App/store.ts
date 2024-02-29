import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from '../features/attendanceSlice';
import appointmentLetterReducer from '../features/appointmentLetterSlice';

const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
    appointmentLetter: appointmentLetterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
