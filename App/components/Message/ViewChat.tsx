import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";

interface IViewChatProps {
    channel: ChannelType;
}

export default function ViewChat({ channel }: IViewChatProps) {

    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    )
}