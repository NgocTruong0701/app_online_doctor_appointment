import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser } from "./thunk";
import { ITypeUserResponse } from "./type";

export interface IUser {
    id?: number;
    name?: string;
    email: string;
    avatar?: string;
    phone?: string;
    birthDay?: string;
    gender?: number;
    address?: string;
}
const initialState: IUserInfo = {
    user: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        birthDay: "",
        gender: 0,
        address: "",
    },
    isLoading: false
};

export interface IUserInfo {
    user: IUser;
    isLoading: boolean
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state) { },
        showLoading(state){
            return {...state, isLoading: true}
        },
        hideLoading(state){
            return {...state, isLoading: false}
        }
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
