import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import SubHeading from "./SubHeading";
import { useNavigation } from "@react-navigation/native";
import { API } from "@/services/Apis/api";

interface ICategory {
    id: number,
    name: string,
    description: string,
    icon: string,
    created_at: Date,
    updated_at: Date,
}

export default function Categories() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([] as ICategory[]);

    useEffect(() => {
        axiosClient.get(API.API_GET_SPECIALIZATIONS).then(response => {
            setCategories(response.data)
        })
    }, [])

    if (!categories) {
        return null;
    }

    const moreButton: ICategory = {
        id: categories.length + 1,
        name: "More",
        created_at: new Date(),
        updated_at: new Date(),
        description: "More",
        icon: "https://doctor-appointment-bucket.s3.ap-southeast-1.amazonaws.com/category/horizontal-menu-circle--navigation-dots-three-circle-button-horizontal-menu.png"
    }
    return (
        <View style={{ marginTop: 10 }}>
            <SubHeading subHeadingTitle={"Doctor Speciality"} route={null} />

            <FlatList
                data={[...categories, moreButton]}
                numColumns={4}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                style={{ marginTop: 5 }}
                renderItem={({ item, index }) => index < 8 && (
                    <TouchableOpacity
                        onPress={() => item.id != 8 ? navigation.navigate('DoctorOfSpecialityList', {
                            categoryName: item.name,
                            categoryId: item.id
                        }) : console.log('More')}
                        style={{
                            alignItems: 'center', marginBottom: 10
                        }}>
                        <View style={{
                            backgroundColor: Colors.secondary,
                            padding: 15,
                            borderRadius: 99,
                        }}>
                            <Image source={{ uri: item.icon }} style={{ width: 40, height: 40 }} />
                        </View>
                        <Text
                            style={{
                                marginTop: 15,
                                fontFamily: OutfitRegular,
                                width: 80,
                                textAlign: 'center'
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}