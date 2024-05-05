import { Colors } from "@assets/Shared";
import { OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IPropSubHeadingTitle {
    subHeadingTitle: string;
}

export default function SubHeading({ subHeadingTitle }: IPropSubHeadingTitle) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Text style={{
                fontSize: 20,
                fontFamily: OutfitSemiBold
            }}>{subHeadingTitle}</Text>
            <TouchableOpacity>
                <Text style={{ fontFamily: OutfitRegular, color: Colors.primary }}>See All</Text>
            </TouchableOpacity>
        </View>
    )
}