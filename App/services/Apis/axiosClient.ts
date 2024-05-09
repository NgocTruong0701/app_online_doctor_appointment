import axios, { InternalAxiosRequestConfig } from "axios";
import { API } from "./api";
import { storage } from "@/localStorage";
import { ResponseStatus } from "@/constants/constants";
import { useNavigation } from "@react-navigation/native";
import { navigate } from "@/navigations/Root";


const axiosClient = axios.create({
    baseURL: API.BASE_URL,
    timeout: 18000
})

interface ConfigType {
    headerContentType: string;
}

axiosClient.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig<ConfigType>) {
        // console.log(JSON.stringify(config, null, 2));
        // !config.headers.hideLoading && store.dispatch(actions.showLoading());
        const accessToken = storage.getString('token');
        const headers = {
            "Content-Type": config?.data?.headerContentType || "application/json",
        };
        config.headers = {
            ...headers,
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${accessToken ? accessToken : ""}`,
            hideLoading: config.headers.hideLoading,
        } as any;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    function (response) {
        // !response.config.headers.hideLoading &&
        //     store.dispatch(actions.hideLoading());
        return response;
    },
    async function (error) {
        // !error.config.headers.hideLoading && store.dispatch(actions.hideLoading());
        const accessToken = storage.getString('token');
        if (error?.response?.status === ResponseStatus.UNAUTHORIZED) {
            accessToken && storage.set('token', "");
            storage.clearAll();
            navigate('Login');
        }
        storage.clearAll();
        navigate('Login');
        return Promise.reject(error);
    },
);

export default axiosClient;