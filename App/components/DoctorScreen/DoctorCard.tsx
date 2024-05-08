import { Image, StyleSheet, Text, View } from "react-native";
import { IDoctorItemProps } from "../Home/DoctorItem";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import { useCallback, useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";

export interface IRatingResponse {
    averageRating: number;
    feedbackCount: number;
}

export default function DoctorCard({ doctor }: IDoctorItemProps) {
    const [averageRating, setAverageRating] = useState(0);
    const [reviews, setReviews] = useState(0);

    useEffect(() => {
        axiosClient.get(`${API.API_BASE_FEEDBACK}/${doctor?.id}`).then((response) => {
            const data = response.data.data as IRatingResponse;
            setAverageRating(data.averageRating);
            setReviews(data.feedbackCount);
        });
    }, [doctor?.id]);
    return (
        <View style={styles.container}>
            <Image source={{ uri: doctor?.avatar }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.name}>{doctor?.name}</Text>
                    <FontAwesome name="heart-o" size={22} color={Colors.blue} />
                </View>
                <View style={styles.divider} />
                <View>
                    <Text style={styles.textInfo}>{doctor?.specialization?.name} | {doctor?.hospital}</Text>
                    <View style={styles.rateInfo}>
                        <FontAwesome name="star-half-full" size={20} color={Colors.blue} />
                        <Text style={styles.textInfo}>{averageRating}   ({reviews} reviews)</Text>
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
