import { IAppointment } from "@/screens/Appointment";
import { FlatList, ScrollView, Text, View } from "react-native";
import AppoinmentMessItem from "./AppoinmentMessItem";

interface IAppointmentMessListProp {
    appointment: IAppointment[]
}

export default function AppointmentMessList({ appointment }: IAppointmentMessListProp) {

    return (
        <FlatList
            data={appointment}
            scrollEnabled={true}
            renderItem={({ item }) => (
                <AppoinmentMessItem appointment={item} />
            )}
        />
    )
}