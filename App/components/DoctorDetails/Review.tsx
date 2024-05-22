import { screenWidth } from "@/constants/constants";
import { IFeedBackResponse } from "@/screens/DoctorDetails";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitLight, OutfitRegular } from "@assets/Shared/typography";
import moment from "moment";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

interface IReviewProps {
    reviews: IFeedBackResponse[]
}
export default function Review({ reviews }: IReviewProps) {

    return (
        <View style={{ width: screenWidth, gap: 20 }}>
            <View style={styles.container}>
                <Image source={{ uri: reviews[0].patientAvatar }} style={{ width: 50, height: 50, borderRadius: 99 }} />
                <View style={{}}>
                    <View style={{}}>
                        <Text style={styles.name}>{reviews[0].patientName}</Text>
                    </View>
                    <View style={{}} />
                    <View>
                        <Text style={styles.comment} numberOfLines={1} ellipsizeMode="tail">{reviews[0].comment}</Text>
                        <Text style={styles.date}>{moment(reviews[0].date).format('DD/MM/YYYY - hh:mm:ss')}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <Image source={{ uri: reviews[1].patientAvatar }} style={{ width: 50, height: 50, borderRadius: 99 }} />
                <View style={{ width: '100%' }}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.name}>{reviews[1].patientName}</Text>
                    </View>
                    <View style={{}} />
                    <View>
                        <Text style={styles.comment}>{reviews[1].comment}</Text>
                        <Text style={styles.date}>{moment(reviews[0].date).format('DD/MM/YYYY - hh:mm:ss')}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 15, width: '100%' },
    name: {
        fontFamily: OutfitBold,
    },
    date: {
        fontFamily: OutfitLight,
        color: Colors.text_gray
    },
    comment: {
        width: screenWidth * 0.7,
        fontFamily: OutfitRegular,
        color: Colors.text_gray,
    }
});