import { Colors } from "@assets/Shared";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IDoctorItemProps } from "../Home/DoctorItem";
import { useAppDispatch } from "@/redux/store";
import { actions as doctorSelectedAction } from "@/redux/reducers/doctorSelected";

export default function BookAppointmentButton({doctor}: IDoctorItemProps) {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    return (
        <View>
            <TouchableOpacity
                    onPress={() => {
                        dispatch(doctorSelectedAction.setDoctorSelected(doctor));
                        navigation.navigate('BookAppointment' as never)
                    }}
                    style={{
                        padding: 15,
                        backgroundColor: Colors.primary,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        width: Dimensions.get('screen').width * 0.9
                    }}
                >
                    <Text style={{ fontSize: 17, color: Colors.white }}>Book Appointment</Text>
                </TouchableOpacity>
        </View>
    )
}