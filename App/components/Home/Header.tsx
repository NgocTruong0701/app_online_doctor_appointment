import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";

export default function Header() {
    const { isLoaded, isSignedIn, user } = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center' }}>
                <Image source={{ uri: user.imageUrl }} style={{ width: 45, height: 45, borderRadius: 99 }} />
                <View>
                    <Text style={{ fontFamily: OutfitRegular }}>Hello,👋</Text>
                    <Text style={{ fontFamily: OutfitBold, fontSize: 18 }}>{user.fullName}</Text>
                </View>
            </View>
            <Ionicons name="notifications-outline" size={28} color="black" />
        </View>
    )
}