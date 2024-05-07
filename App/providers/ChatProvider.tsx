import { PropsWithChildren, useEffect, useState } from "react";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from 'stream-chat';
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "@/redux/store";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { user } = useAppSelector(state => state.user);
    const { doctor, patient } = user;

    const name = doctor != null ? doctor.name : patient?.name;
    const image = doctor != null ? doctor.avatar : patient?.avatar;

    useEffect(() => {
        if (!user) {
            return;
        }
        const connect = async () => {
            await client.connectUser(
                {
                    id: `${user.id}`,
                    name: name,
                    image: image,
                },
                client.devToken(`${user.id}`)
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