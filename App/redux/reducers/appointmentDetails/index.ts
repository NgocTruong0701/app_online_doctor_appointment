import { createSlice } from "@reduxjs/toolkit";

interface IAppointmentDetails {
    date: string;
    time: string;
    problem: string;
}
const initialState: IAppointmentDetails = {
   date: '',
   time: '',
   problem: '',
};

const appointmentDetails = createSlice({
    name: "appointmentDetails",
    initialState,
    reducers: {
        setAppointmentDate(state, action) {
            const date = action.payload as string;
            state.date = date;
        },
        setAppointmentTime(state, action) {
            const time = action.payload as string;
            state.time = time;
        },
        setProblem(state, action) {
            const problem = action.payload as string;
            state.problem = problem;
        }
    }
});

export const { actions, reducer } = appointmentDetails;