export const API = {
    POST: "post",
    GET: "get",
    PUT: "put",
    BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,

    API_GET_DOCTORS: '/doctors',
    LOGIN_GOOGLE: '/auth/login-google',
    API_GET_USER: '/users/profile',
    API_GET_SPECIALIZATIONS: '/specializations',
    API_BASE_FEEDBACK: '/feedbacks',
    API_GET_COUNT_PATIENT_BY_DOCTOR: '/doctors/count-patients',
    API_GET_TIMEWORKING: '/doctors/get-timeworking',
    API_BASE_PATIENT: '/patients',
    API_GET_APPOINTMENT_BY_USERID: '/appointments/get-by-user',
}