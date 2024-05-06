import ChannelScreen from "@/screens/ChannelScreen";
import ListChannel from "@/screens/ListChannel";
import { createStackNavigator } from "@react-navigation/stack";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from 'stream-chat';

const Stact = createStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function MessageNavigation() {
    return (
        <OverlayProvider>
            <Chat client={client}>
                <Stact.Navigator screenOptions={{ title: 'Appointment History' }}>
                    <Stact.Screen name="ListChannel" component={ListChannel} />
                    <Stact.Screen name="ChannelScreen" component={ChannelScreen} options={({ route }) => ({ title: route.params.cid })} />
                </Stact.Navigator>
            </Chat>
        </OverlayProvider>
    )
}