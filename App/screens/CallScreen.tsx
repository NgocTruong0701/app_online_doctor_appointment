import { CallContent, StreamCall, StreamVideo, StreamVideoClient, User, useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

const callId = 'default_eeae273e-8a0c-4c6d-9090-0182a1d857e8'

export default function CallScreen() {
    useEffect(() => {
        const run = async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    'android.permission.POST_NOTIFICATIONS',
                    'android.permission.BLUETOOTH_CONNECT',
                    "android.permission.CAMERA",
                    "android.permission.RECORD_AUDIO"
                ]);
            }
        };
        run();
    }, []);

    const client = useStreamVideoClient();
    const call = client?.call('default', callId);
    call?.join({ create: true });

    return (
        <StreamCall call={call!}>
            <CallContent />
        </StreamCall>
    )
}