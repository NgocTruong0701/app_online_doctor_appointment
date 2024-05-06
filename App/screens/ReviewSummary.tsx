import CustomModal from "@/components/Modal";
import PageHeader from "@/components/Share/PageHeader";
import { packageAppoinment } from "@/constants/constants";
import { useAppSelector } from "@/redux/store";
import { Colors } from "@assets/Shared";
import { OutfitLight, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ReviewSummary() {
    const { doctorSelected } = useAppSelector(state => state.doctorSelected);
    const { date, time, problem } = useAppSelector(state => state.appointmentDetails);
    const { user } = useAppSelector(state => state.user);

    const [isVisible, setIsVisible] = useState(false);

    const timeFormat = moment(time, 'HH:mm');
    const dateObj = moment(date, "YYYY/MM/DD").toDate();
    const dateFormat = moment(dateObj).format("MMM DD, YYYY");

    const navigation = useNavigation();

    return (
        <>
            <ScrollView style={{
                padding: 10,
                marginTop: 20
            }}>
                <PageHeader title="Review Summary" />

                <View style={styles.cardContainer}>
                    <Image source={{ uri: doctorSelected?.avatar }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{doctorSelected?.name}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.textInfo}>{doctorSelected?.specialization?.name}</Text>
                            <Text style={styles.textInfo2}>{doctorSelected?.hospital}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardInfo}>
                    <View style={styles.cartInfoRow}>
                        <Text style={styles.cartInfoText1}>Date & Hour</Text>
                        <Text style={styles.cartInfoText2}>{dateFormat} | {timeFormat.format('hh:mm A')}</Text>
                    </View>
                    <View style={styles.cartInfoRow}>
                        <Text style={styles.cartInfoText1}>Package</Text>
                        <Text style={styles.cartInfoText2}>{packageAppoinment[0].name}</Text>
                    </View>
                    <View style={styles.cartInfoRow}>
                        <Text style={styles.cartInfoText1}>Duration</Text>
                        <Text style={styles.cartInfoText2}>30 mimutes</Text>
                    </View>
                </View>

                <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} />
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(true);
                        // dispatch(appointmentDetailActions.setProblem(problem));
                        // navigation.navigate('ReviewSummary' as never)
                    }}
                    style={{
                        padding: 15,
                        backgroundColor: Colors.primary,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        width: Dimensions.get('screen').width * 0.9
                    }}
                >
                    <Text style={{ fontSize: 17, color: Colors.white }}>Next</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 15,
        marginTop: 25,
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
        fontFamily: OutfitSemiBold
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
    textInfo2: {
        color: Colors.text_gray,
        marginTop: 10,
        fontFamily: OutfitRegular
    },
    rateInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    cardInfo: {
        backgroundColor: Colors.white,
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        paddingBottom: -10,
    },
    cartInfoRow: {
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartInfoText1: {
        fontFamily: OutfitLight,
        color: Colors.text_gray
    },
    cartInfoText2: {
        fontFamily: OutfitSemiBold,
        color: Colors.black
    }
});