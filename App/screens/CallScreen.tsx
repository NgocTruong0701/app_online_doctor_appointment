import { useAppSelector } from "@/redux/store";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { useNavigation } from "@react-navigation/native";
import { CallContent, RingingCallContent, StreamCall, useCalls } from "@stream-io/video-react-native-sdk";

export default function CallScreen() {
    const calls = useCalls();
    const call = calls[0];
    const navigation = useNavigation();

    if (!call) {
        if (navigation.canGoBack()) {
            navigation.navigate('AppointmentScreen' as never);
        } else {
            navigation.navigate('AppointmentScreen' as never);
        }
        return null;
    }

    return (
        <StreamCall call={call}>
            <RingingCallContent CallContent={CallContentCustom} />
        </StreamCall>
    );
}

function CallContentCustom() {
    const { appointmentCallId } = useAppSelector(state => state.appState);

    return (
        <CallContent onHangupCallHandler={() => {
            if (!(appointmentCallId === 0 || appointmentCallId === undefined || appointmentCallId === null)) {
                axiosClient.post(`${API.API_COMPLETE_APPOINTMENT}/${appointmentCallId}`)
                    .then(response => {
                        console.log(response.data);
                    }).catch(err => {
                        console.error(err.message);
                    });
            }
        }} />
    )
}