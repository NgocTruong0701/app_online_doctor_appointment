import { appointmentStatus, packageIcons } from "@/constants/constants";
import { IAppointment } from "@/screens/Appointment";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import moment from "moment";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch } from "@/redux/store";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "@assets/Shared/utils";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import CustomModal from "../Modal";
import { useState } from "react";
import { actions as appStateAction } from "@/redux/reducers/appState";

interface IAppointmentItemProps {
    appointment: IAppointment;
}

export default function AppoinmentMessItem({ appointment }: IAppointmentItemProps) {
    const { doctor, patient } = appointment;
    const isAppointmentCancelled = appointment.status === appointmentStatus.CANCELLED;
    const dateFormat = moment(appointment.date).format("MMM DD, YYYY");
    const timeFormat = moment(appointment.date).format('HH:mm A');
    const packageIcon = packageIcons.find((item) => item.name === appointment.packageAppointment.name);
    const navigation = useNavigation();
    const dateNow = moment(new Date());
    // const isAfterOrEqual = dateNow.isSameOrAfter(moment(appointment.date), 'minute');
    const [isVisible, setIsVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [textButton, setTextButton] = useState('');
    const dispatch = useAppDispatch();

    const onPress = async () => {
        navigation.navigate('AppointmentDetails' as never, {
            appointment: appointment
        })
    }

    const handleCancalAppointment = () => {
        dispatch(appStateAction.showLoading());
        axiosClient.post(`${API.API_CANCEL_APPOINTMENT}/${appointment.id}`)
            .then((response) => {
                setIsVisible(true);
                setIsSuccess(true);
                setMessage('Appointment cancellation successful!');
                setTitle('Success!');
                setTextButton('OK');
            })
            .catch(error => {
                console.error(error); // Log the error for debugging
                setIsVisible(true);
                setIsSuccess(false);
                setMessage('Appointment cancellation failed!');
                setTitle('Error!');
                setTextButton('OK');
            }).finally(() => {
                dispatch(appStateAction.hideLoading());
            })
    }

    const handleBookAgainAppointment = () => {
        navigation.navigate('DoctorDetails', {
            doctor: appointment.doctor
        })
    }

    const handleLeaveAReview = () => {
        navigation.navigate('LeaveAReview', {
            doctor: appointment.doctor,
            appointment: appointment,
        })
    }

    return (
        <View style={{
            marginLeft: 10, marginRight: 10, marginTop: 15, backgroundColor: Colors.white,
            borderRadius: 30,
            padding: 15,
        }}>
            <TouchableOpacity onPress={onPress} disabled={appointment.status === appointmentStatus.UPCOMING ? false : true}>
                <View style={styles.container}>
                    <Image source={{ uri: doctor?.avatar }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{doctor?.name}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textInfo}>{appointment.packageAppointment.name} - </Text>
                            <Text style={[styles.textInfo2, {
                                borderColor:
                                    appointment.status === appointmentStatus.UPCOMING ? Colors.primary :
                                        appointment.status === appointmentStatus.COMPLETED ? Colors.green :
                                            Colors.red
                            }, {
                                color:
                                    appointment.status === appointmentStatus.UPCOMING ? Colors.primary :
                                        appointment.status === appointmentStatus.COMPLETED ? Colors.green :
                                            Colors.red
                            }]}>{capitalizeFirstLetter(appointment.status)}</Text>
                        </View>
                        <View>
                            <Text style={styles.textInfo}>{dateFormat} | {timeFormat}</Text>
                        </View>
                    </View>
                    <View style={styles.actionButton}>
                        <View
                            style={[{
                                backgroundColor: Colors.secondary,
                                padding: 13,
                                borderRadius: 99,
                                alignItems: 'center',
                            }]}
                        >
                            <Ionicons name={packageIcon?.icon} size={25} color={Colors.primary} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {!isAppointmentCancelled &&
                <View>
                    <View style={styles.divider} />
                    {appointment.status === appointmentStatus.UPCOMING
                        ? <View>
                            <TouchableOpacity onPress={handleCancalAppointment} style={{ width: '100%', borderWidth: 1.5, borderRadius: 50, padding: 5, borderColor: Colors.primary }}>
                                <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.primary }}>Cancel Appointment</Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 20 }}>
                            <TouchableOpacity onPress={handleBookAgainAppointment} style={{ width: '100%', borderWidth: 1.5, borderRadius: 50, padding: 5, borderColor: Colors.primary, paddingHorizontal: 40 }}>
                                <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.primary }}>Book Again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleLeaveAReview} style={{ backgroundColor: Colors.primary, width: '100%', borderWidth: 1.5, borderRadius: 50, padding: 5, borderColor: Colors.primary, paddingHorizontal: 40 }}>
                                <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.white }}>Leave a Review</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} isSuccess={isSuccess} message={message} title={title} textButton={textButton} onPress={() => setIsVisible(false)} />
                </View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15,
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
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 13,
        marginBottom: 13,
    },
    textInfo: {
        color: Colors.text_gray,
        fontFamily: OutfitRegular,
        marginTop: 10
    },
    textInfo2: {
        color: Colors.text_gray,
        fontFamily: OutfitRegular,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 7,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
    },
    rateInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        fontFamily: OutfitRegular
    },
    actionButton: {
        alignItems: 'center',
    }
});