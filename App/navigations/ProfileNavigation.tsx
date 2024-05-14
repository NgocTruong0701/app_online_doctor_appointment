import ChannelScreen from "@/screens/ChannelScreen";
import ListChannel from "@/screens/ListChannel";
import { createStackNavigator } from "@react-navigation/stack";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import Profile from "@/screens/Profile";
import EditProfile from "@/screens/EditProfile";

const Stact = createStackNavigator();

export default function ProfileNavigation() {
    return (
        <Stact.Navigator screenOptions={{ headerShown: false }}>
            <Stact.Screen name="ProfileScreen" component={Profile} />
            <Stact.Screen name="EditProfile" component={EditProfile} />
        </Stact.Navigator>
    )
}