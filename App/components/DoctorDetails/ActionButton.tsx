import { FlatList, Text, View, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { IDoctorItemProps } from "../Home/DoctorItem";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { IRatingResponse } from "../DoctorScreen/DoctorCard";
import { OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useFocusEffect } from "@react-navigation/native";

interface IActionButtonList {
    id: number;
    name: string;
    icon: string;
    type: string;
    value: any;
}

export default function ActionButton({ doctor }: IDoctorItemProps) {
    const [countPatient, setCountPatient] = useState(0);

    useEffect(() => {
        axiosClient.get(`${API.API_GET_COUNT_PATIENT_BY_DOCTOR}/${doctor?.id}`).then((response) => {
            setCountPatient(response.data.data.countPatient);
        })
    }, [doctor?.id]);

    const actionButtonList: IActionButtonList[] = [
        {
            id: 1,
            name: 'patients',
            icon: 'people-group',
            type: 'fontawesome6',
            value: countPatient,
        },
        {
            id: 2,
            name: 'years experience',
            icon: 'chart-line',
            type: 'fontawesome6',
            value: doctor?.years_experience,
        },
        {
            id: 3,
            name: 'rating',
            icon: 'star-half-alt',
            type: 'fontawesome6',
            value: doctor?.averageRating != "NaN" ? doctor?.averageRating : 0,
        },
        {
            id: 4,
            name: 'reviews',
            icon: 'chatbubble-ellipses',
            type: 'ionicons',
            value: doctor?.feedbackCount,
        }
    ]

    return (
        <View style={{ marginTop: 25 }} >
            <FlatList
                data={actionButtonList}
                numColumns={5}
                scrollEnabled={false}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                renderItem={({ item }) => (
                    <View style={styles.actionButton}>
                        <View style={{
                            backgroundColor: Colors.secondary,
                            padding: 13,
                            borderRadius: 99,
                            alignItems: 'center',
                        }}>
                            {item.type === 'fontawesome6' ?
                                (<FontAwesome6 name={item.icon} size={25} color={Colors.primary} />) :
                                (<Ionicons name={item.icon} size={25} color={Colors.primary} />)
                            }
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>{item.value}</Text>
                        </View>
                        <Text style={styles.text2} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        alignItems: 'center',
        overflow: 'hidden',
    },
    text1: {
        fontFamily: OutfitSemiBold,
        textAlign: 'center',
        color: Colors.primary,
        marginTop: 10,
        marginBottom: 5,
    },
    text2: {
        fontFamily: OutfitRegular,
        textAlign: 'center',
        color: Colors.text_gray,
        width: 70,
    }
});