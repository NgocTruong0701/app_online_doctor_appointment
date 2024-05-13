import { createSlice } from "@reduxjs/toolkit";

export interface IAppState {
    isLoading: boolean,
    isLogin: boolean,
    emailSignup: string,
}

const initialState: IAppState = {
    isLoading: false,
    isLogin: false,
    emailSignup: '',
};

const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        showLoading(state) {
            return { ...state, isLoading: true }
        },
        hideLoading(state) {
            return { ...state, isLoading: false }
        },
        login(state) {
            return { ...state, isLogin: true }
        },
        logout(state) {
            return { ...state, isLogin: false }
        },
        setEmailSignup(state, action) {
            const email = action.payload as string;
            state.emailSignup = email;
        }
    }
});

export const { actions, reducer } = appStateSlice;