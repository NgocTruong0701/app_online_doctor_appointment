import React, { useCallback, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getUser } from "@/redux/reducers/user/thunk";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";

export default function Header() {
    const { user } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const navigation = useNavigation();
    // Fetch user data on component focus
    useEffect(() => {
        dispatch(getUser()).catch(error => {
            console.error(error.message);
            navigation.navigate("Login" as never);
        });
    }, [])

    // Extract user data
    const { doctor, patient } = user.user;
    const imgLink = doctor ? doctor.avatar : patient?.avatar;
    const name = doctor ? doctor.name : patient?.name;

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 7, alignItems: 'center' }}>
                <Image source={{ uri: imgLink }} style={{ width: 45, height: 45, borderRadius: 99 }} />
                <View>
                    <Text style={{ fontFamily: OutfitRegular }}>Hello,👋</Text>
                    <Text style={{ fontFamily: OutfitBold, fontSize: 18 }}>{name}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                <Ionicons name="notifications-outline" size={28} color={Colors.blue} />
                <FontAwesome name="heart-o" size={25} color={Colors.blue} />
            </View>
        </View>
    );
}