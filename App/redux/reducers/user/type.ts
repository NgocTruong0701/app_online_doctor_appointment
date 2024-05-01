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