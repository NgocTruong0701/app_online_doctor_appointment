import BookAppointment from "@/screens/BookAppointment";
import ChannelScreen from "@/screens/ChannelScreen";
import DoctorDetails from "@/screens/DoctorDetails";
import DoctorOfSpecialityList from "@/screens/DoctorOfSpecialityList";
import Home from "@/screens/Home";
import PatientDetails from "@/screens/PatientDetails";
import ReviewSummary from "@/screens/ReviewSummary";
import { createStackNavigator } from "@react-navigation/stack";

const Stact = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stact.Navigator screenOptions={{ headerShown: false }}>
            <Stact.Screen name="HomeScreen" component={Home} />
            <Stact.Screen name="DoctorOfSpecialityList" initialParams={{ categoryName: '' }} component={DoctorOfSpecialityList} />
            <Stact.Screen name="DoctorDetails" component={DoctorDetails} />
            <Stact.Screen name="BookAppointment" component={BookAppointment} />
            <Stact.Screen name="PatientDetails" component={PatientDetails} />
            <Stact.Screen name="ReviewSummary" component={ReviewSummary} />
            <Stact.Screen name="ChannelScreen" component={ChannelScreen} options={({ route }) => ({ title: route.params.cid })} />
        </Stact.Navigator>
    )
}