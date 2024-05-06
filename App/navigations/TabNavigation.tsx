import Appointment from "@/screens/Appointment"
import Home from "@/screens/Home"
import Profile from "@/screens/Profile"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import HomeNavigation from "./HomeNavigation";
import MessageNavigation from "./MessageNavigation";

const Tab = createBottomTabNavigator()
export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Appointment" component={MessageNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}