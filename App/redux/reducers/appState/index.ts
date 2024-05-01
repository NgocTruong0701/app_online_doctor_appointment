import { createSlice } from "@reduxjs/toolkit";

export interface IAppState {
    isLoading: boolean,
    isLogin: boolean,
}

const initialState: IAppState = {
    isLoading: false,
    isLogin: false,
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
        }
    }
});

export const { actions, reducer } = appStateSlice;