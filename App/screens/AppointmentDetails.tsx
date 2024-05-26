import Title from "@/components/BookAppointment/Title";
import PageHeader from "@/components/Share/PageHeader";
import { IPatient } from "@/redux/reducers/user/type";
import { IDoctorResponse } from "@/redux/type";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitLight, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IAppointment } from "./Appointment";
import moment from "moment";
import { genderOption, packageIcons, rolePatient } from "@/constants/constants";
import { Ionicons } from '@expo/vector-icons';
import { useChatContext } from "stream-chat-expo";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import * as Crypto from 'expo-crypto';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { actions as appStateActions } from "@/redux/reducers/appState";

export default function AppointmentDetails() {
    const { client } = useChatContext();
    const { user } = useAppSelector(stase => stase.user);
    const role = user.role;
    const params = useRoute().params;
    const appointment = params.appointment as IAppointment;
    const { doctor, patient } = appointment;
    const dateFormat = moment(appointment.date).format("MMM DD, YYYY");
    const timeMoment = moment(appointment.date);
    const packageIcon = packageIcons.find((item) => item.name === appointment.packageAppointment.name);
    const navigation = useNavigation();
    const dateNow = moment(new Date());
    const isAfterOrEqual = dateNow.isSame(moment(appointment.date), 'day');
    const isTruncated = appointment.description && appointment.description.length > 100;
    const dispatch = useAppDispatch();

    const videoClient = useStreamVideoClient();

    const appointmentActions = {
        'Messaging': async () => {
            const channel = client.channel('messaging', {
                members: [`${patient?.id}`, `${doctor?.id}`]
            });
            try {
                await channel.create();
            } catch (error) {
                console.error(error.message);
            }
            navigation.navigate('History' as never, {
                cid: channel.cid,
                appointmentid: appointment.id,
            });
        },
        'Voice Call': async () => {
            const UUID = Crypto.randomUUID();
            const call = videoClient?.call('default', UUID);
            dispatch(appStateActions.setAppointmentCallId(appointment.id));
            await call?.getOrCreate({
                ring: true,
                data: {
                    members: [{ user_id: `${patient?.id}` }, { user_id: `${doctor?.id}` }]
                }
            });
        },
        'Video Call': async () => {

            const UUID = Crypto.randomUUID();
            const call = videoClient?.call('default', UUID);
            dispatch(appStateActions.setAppointmentCallId(appointment.id));
            await call?.getOrCreate({
                ring: true,
                data: {
                    members: [{ user_id: `${patient?.id}` }, { user_id: `${doctor?.id}` }]
                }
            });

            // navigation.navigate('CallScreen' as never, {
            //     callId: UUID
            // });
        },
    };

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <PageHeader title={"My Appointemnt"} />

                <View style={styles.cardContainer}>
                    <Image source={{ uri: role == rolePatient ? doctor?.avatar : patient?.avatar }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{role == rolePatient ? doctor?.name : patient?.name}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View>
                            <Text style={styles.textInfo}>{role == rolePatient ? doctor?.specialization_name : patient?.address}</Text>
                            <Text style={styles.textInfo2}>{role == rolePatient ? doctor?.hospital : patient?.phone_number}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Title title="Scheduled Appointment" />
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>{isAfterOrEqual && 'Today, '} {dateFormat}</Text>
                        <Text style={{ fontFamily: OutfitRegular, color: Colors.text_gray, marginTop: 10, fontSize: 18 }}>{timeMoment.format('HH:mm')} - {timeMoment.add(appointment.duration * 60, 'minutes').format('HH:mm A')} ({appointment.duration * 60} minutes)</Text>
                    </View>
                </View>

                <View>
                    <Title title="Patient Information" />
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ width: '30%', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>Full Name</Text>
                            <Text style={{ marginRight: 10 }}>:</Text>
                            <Text style={{ textAlign: 'left', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>{patient?.name}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ width: '30%', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>Gender</Text>
                            <Text style={{ marginRight: 10 }}>:</Text>
                            <Text style={{ textAlign: 'left', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>{genderOption.find((item) => {
                                return item.value === patient?.gender
                            })?.label}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ width: '30%', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>Age</Text>
                            <Text style={{ marginRight: 10 }}>:</Text>
                            <Text style={{ textAlign: 'left', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>{moment().diff(patient?.date_of_birth, 'years')}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ width: '30%', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>Problem</Text>
                            <Text style={{ marginRight: 10 }}>:</Text>
                            <Text numberOfLines={3} ellipsizeMode="tail" style={{ width: '65%', textAlign: 'left', fontFamily: OutfitRegular, color: Colors.text_gray, fontSize: 18 }}>{appointment.description}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Title title={role == rolePatient ? "Your Package" : "Patient's Package"} />
                    <View style={{
                        marginHorizontal: 10, marginTop: 10, backgroundColor: Colors.white,
                        padding: 8,
                        borderRadius: 25
                    }}>
                        <View style={styles.serviceItem}>
                            <View style={{
                                backgroundColor: Colors.secondary,
                                padding: 13,
                                borderRadius: 99,
                                alignItems: 'center',
                            }}>
                                <Ionicons name={appointment.packageAppointment.icon} size={28} color={Colors.primary} />
                            </View>
                            <View style={styles.serviceInfo}>
                                <Text style={{ fontFamily: OutfitBold, fontSize: 20, marginBottom: 3 }}>{appointment.packageAppointment.name}</Text>
                                <Text style={{ fontFamily: OutfitLight, color: Colors.text_gray }}>{appointment.packageAppointment.description}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>${appointment.packageAppointment.price}</Text>
                                <Text style={styles.durationText}>(paid)</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                <TouchableOpacity
                    onPress={async () => {
                        const appointmentSelected = packageIcons.find((item) => item.id === appointment.packageAppointment.id);
                        const action = appointmentActions[appointmentSelected?.name];
                        if (action) {
                            await action();
                        }
                    }}
                    style={{
                        padding: 15,
                        backgroundColor: Colors.primary,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 15,
                        width: Dimensions.get('screen').width * 0.9
                    }}
                >
                    <Ionicons name={appointment.packageAppointment.icon} size={25} color={Colors.white} />
                    <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitRegular }}>{appointment.packageAppointment.name}</Text>
                </TouchableOpacity>
            </View >
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
        fontFamily: OutfitRegular,
        color: Colors.text_gray
    },
    cartInfoText2: {
        fontFamily: OutfitSemiBold,
        color: Colors.black
    },
    viewMore: {
        color: Colors.primary,
        marginTop: 5,
        fontFamily: OutfitLight
    },
    serviceItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center', // Align items vertically
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    serviceInfo: {
        flex: 1 // Allow service info to take up available space
    },
    priceContainer: {
        alignItems: 'flex-end' // Align price and duration to the right
    },
    priceText: {
        textAlign: 'right',
        fontSize: 20,
        fontFamily: OutfitBold,
        marginBottom: 3,
        color: Colors.primary
    },
    durationText: {
        textAlign: 'right',
        fontSize: 12,
        color: Colors.text_gray,
        fontFamily: OutfitLight,
    },
});