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

const Stact = createStackNavigator();

export default function MessageNavigation() {
    const params = useRoute().params;
    const navigation = useNavigation();

    if (params != undefined) {
        useFocusEffect(
            useCallback(() => {
                if (params.cid != null) {
                    navigation.navigate('ChannelScreen', {
                        cid: params.cid,
                        appointmentid: params.appointmentid,
                    });
                }
            }, [params.cid, params.appointmentid, navigation])
        );
    }

    const handleCompleteAppointment = () => {
        axiosClient.post(`${API.API_COMPLETE_APPOINTMENT}/${params.appointmentid}`)
            .then(response => {
                console.log(response.data);
                navigation.navigate('Appointment' as never);
            }).catch(err => {
                console.error(err.message);
            });
    }

    return (
        // <ChatProvider>
        <Stact.Navigator screenOptions={{
            title: 'Appointment History', headerTitleStyle: {
                fontFamily: OutfitBold
            }, headerLeft: () => <></>,
        }}>
            <Stact.Screen name="ListChannel" component={ListChannel} />
            <Stact.Screen name="ChannelScreen" component={ChannelScreen} options={({ route }) => ({
                headerRight: () => (
                    params && (<View style={{ marginRight: 20 }}>
                        <TouchableOpacity onPress={handleCompleteAppointment}>
                            <Text style={{ fontFamily: OutfitRegular, color: Colors.primary }}>Complete</Text>
                        </TouchableOpacity>
                    </View>)
                )
            })} />
        </Stact.Navigator>
        // </ChatProvider>
    )
}