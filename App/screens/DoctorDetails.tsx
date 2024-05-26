import DoctorCard from "@/components/DoctorScreen/DoctorCard";
import PageHeader from "@/components/Share/PageHeader";
import { IDoctorResponse } from "@/redux/type";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ActionButton from "@/components/DoctorDetails/ActionButton";
import SubTitle from "@/components/DoctorDetails/SubTitle";
import SubHeading from "@/components/Home/SubHeading";
import BookAppointmentButton from "@/components/DoctorDetails/BookAppointmentButton";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { defaultLimit, screenWidth } from "@/constants/constants";
import Review from "@/components/DoctorDetails/Review";

export interface IFeedBackResponse {
    id?: number,
    rating?: number,
    comment?: string,
    date?: string,
    patientId?: number,
    doctorId?: number,
    appointmentId?: number | null,
    patientName?: string,
    patientAvatar?: string | null,
}

export default function DoctorDetails() {
    const param = useRoute().params;
    const [doctor, setDoctor] = useState<IDoctorResponse>(param.doctor);
    const [reviews, setReviews] = useState<IFeedBackResponse[][]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setDoctor(param.doctor);
        doctor?.isFavorite == 1 ? setIsFavorite(true) : setIsFavorite(false);
        axiosClient.get(`${API.API_GET_REVIEW_DOCTOR}/${doctor.id}?limit=${defaultLimit}`)
            .then(response => {
                const reviewData: IFeedBackResponse[] = response.data.data;
                const pairedReviews = createPairs(reviewData);
                setReviews(pairedReviews);
            });
    }, [param.doctor.id]);

    const createPairs = (data: IFeedBackResponse[]): IFeedBackResponse[][] => {
        const pairs: IFeedBackResponse[][] = [];
        for (let i = 0; i < data.length; i += 2) {
            if (i + 1 < data.length) {
                pairs.push([data[i], data[i + 1]]);
            } else {
                pairs.push([data[i]]);
            }
        }
        return pairs;
    }

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <PageHeader title={doctor?.name} />

                <View style={styles.container}>
                    <Image source={{ uri: doctor?.avatar }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{doctor?.name}</Text>
                            {<FontAwesome name={isFavorite ? "heart" : "heart-o"} size={22} color={Colors.blue} />}
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.textInfo}>{doctor?.specialization_name}</Text>
                            <Text style={styles.textInfo2}>{doctor?.hospital}</Text>
                        </View>
                    </View>
                </View>

                <ActionButton doctor={doctor} />

                <SubTitle title={'About me'} content={doctor?.description} />
                <SubTitle title={'Working Time'} content={doctor?.schedule} />

                <View style={{ margin: 10 }}>
                    <SubHeading subHeadingTitle="Reviews" route={null} />
                    {reviews.length != 0 && <FlatList
                        data={reviews}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Review reviews={item} />
                        )}
                        style={{ width: '100%' }}
                        pagingEnabled
                        decelerationRate={0}
                        snapToOffsets={reviews.map((x, i) => {
                            return ((i * (screenWidth)) + screenWidth)
                        })
                        }
                        snapToAlignment={"center"}
                    />}
                </View>
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }}>
                <BookAppointmentButton doctor={doctor} />
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