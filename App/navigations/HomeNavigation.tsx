import BookAppointment from "@/screens/BookAppointment";
import ChannelScreen from "@/screens/ChannelScreen";
import DoctorDetails from "@/screens/DoctorDetails";
import DoctorFavorite from "@/screens/DoctorFavorite";
import DoctorOfSpecialityList from "@/screens/DoctorOfSpecialityList";
import DoctorTopAll from "@/screens/DoctorTopAll";
import Home from "@/screens/Home";
import PatientDetails from "@/screens/PatientDetails";
import ReviewSummary from "@/screens/ReviewSummary";
import { SearchDoctor } from "@/screens/SearchDoctor";
import SelectPackage from "@/screens/SelectPackage";
import { createStackNavigator } from "@react-navigation/stack";

const Stact = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stact.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stact.Screen name="HomeScreen" component={Home} />
            <Stact.Screen name="DoctorOfSpecialityList" initialParams={{ categoryName: '' }} component={DoctorOfSpecialityList} />
            <Stact.Screen name="DoctorDetails" component={DoctorDetails} />
            <Stact.Screen name="BookAppointment" component={BookAppointment} />
            <Stact.Screen name="SelectPackage" component={SelectPackage} />
            <Stact.Screen name="PatientDetails" component={PatientDetails} />
            <Stact.Screen name="ReviewSummary" component={ReviewSummary} />
            <Stact.Screen name="ChannelScreen" component={ChannelScreen} options={({ route }) => ({ title: route.params.cid })} />
            <Stact.Screen name="DoctorFavorite" component={DoctorFavorite} />
            <Stact.Screen name="SearchDoctor" component={SearchDoctor} />
            <Stact.Screen name="DoctorTopAll" component={DoctorTopAll} />
        </Stact.Navigator>
    )
}