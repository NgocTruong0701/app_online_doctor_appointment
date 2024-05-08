import ChannelScreen from "@/screens/ChannelScreen";
import ListChannel from "@/screens/ListChannel";
import { createStackNavigator } from "@react-navigation/stack";
import { OutfitBold } from "@assets/Shared/typography";
import ChatProvider from "@/providers/ChatProvider";

const Stact = createStackNavigator();

export default function MessageNavigation() {
    return (
        <ChatProvider>
            <Stact.Navigator screenOptions={{
                title: 'Appointment History', headerTitleStyle: {
                    fontFamily: OutfitBold
                }
            }}>
                <Stact.Screen name="ListChannel" component={ListChannel} />
                <Stact.Screen name="ChannelScreen" component={ChannelScreen} options={({ route }) => ({ title: route.params.cid })} />
            </Stact.Navigator>
        </ChatProvider>
    )
}