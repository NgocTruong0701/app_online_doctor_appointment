import AppointmentMessList from "@/components/Appointment/AppointmentMessList";
import AppointmentTab from "@/components/Appointment/AppointmentTab";
import { IPatient } from "@/redux/reducers/user/type";
import { useAppSelector } from "@/redux/store";
import { IDoctorResponse } from "@/redux/type";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold } from "@assets/Shared/typography";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface IAppointment {
    id: number,
    date: string,
    status: string,
    description: string,
    doctor: IDoctorResponse | null,
    patient: IPatient | null
}

export default function Appointment() {
    const { user } = useAppSelector(state => state.user);
    const [appointments, setAppointments] = useState<IAppointment[]>([]);

    useEffect(() => {
        axiosClient.get(`${API.API_GET_APPOINTMENT_BY_USERID}/${user.id}`)
            .then((response) => {
                setAppointments(response.data.data as IAppointment[]);
            }).catch((error) => console.error(error.message));
    }, [user.id])

    return (
        <View>
            <Text style={{ fontFamily: OutfitBold, fontSize: 20, backgroundColor: Colors.white, padding: 15 }}>My Appointment</Text>
            <AppointmentTab />
            <AppointmentMessList />
        </View>
    )
}