import Appointment from "@/screens/Appointment";
import Profile from "@/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import HomeNavigation from "./HomeNavigation";
import MessageNavigation from "./MessageNavigation";
import { Octicons } from "@expo/vector-icons";
import { useAppSelector } from "@/redux/store";
import { roles } from "@/constants/constants";
import ChatProvider from "@/providers/ChatProvider";
import AppointmentNavigation from "./AppointmentNavigate";
import ProfileNavigation from "./ProfileNavigation";
import VideoProvider from "@/providers/VideoProvider";
import CallProvider from "@/providers/CallProvider";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const { user } = useAppSelector((state) => state.user);
    useEffect(() => {
        const run = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    'android.permission.POST_NOTIFICATIONS',
                    'android.permission.BLUETOOTH_CONNECT',
                    "android.permission.CAMERA",
                    "android.permission.RECORD_AUDIO"
                ]);
            }
        };
        run();
    }, []);

    let screens = [];

    if (user.role === roles[0].name) {
        screens = [
            <Tab.Screen
                key="Home"
                name="Home"
                component={HomeNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                }}
            />,
            <Tab.Screen
                key="Appointment"
                name="Appointment"
                component={AppointmentNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                    ),
                }}
            />,
            <Tab.Screen
                key="History"
                name="History"
                component={MessageNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="checklist" size={size} color={color} />
                    ),
                    unmountOnBlur: true
                }}
            />,
            <Tab.Screen
                key="Profile"
                name="Profile"
                component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    ),
                }}
            />,
        ];
    } else {
        screens = [
            <Tab.Screen
                key="Appointment"
                name="Appointment"
                component={AppointmentNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                    ),
                }}
            />,
            <Tab.Screen
                key="History"
                name="History"
                component={MessageNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="checklist" size={size} color={color} />
                    ), unmountOnBlur: true
                }}
            />,
            <Tab.Screen
                key="Profile"
                name="Profile"
                component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    ),
                }}
            />,
        ];
    }

    return (
        <ChatProvider>
            <VideoProvider>
                <CallProvider>
                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        {screens}
                    </Tab.Navigator>
                </CallProvider>
            </VideoProvider>
        </ChatProvider>
    );
}