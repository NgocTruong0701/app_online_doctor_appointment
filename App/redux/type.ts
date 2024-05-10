export const GET_USER = "GET_USER";
export interface ITimeStamp {
    created_at: string,
    updated_at: string
}
export interface IDoctorResponse extends ITimeStamp {
    specialization_id?: number;
    specialization_name?: string;
    specialization_description?: string;
    specialization_icon?: string;
    id?: number;
    name?: string;
    date_of_birth?: Date;
    gender?: number;
    phone_number?: string;
    avatar?: string;
    address?: string;
    account?: number;
    specializationId?: number;
    hospital?: null;
    years_experience?: null;
    description?: string | undefined;
    start_day_of_week?: string;
    time_start?: string;
    end_day_of_week?: string;
    time_end?: string;
    averageRating?: null;
    feedbackCount?: string;
    schedule?: string;
}

export interface ISpecialization extends ITimeStamp {
    id: number,
    name: string,
    description: string,
    icon: string,
}