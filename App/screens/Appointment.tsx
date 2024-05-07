import AppointmentTab from "@/components/Appointment/AppointmentTab";
import { Colors } from "@assets/Shared";
import { OutfitBold } from "@assets/Shared/typography";
import { Text, View } from "react-native";


export default function Appointment() {
    return (
        <View>
            <Text style={{ fontFamily: OutfitBold, fontSize: 20, backgroundColor: Colors.white, padding: 15 }}>My Appointment</Text>
            <AppointmentTab />
        </View>
    )
}