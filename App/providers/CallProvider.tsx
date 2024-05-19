import { useNavigation } from "@react-navigation/native";
import { useCalls } from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect } from "react";

export default function CallProvider({ children }: PropsWithChildren) {
    const calls = useCalls();
    const call = calls[0];
    const navigation = useNavigation();

    useEffect(() => {
        if (!call) return;

        if (call.state.callingState === 'ringing') {
            navigation.navigate('CallScreen' as never);
        }

    }, [call]);

    return (
        <>
            {children}
        </>
    )
}