import { Text, View } from "react-native";

import { useEffect } from "react";



const userId = '46';

const callId = 'default_65ecc35a-1728-4bc2-8926-e96ea11f8fec';
const user: User = { id: userId };


const call = client.call('default', callId);
call.join({ create: true });

export default function CallScreen() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <CallContent />
            </StreamCall>
        </StreamVideo>
    )
}