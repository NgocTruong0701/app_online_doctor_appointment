import { PropsWithChildren, useEffect, useState } from "react";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from 'stream-chat';
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "@/redux/store";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
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

            setIsReady(true);
        };

        connect();

        return () => {
            if (isReady) {
                client.disconnectUser();
            }
            setIsReady(false);
        };
    }, [user?.id]);

    if (!isReady) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    )
}