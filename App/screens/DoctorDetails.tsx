import DoctorCard from "@/components/DoctorScreen/DoctorCard";
import PageHeader from "@/components/Share/PageHeader";
import { IDoctorResponse } from "@/redux/type";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ActionButton from "@/components/DoctorDetails/ActionButton";
import SubTitle from "@/components/DoctorDetails/SubTitle";
import SubHeading from "@/components/Home/SubHeading";
import BookAppointmentButton from "@/components/DoctorDetails/BookAppointmentButton";

export default function DoctorDetails() {
    const param = useRoute().params;
    const [doctor, setDoctor] = useState<IDoctorResponse>(param.doctor);
    useEffect(() => {
        setDoctor(param.doctor);
    }, []);

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <PageHeader title={doctor?.name} />

                <View style={styles.container}>
                    <Image source={{ uri: doctor?.avatar }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{doctor?.name}</Text>
                            <FontAwesome name="heart-o" size={22} color={Colors.blue} />
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.textInfo}>{doctor?.specialization?.name}</Text>
                            <Text style={styles.textInfo2}>{doctor?.hospital}</Text>
                        </View>
                    </View>
                </View>

                <ActionButton doctor={doctor} />

                <SubTitle title={'About me'} content={doctor?.description} />
                <SubTitle title={'Working Time'} content={doctor?.schedule} />

                <View style={{ margin: 10 }}>
                    <SubHeading subHeadingTitle="Reviews" />
                </View>
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }}>
                <BookAppointmentButton doctor={doctor}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 30,
        padding: 15,
        marginTop: 25,
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
    }
});