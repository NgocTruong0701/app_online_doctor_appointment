import DoctorOfSpecialityList from "@/screens/DoctorOfSpecialityList";
import Home from "@/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stact = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stact.Navigator screenOptions={{headerShown: false}}>
            <Stact.Screen name="HomeScreen" component={Home} />
            <Stact.Screen name="DoctorOfSpecialityList" initialParams={{categoryName: ''}} component={DoctorOfSpecialityList} />
        </Stact.Navigator>
    )
}