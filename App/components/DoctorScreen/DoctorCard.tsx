import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IDoctorItemProps } from "../Home/DoctorItem";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import { useCallback, useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "@/redux/store";

export interface IRatingResponse {
    averageRating: number;
    feedbackCount: number;
}

export default function DoctorCard({ doctor }: IDoctorItemProps) {
    const { user } = useAppSelector(state => state.user);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = (doctorId: number | undefined) => {
        if (doctor != undefined) {
            setIsFavorite(!isFavorite);
            axiosClient.post(API.API_FAVORITE_DOCTOR,
                {
                    patientId: user.patient?.id,
                    doctorId: doctorId
                }).catch((error) => {
                    setIsFavorite(!isFavorite);
                })
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: doctor?.avatar }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.name}>{doctor?.name}</Text>
                    <Pressable onPress={() => {
                        handleFavorite(doctor?.id);
                    }}>
                        <FontAwesome name="heart-o" size={22} color={Colors.blue} />
                    </Pressable>
                </View>
                <View style={styles.divider} />
                <View>
                    <Text style={styles.textInfo}>{doctor?.specialization_name} | {doctor?.hospital}</Text>
                    <View style={styles.rateInfo}>
                        <FontAwesome name="star-half-full" size={20} color={Colors.blue} />
                        <Text style={styles.textInfo}>{doctor?.averageRating != "NaN" ? doctor?.averageRating : 0}   ({doctor?.feedbackCount ? doctor?.feedbackCount : 0} reviews)</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 30,
        padding: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 20,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontFamily: OutfitBold
    },
    divider: {
        borderBottomColor: Colors.text_gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 13,
        marginBottom: 13,
    },
    textInfo: {
        color: Colors.text_gray,
        fontFamily: OutfitRegular
    },
    rateInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        fontFamily: OutfitRegular
    }
});
