import { OutfitSemiBold } from "@assets/Shared/typography";
import { Text, View } from "react-native";

interface ITitle {
    title: string;
}
export default function Title({title}: ITitle) {
    return (
        <View style={{marginTop: 20}}>
            <Text
            style={{
                fontFamily: OutfitSemiBold,
                fontSize: 20
            }}
            > {title} </Text>
        </View>
    )
}