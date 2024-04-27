import axios from "axios";
import { API } from "./api";


const axiosClient = axios.create({
    baseURL: API.BASE_URL,
    timeout: 18000
})



export default axiosClient;