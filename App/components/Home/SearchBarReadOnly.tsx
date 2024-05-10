import { Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { useState } from "react";
import { OutfitRegular } from "@assets/Shared/typography";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function SearchBarReadOnly() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('SearchDoctor' as never)} >
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8 }}>
                <Feather name="search" size={24} color={Colors.blue} />
                <Text style={{ width: '100%', fontFamily: OutfitRegular, color: Colors.gray }}>Search</Text>
            </View>
        </TouchableOpacity>
    )
}