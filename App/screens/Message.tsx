import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-react-native';

const client = StreamChat.getInstance(`${process.env.GET_STREAM_APIKEY}`);
export default function Message() {
    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                    id: 'jlahey',
                    name: 'Jim Lahey',
                    image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey')
            );

            const channel = client.channel('messaging', 'the_park', {
                name: 'The Park',
            });

            await channel.watch();
        };

        connect();
    })

    return (
        <OverlayProvider>
            <Chat client={client}>
                <ChannelList />
            </Chat>
        </OverlayProvider>
    )
}