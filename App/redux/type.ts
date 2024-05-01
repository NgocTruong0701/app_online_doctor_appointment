export const GET_USER = "GET_USER";
export interface ITimeStamp {
    created_at: string,
    updated_at: string
}
export interface IDoctorResponse extends ITimeStamp {
    id?: number,
    name?: string,
    date_of_birth?: string,
    gender?: number,
    phone_number?: string,
    avatar?: string,
    address?: string,
    specialization?: ISpecialization,
    hospital?: string,
    experience?: number,
}

export interface ISpecialization extends ITimeStamp {
    id: number,
    name: string,
    description: string,
    icon: string,
}