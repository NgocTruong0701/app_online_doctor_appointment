import { Image, StyleSheet, Text, View } from "react-native";
import { IDoctorItemProps } from "../Home/DoctorItem";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { OutfitBold } from "@assets/Shared/typography";
import { useState } from "react";

interface IRatingResponse {
    
}

export default function DoctorCard({ doctor }: IDoctorItemProps) {
    const [rating, setRating] = useState(0);
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
                        <Text style={styles.textInfo}>3.5   ({doctor.gender} reviews)</Text>
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
        marginBottom: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 30,
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
    },
    rateInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    }
});
