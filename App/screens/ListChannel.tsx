import { useAppSelector } from '@/redux/store';
import { useNavigation } from '@react-navigation/native';
import { ChannelList } from 'stream-chat-expo';

export default function ListChannel() {
    const navigation = useNavigation();

    const { user } = useAppSelector(state => state.user);

    return (
        <ChannelList
            filters={{
                members: {
                    $in: [`${user.id}`]
                }
            }}
            onSelect={(channel) => {
                navigation.navigate('ChannelScreen' as never, {
                    cid: channel.cid
                })
            }} />
    )
}