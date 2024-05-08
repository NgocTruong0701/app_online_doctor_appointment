import { IAppointment } from "@/screens/Appointment";
import { FlatList, Text, View } from "react-native";
import AppoinmentMessItem from "./AppoinmentMessItem";

interface IAppointmentMessListProp {
    appointment: IAppointment[]
}

export default function AppointmentMessList({ appointment }: IAppointmentMessListProp) {

    return (
        <View>
            <FlatList
                data={appointment}
                renderItem={({ item }) => (
                    <AppoinmentMessItem appointment={item} />
                )}
            />
        </View>
    )
}