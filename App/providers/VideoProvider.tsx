import { Colors } from "@assets/Shared";
import { PropsWithChildren, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
    CallContent,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-native-sdk';
import { useAppSelector } from "@/redux/store";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";

const apiKey = '6dqf5bm87p98';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ1LCJlbWFpbCI6Im5nb2N0cnVvbmdjdkBnbWFpbC5jb20iLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxNTc3MTEzOSwiZXhwIjoxNzE1ODU3NTM5fQ.-GUchzM1DT8o8BJbVuEyBMVZOSZMr68RX_1PLnATCRc';
export default function VideoProvider({ children }: PropsWithChildren) {
    const [videoClient, setVideoClient] = useState(null);
    const { user } = useAppSelector(state => state.user);
    const { doctor, patient } = user;

    const id = doctor != null ? doctor.id : patient?.id;
    const name = doctor != null ? doctor.name : patient?.name;
    const image = doctor != null ? doctor.avatar : patient?.avatar;

    useEffect(() => {
        if (!user) {
            return;
        }

        const connect = async () => {
            const { data } = await axiosClient.get(API.API_GET_TOKEN_STREAMCHAT);
            await client.connectUser(
                {
                    id: `${id}`,
                    name: name,
                    image: image,
                },
                data.data
            );
            setVideoClient(true);
        };

        const initVideoClient = async () => {
            const client = new StreamVideoClient({ apiKey, user, token });
        }

    }, []);

    if (!videoClient) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
        </View>
    }

    return (
        <>
            {children}
        </>
    )
}