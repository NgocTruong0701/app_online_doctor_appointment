import BackButton from "@/components/Share/BackButton";
import AnimatedExample from "@/components/VerifyEmail";
import { Text, View } from "react-native";

export default function VerifyEmail() {

    return (
        <View style={{
            padding: 10,
            marginTop: 20
        }}>
            <BackButton />

            <AnimatedExample />
        </View>
    )
}