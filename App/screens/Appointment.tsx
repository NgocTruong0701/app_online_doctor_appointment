import AppointmentMessList from "@/components/Appointment/AppointmentMessList";
import AppointmentTab from "@/components/Appointment/AppointmentTab";
import { appointmentStatus } from "@/constants/constants";
import { storage } from "@/localStorage";
import ChatProvider from "@/providers/ChatProvider";
import { IPatient } from "@/redux/reducers/user/type";
import { useAppSelector } from "@/redux/store";
import { IDoctorResponse } from "@/redux/type";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface IAppointment {
    id: number,
    date: string,
    status: string,
    description: string,
    doctor: IDoctorResponse | null,
    patient: IPatient | null,
    packageAppointment: IPackageAppointment,
    duration: number,
}

interface IPackageAppointment {
    id: number,
    name: string,
    price: number,
    icon: string,
    description: string,
}

export default function Appointment() {
    const { user } = useAppSelector(state => state.user);
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [activeTab, setActiveTab] = useState(appointmentStatus.UPCOMING);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    console.log(storage.getString('token'))

    useFocusEffect(
        useCallback(() => {
            axiosClient.get(`${API.API_GET_APPOINTMENT_BY_USERID}/${user.id}?status=${activeTab}`)
                .then((response) => {
                    setAppointments(response.data.data as IAppointment[]);
                }).catch((error) => {
                    console.error(error.message);
                    navigation.navigate("Login" as never);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, [user.id, activeTab])
    );

    return (
        <View>
            <SafeAreaView style={{ paddingBottom: 177 }}>
                <Text style={{ fontFamily: OutfitBold, fontSize: 20, backgroundColor: Colors.white, padding: 15 }}>My Appointment</Text>
                <AppointmentTab setActiveTab={(value: string) => { setActiveTab(value); }} />

                {isLoading && <ActivityIndicator size={'large'} color={Colors.primary} />}
                {!isLoading && appointments.length > 0 && <AppointmentMessList appointment={appointments} />}
                {!isLoading && appointments.length === 0 && <View style={{ marginTop: 50 }}>
                    <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, fontSize: 20 }}>You don't have an appointment yet</Text>
                    <Text style={{ textAlign: 'center', fontFamily: OutfitRegular, fontSize: 16, color: Colors.text_gray, marginTop: 10 }}>You don't have a doctor's appointment scheduled at the moment</Text>
                </View>}
            </SafeAreaView>
        </View>
    )
}