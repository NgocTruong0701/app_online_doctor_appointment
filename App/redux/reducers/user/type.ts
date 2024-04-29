interface IPatient {
    id: number,
    name: string,
    date_of_birth: Date,
    gender: number,
    phone_number: string,
    avatar: string,
    address: string
}

interface IDoctor {
    id: number,
    name: string,
    date_of_birth: Date,
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
    data: {
        id: number,
        email: string,
        role: string,
        verified: boolean,
        patient: IPatient | null,
        doctor: IDoctor | null,
    },
    statusCode: number,
    message: string
}