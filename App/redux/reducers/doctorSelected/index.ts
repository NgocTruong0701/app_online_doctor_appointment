import { IDoctorResponse } from "@/redux/type";
import { createSlice } from "@reduxjs/toolkit";

interface IDoctorSelected {
    doctorSelected: IDoctorResponse;
}
const initialState: IDoctorSelected = {
    doctorSelected: {
        specialization_id: 0,
        specialization_name: "",
        specialization_description: "",
        specialization_icon: "",
        id: 0,
        name: "",
        date_of_birth: '',
        gender: 0,
        phone_number: '',
        avatar: '',
        address: '',
        account: 0,
        specializationId: 0,
        hospital: '',
        years_experience: 0,
        description: '',
        averageRating: '',
        feedbackCount: '',
        schedule: '',
        created_at: '',
        updated_at: '',
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