import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

export default function ChannelItem() {
    const navigation = useNavigation();

    return (
        <ChannelList onSelect={(channel) => {
            navigation.navigate('ChannelScreen' as never, {
                cid: channel.cid
            })
        }} />
    )
}