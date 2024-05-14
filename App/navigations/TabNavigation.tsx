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

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const { user } = useAppSelector((state) => state.user);
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
                component={Appointment}
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
                }}
            />,
            <Tab.Screen
                key="Profile"
                name="Profile"
                component={Profile}
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
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                {screens}
            </Tab.Navigator>
        </ChatProvider>
    );
}