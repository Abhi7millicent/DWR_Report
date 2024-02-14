import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceItem {
  id: number;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  dwrFlag: string;
  deleteflag: string;
  statusflag: string;
}

interface AttendanceState {
    loading: boolean;
  data: AttendanceItem | null; // Define your data type here
  error: string | null;
}

const initialState: AttendanceState = {
    loading: false,
    data: null,
    error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = attendanceSlice.actions;

export default attendanceSlice.reducer;
