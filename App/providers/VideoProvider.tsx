import { Colors } from "@assets/Shared";
import {
    StreamVideoClient,
    StreamVideo,
    User,
} from '@stream-io/video-react-native-sdk';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAppSelector } from "@/redux/store";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";

const apiKey = `${process.env.EXPO_PUBLIC_STREAM_API_KEY}`;

export default function VideoProvider({ children }: PropsWithChildren) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
        null
    );
    const { user } = useAppSelector(state => state.user);
    const { doctor, patient } = user;

    const id = doctor != null ? doctor.id : patient?.id;
    const name = doctor != null ? doctor.name : patient?.name;
    const image = doctor != null ? doctor.avatar : patient?.avatar;

    useEffect(() => {
        if (!user) {
            return;
        }
        const initVideoClient = async () => {
            const { data } = await axiosClient.get(API.API_GET_TOKEN_STREAMCHAT);
            const tokenProvider = data.data;
            const user: User = {
                id: `${id}`,
                name: name,
                image: image,
            };
            const client = new StreamVideoClient({ apiKey, user, tokenProvider });

            setVideoClient(client);
        }

        initVideoClient();

        return () => {
            if (videoClient) {
                videoClient.disconnectUser();
            }
        };
    }, [user.id]);

    if (!videoClient) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
        </View>
    }

    return <StreamVideo client={videoClient} >{children}</StreamVideo>
}