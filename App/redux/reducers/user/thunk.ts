import { createAsyncThunk } from "@reduxjs/toolkit";
import * as types from "../../type";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { ITypeUserResponse } from "./type";

export const getUser = createAsyncThunk(
    types.GET_USER,
    (hideLoading?: boolean) => {
        return axiosClient
            .get(API.API_GET_USER)
            .then((response) => {
                return response.data.data;
            })
            .catch((err) => {
                throw err;
            });
    },
);
