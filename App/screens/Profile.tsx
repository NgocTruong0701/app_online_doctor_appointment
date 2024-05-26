import Logout from "@/components/Logout/Logout";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { storage } from "@/localStorage";
import { actions as userAction } from "@/redux/reducers/user";
import { API } from "@/services/Apis/api";
import axios from "axios";
import { actions as appStateActions } from "@/redux/reducers/appState";
import { getUser } from "@/redux/reducers/user/thunk";

export default function Profile() {

    const { user } = useAppSelector(state => state.user);
    const avatart = user.doctor ? user.doctor.avatar : user.patient?.avatar;
    const name = user.doctor ? user.doctor.name : user.patient?.name;
    const email = user.email;
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const url = result.assets[0].uri;
            const mimeType = result.assets[0].mimeType;
            const imgName = `avatar-of-${name}-${new Date().getTime()}`;
            uploadImage(url, mimeType, imgName);
        }
    };

    const uploadImage = async (uri: string, mimeType?: string, imgName?: string) => {
        let formData = new FormData();
        formData.append('file', {
            uri,
            name: imgName,
            type: mimeType
        });
        const accessToken = storage.getString('token');
        dispatch(appStateActions.showLoading());
        axios.post(API.BASE_URL + API.API_UPLOAD_AVATAR, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + accessToken,
            },
        })
            .then(response => {
                dispatch(getUser()).unwrap().catch(error => {
                    console.error(error.message);
                    navigation.navigate("Login" as never);
                });
            })
            .catch(error => { alert('Failed to upload image'); })
            .finally(() => { dispatch(appStateActions.hideLoading()); });
    };

    const removeToken = () => {
        storage.set('token', '');
        dispatch(userAction.clearUser());
        navigation.navigate('Login' as never);
    }

    const handleEditProfile = () => {
        navigation.navigate('EditProfile' as never);
    }


    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialIcons name="health-and-safety" size={28} color={Colors.primary} />
                <Text style={{ fontFamily: OutfitBold, fontSize: 20 }}>Profile</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: avatart }}
                        style={{ width: 130, height: 130, borderRadius: 99 }}
                    />
                    <TouchableOpacity onPress={pickImage} style={{ position: 'absolute', bottom: 5, right: 5 }}>
                        <View style={{
                            backgroundColor: Colors.primary,
                            borderRadius: 15,
                            padding: 5,
                        }}>
                            <FontAwesome name="pencil" size={16} color={Colors.white} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: OutfitBold, fontSize: 20, marginTop: 10 }}>
                    {name}
                </Text>
                <Text style={{ fontFamily: OutfitRegular, fontSize: 16, marginBottom: 15 }}>{email}</Text>
            </View>

            <View style={{ borderTopWidth: 0.5, borderTopColor: Colors.gray, padding: 20 }}>
                <TouchableOpacity onPress={handleEditProfile} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 21, alignItems: "center" }}>
                        <FontAwesome5 name="user" size={24} color={Colors.black} />
                        <Text style={{ fontFamily: OutfitSemiBold, fontSize: 18 }}>Edit Profile</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: "center" }}>
                        <MaterialIcons name="notifications-none" size={24} color="black" />
                        <Text style={{ fontFamily: OutfitSemiBold, fontSize: 18 }}>Notification</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: "center" }}>
                        <MaterialIcons name="payment" size={24} color="black" />
                        <Text style={{ fontFamily: OutfitSemiBold, fontSize: 18 }}>Payment</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: "center" }}>
                        <MaterialIcons name="help-outline" size={24} color="black" />
                        <Text style={{ fontFamily: OutfitSemiBold, fontSize: 18 }}>Help Center</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <TouchableOpacity onPress={removeToken} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: "center" }}>
                        <MaterialIcons name="logout" size={24} color={Colors.red} />
                        <Text style={{ fontFamily: OutfitSemiBold, fontSize: 18, color: Colors.red }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}