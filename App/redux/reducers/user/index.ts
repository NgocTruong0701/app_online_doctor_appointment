import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser } from "./thunk";
import { IDoctor, IPatient } from "./type";

export interface IUser {
    id?: number;
    email?: string;
    patient?: IPatient;
    doctor?: IDoctor;
    role?: string;
    verified?: boolean;
}
const initialState: IUserInfo = {
    user: {
        id: 0,
        doctor: undefined,
        email: "",
        patient: undefined,
        role: "",
        verified: false,
    }
};

export interface IUserInfo {
    user: IUser;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state) { },
    },
    extraReducers(builder) {
        builder.addCase(
            getUser.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.user = { ...action.payload }
            },
        );
    },
});

export const { actions, reducer } = userSlice;
