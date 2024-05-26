import { IUser } from "."

export interface IPatient {
    id: number,
    name: string,
    date_of_birth: string,
    gender: number,
    phone_number: string,
    avatar: string,
    address: string
}

export interface IDoctor {
    id: number,
    name: string,
    date_of_birth: string,
    gender: number,
    phone_number: string,
    avatar: string,
    address: string,
    hospital: string,
    description: string,
    years_experience: number,
    start_day_of_week: string,
    end_day_of_week: string,
    time_start: string,
    time_end: string,
    specialization: ISpecializtion
}

export interface ISpecializtion {
    id: number,
    name: string,
    description: string,
    icon: string
}

export interface ITypeUserResponse {
    data: IUser,
    statusCode: number,
    message: string
}