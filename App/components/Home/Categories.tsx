import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

interface ICategory {
    id: number,
    name: string,
    description: string,
    icon: string,
    created_at: Date,
    updated_at: Date,
}

export default function Categories() {
    const [categories, setCategories] = useState([] as ICategory[]);

    useEffect(() => {
        axiosClient.get("/specializations").then(response => {
            setCategories(response.data)
        })
    }, [])

    if (!categories) {
        return null;
    }

    console.log(categories);
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: OutfitBold
                }}>Doctor Speciality</Text>
                <Text style={{ fontFamily: OutfitRegular, color: Colors.primary }}>See All</Text>
            </View>

            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <View>
                        <View>
                            <Image source={{ uri: item.icon }} style={{ width: 30, height: 30 }} />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}