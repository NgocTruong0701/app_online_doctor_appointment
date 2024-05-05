import SelectDate from "@/components/BookAppointment/SelectDate";
import SelectHour from "@/components/BookAppointment/SelectHour";
import PageHeader from "@/components/Share/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Colors } from "@assets/Shared";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { actions as appointmentDetails } from "@/redux/reducers/appointmentDetails";
import { useState } from "react";
import { OutfitRegular } from "@assets/Shared/typography";

export default function BookAppointment() {
    const { doctorSelected } = useAppSelector(state => state.doctorSelected);
    const navigation = useNavigation();
    const [time, setTime] = useState('');

    const dispatch = useAppDispatch();

    const handleDateChange = (date: string) => {
        dispatch(appointmentDetails.setAppointmentDate(date));
    };

    const handleTimeChange = (time: string) => {
        dispatch(appointmentDetails.setAppointmentTime(time));
        setTime(time);
    }

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <PageHeader title="Book Appointment" />

                <SelectDate handleDateChange={handleDateChange} />
                <SelectHour doctor={doctorSelected} handleTimeChange={handleTimeChange} />
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PatientDetails' as never)
                    }}
                    disabled={!time}
                    style={[{
                        padding: 15,
                        backgroundColor: Colors.primary,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        width: Dimensions.get('screen').width * 0.9
                    }, !time && { backgroundColor: Colors.primary_disabled }]}
                >
                    <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitRegular }}>Next</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}