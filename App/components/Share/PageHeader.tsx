import { OutfitSemiBold } from "@assets/Shared/typography";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IPageHeaderProps {
    title: string | undefined;
}

export default function PageHeader({ title }: IPageHeaderProps) {
    const navigation = useNavigation();
    return (
        <View style={{ display: 'flex', flexDirection: "row", gap: 5, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-circle-outline" size={37} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontFamily: OutfitSemiBold }}>{title}</Text>
        </View>
    )
}