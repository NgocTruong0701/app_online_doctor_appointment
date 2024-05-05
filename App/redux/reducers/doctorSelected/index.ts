import { IDoctorResponse } from "@/redux/type";
import { createSlice } from "@reduxjs/toolkit";

interface IDoctorSelected {
    doctorSelected: IDoctorResponse;
}
const initialState: IDoctorSelected = {
    doctorSelected: {
        id: 0,
        name: "",
        avatar: "",
        description: "",
        schedule: "",
        address: "",
        gender: 0,
        created_at: "",
        updated_at: "",
        date_of_birth: "",
        hospital: "",
        phone_number: "",
        specialization: {
            created_at: "",
            description: "",
            icon: "",
            id: 0,
            name: "",
            updated_at: "",
        },
        years_experience: 0,
    }
};

const doctorSelectedSlice = createSlice({
    name: "doctorSelected",
    initialState,
    reducers: {
        setDoctorSelected(state, action) {
            const doctorSelected = action.payload as IDoctorResponse;
            state.doctorSelected = doctorSelected;
        },
    }
});

export const { actions, reducer } = doctorSelectedSlice;