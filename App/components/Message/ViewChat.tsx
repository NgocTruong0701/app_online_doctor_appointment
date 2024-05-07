import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import { SafeAreaView } from "react-native-safe-area-context";


interface IViewChatProps {
    channel: ChannelType;
}

export default function ViewChat({ channel }: IViewChatProps) {

    return (
        <Channel channel={channel}>
            <MessageList />
            <SafeAreaView edges={['bottom']}>
                <MessageInput />
            </SafeAreaView>
        </Channel>
    )
}