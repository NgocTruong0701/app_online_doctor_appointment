import ChannelItem from '@/components/Message/ChannelItem';
import { useEffect } from 'react';
import { Chat, OverlayProvider, useChatContext } from 'stream-chat-expo';

export default function ListChannel() {
    const { client } = useChatContext();
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

            // const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            // });

            // await channel.watch();
        };

        connect();
    })

    return (
        <ChannelItem />
    )
}