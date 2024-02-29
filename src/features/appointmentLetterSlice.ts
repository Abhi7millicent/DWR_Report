import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentLetterItem {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;
    annualSalary: string;
    monthlySalary: string;
}

interface AppointmentLetterState {
    loading: boolean;
    data: AppointmentLetterItem | [];
    error: string | null;
}

const initialState: AppointmentLetterState = {
    loading: false,
    data: [],
    error: null,
};

const appointmentLetterSlice = createSlice({
    name: 'appointmentLetter',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchEmployeeDataSuccess(state, action: PayloadAction<{ firstName: string; lastName: string; email: string; role: string }>) {
            state.loading = false;
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        },
        fetchAddressDataSuccess(state, action: PayloadAction<{ addressLine1: string; addressLine2: string; pinCode: string; city: string; state: string; country: string }>) {
            state.loading = false;
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        },
        fetchSalaryDataSuccess(state, action: PayloadAction<{ annualSalary: string; monthlySalary: string }>) {
            state.loading = false;
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        },
        fetchDataFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataStart, fetchEmployeeDataSuccess, fetchAddressDataSuccess, fetchSalaryDataSuccess, fetchDataFailure } = appointmentLetterSlice.actions;

export default appointmentLetterSlice.reducer;
