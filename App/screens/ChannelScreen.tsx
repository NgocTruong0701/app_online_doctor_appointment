import ViewChat from "@/components/Message/ViewChat";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Channel as ChannelType } from "stream-chat";
import { useChatContext } from "stream-chat-expo";

export default function ChannelScreen() {
    const [channel, setChannel] = useState<ChannelType | null>();
    const params = useRoute().params;

    const { client } = useChatContext();

    const cid = params?.cid;

    useEffect(() => {
        const fetchChannel = async () => {
            const channel = await client.queryChannels({ cid });
            setChannel(channel[0]);
        };

        fetchChannel();
    }, [cid])

    return (
        <View>
            {!channel ? (<ActivityIndicator />) : (
                <ViewChat channel={channel} />
            )}
        </View>
    )
}