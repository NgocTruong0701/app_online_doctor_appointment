import { Colors } from "@assets/Shared";
import { OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";

interface IPropSubHeadingTitle {
    subHeadingTitle: string;
    route: string | null;
}

export default function SubHeading({ subHeadingTitle, route }: IPropSubHeadingTitle) {
    const navigation = useNavigation();

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Text style={{
                fontSize: 20,
                fontFamily: OutfitSemiBold
            }}>{subHeadingTitle}</Text>
            {route != null ? <TouchableOpacity onPress={() => navigation.navigate(route as never)}>
                <Text style={{ fontFamily: OutfitRegular, color: Colors.primary }}>See All</Text>
            </TouchableOpacity> :
                <TouchableOpacity>
                    <Text style={{ fontFamily: OutfitRegular, color: Colors.primary }}>See All</Text>
                </TouchableOpacity>
            }
        </View>
    )
}