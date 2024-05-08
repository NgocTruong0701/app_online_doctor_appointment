import { useAppSelector } from '@/redux/store';
import { useNavigation } from '@react-navigation/native';
import { ChannelList } from 'stream-chat-expo';

export default function ListChannel() {
    const navigation = useNavigation();

    const { user } = useAppSelector(state => state.user);
    const id = user.doctor != null ? user.doctor.id : user.patient?.id;

    return (
        <ChannelList
            filters={{
                members: {
                    $in: [`${id}`]
                }
            }}
            onSelect={(channel) => {
                navigation.navigate('ChannelScreen' as never, {
                    cid: channel.cid
                })
            }} />
    )
}