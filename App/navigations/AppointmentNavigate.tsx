import ChannelScreen from "@/screens/ChannelScreen";
import ListChannel from "@/screens/ListChannel";
import { createStackNavigator } from "@react-navigation/stack";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import ChatProvider from "@/providers/ChatProvider";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { Colors } from "@assets/Shared";
import { TouchableOpacity } from "react-native-gesture-handler";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import AppointmentDetails from "@/screens/AppointmentDetails";
import Appointment from "@/screens/Appointment";
import CallScreen from "@/screens/CallScreen";
import LeaveAReview from "@/screens/LeaveAReview";

const Stact = createStackNavigator();

export default function AppointmentNavigation() {
    return (
        <Stact.Navigator initialRouteName='AppointmentScreen' screenOptions={{ headerShown: false }}>
            <Stact.Screen name="AppointmentScreen" component={Appointment} />
            <Stact.Screen name="AppointmentDetails" component={AppointmentDetails} />
            <Stact.Screen name="CallScreen" component={CallScreen} />
            <Stact.Screen name="LeaveAReview" component={LeaveAReview} />
        </Stact.Navigator>
    )
}