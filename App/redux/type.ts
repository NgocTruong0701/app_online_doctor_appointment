export const GET_USER = "GET_USER";

export interface ITimeStamp {
    created_at: string,
    updated_at: string
}
export interface IDoctorResponse extends ITimeStamp {
    specialization_id: number
    specialization_name: string
    specialization_description: string
    specialization_icon: string
    id: number
    name: string
    date_of_birth: string
    gender: number
    phone_number: string
    avatar: string
    address: string
    account: number
    specializationId: number
    hospital: string
    years_experience: number
    description: string
    averageRating: string
    feedbackCount: string
    schedule: string
    isFavorite: number
}

export interface ISpecialization extends ITimeStamp {
    id: number,
    name: string,
    description: string,
    icon: string,
}