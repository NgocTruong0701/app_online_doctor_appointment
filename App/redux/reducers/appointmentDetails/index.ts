import { IDuration, IPackageAppointment } from "@/screens/SelectPackage";
import { createSlice } from "@reduxjs/toolkit";

interface IAppointmentDetails {
    date: string;
    time: string;
    duration: IDuration | null;
    packageAppointment: IPackageAppointment | null;
    problem: string;
}
const initialState: IAppointmentDetails = {
    date: '',
    time: '',
    duration: null,
    packageAppointment: null,
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
        },
        setDuration(state, action) {
            const duration = action.payload as IDuration;
            state.duration = duration;
        },
        setPackage(state, action) {
            const packageAppointment = action.payload as IPackageAppointment;
            state.packageAppointment = packageAppointment;
        }
    }
});

export const { actions, reducer } = appointmentDetails;