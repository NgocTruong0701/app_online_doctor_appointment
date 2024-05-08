import AppointmentMessList from "@/components/Appointment/AppointmentMessList";
import AppointmentTab from "@/components/Appointment/AppointmentTab";
import { appointmentStatus } from "@/constants/constants";
import ChatProvider from "@/providers/ChatProvider";
import { IPatient } from "@/redux/reducers/user/type";
import { useAppSelector } from "@/redux/store";
import { IDoctorResponse } from "@/redux/type";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold } from "@assets/Shared/typography";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export interface IAppointment {
    id: number,
    date: string,
    status: string,
    description: string,
    doctor: IDoctorResponse | null,
    patient: IPatient | null,
    packageAppointment: IPackageAppointment
}

interface IPackageAppointment {
    id: number,
    name: string,
    price: number,
}

export default function Appointment() {
    const { user } = useAppSelector(state => state.user);
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [activeTab, setActiveTab] = useState(appointmentStatus.UPCOMING);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            axiosClient.get(`${API.API_GET_APPOINTMENT_BY_USERID}/${user.id}?status=${activeTab}`)
                .then((response) => {
                    setAppointments(response.data.data as IAppointment[]);
                }).catch((error) => { console.error(error.message); navigation.navigate("Login" as never); });
        }, [user.id, activeTab])
    );

    return (
        <ChatProvider>
            <View>
                <Text style={{ fontFamily: OutfitBold, fontSize: 20, backgroundColor: Colors.white, padding: 15 }}>My Appointment</Text>
                <AppointmentTab setActiveTab={(value: string) => { setActiveTab(value); }} />
                {!appointments?.length
                    ? <ActivityIndicator size={'large'} color={Colors.primary} />
                    : <AppointmentMessList appointment={appointments} />
                }
            </View>
        </ChatProvider>
    )
}