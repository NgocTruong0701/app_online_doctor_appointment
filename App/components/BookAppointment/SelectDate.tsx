import { Text, View } from "react-native";
import SubTitle from "../DoctorDetails/SubTitle";
import Title from "./Title";
import { useEffect, useState } from "react";
import ReactNativeModernDatepicker, { getFormatedDate } from "react-native-modern-datepicker";
import { OutfitSemiBold } from "@assets/Shared/typography";
import { Colors } from "@assets/Shared";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface ISetDate {
    handleDateChange: any
}

export default function SelectDate({ handleDateChange }: ISetDate) {
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

    useEffect(() => {
        handleDateChange(startDate);
    },[])

    const handleChange = (propDate: any) => {
        handleDateChange(propDate)
    }

    return (
        <View>
            <Title title="Select Date" />

            <View style={{ marginTop: 15 }}>
                <ReactNativeModernDatepicker
                    mode="calendar"
                    selected={startDate}
                    minimumDate={startDate}
                    onDateChange={handleChange}
                    style={{ borderRadius: 20 }}
                    options={{
                        headerFont: OutfitSemiBold,
                        defaultFont: OutfitSemiBold,
                        textSecondaryColor: Colors.black
                    }}
                />
            </View>
        </View>
    )
}