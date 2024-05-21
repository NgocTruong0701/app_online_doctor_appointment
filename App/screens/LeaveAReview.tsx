import Title from "@/components/BookAppointment/Title";
import PageHeader from "@/components/Share/PageHeader";
import { RadioGroup } from "@/components/react-native-radio-buttons-group";
import { navigate } from "@/navigations/Root";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RatingInput } from 'react-native-stock-star-rating';
import { actions as appStateActions } from "@/redux/reducers/appState";
import { useAppDispatch } from "@/redux/store";
import CustomModal from "@/components/Modal";

interface IFeedBack {
    id: number,
    rating: number,
    comment: string,
    date: string,
}

export default function LeaveAReview() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const params = useRoute().params;
    const { doctor, appointment } = params;
    const now = moment();
    const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');
    const dispatch = useAppDispatch();
    const [feedBackOld, setFeedBackOld] = useState<IFeedBack>();

    const [isVisible, setIsVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [textButton, setTextButton] = useState('');
    const onPress = () => {
        setIsVisible(false);
        navigate('AppointmentScreen');
    }

    useEffect(() => {
        axiosClient.get(`${API.API_GET_FEEDBACK_APPOINTMENT}/${appointment.id}`).then((response) => {
            const feedback = response.data.data as IFeedBack;
            setFeedBackOld(feedback);
            setRating(feedback.rating ? feedback.rating : 0);
            setReview(feedback.comment ? feedback.comment : '');
        })
    }, [])

    const handleSendReview = () => {
        dispatch(appStateActions.showLoading());
        const api = !feedBackOld ? API.API_PATIENT_FEEDBACK : `${API.API_UPDATE_FEEDBACK}/${feedBackOld.id}`;
        const dataCreate = {
            doctor_id: doctor.id,
            rating: rating,
            comment: review,
            date: formattedDate,
            appointment_id: appointment.id,
        };
        const dataUpdate = {
            rating: rating,
            comment: review,
            date: formattedDate,
        }

        const data = !feedBackOld ? dataCreate : dataUpdate;
        console.log(api);
        console.log(data);

        axiosClient.post(api, data).then((response) => {
            setIsVisible(true);
            setIsSuccess(true);
            setTitle('Review Successful!');
            setMessage('Your review has been successfully submitted, thank you very much');
            setTextButton('OK');
        }).catch(err => {
            setIsVisible(true);
            setIsSuccess(false);
            setTitle('Review Error!');
            setMessage('Your review has been error submitted, please try again');
            setTextButton('OK');
        }).finally(() => {
            dispatch(appStateActions.hideLoading());
        })
    }

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <View>
                    <PageHeader title="Review Summary" />

                    <View style={{ marginTop: 25, marginBottom: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Image source={{ uri: doctor.avatar }} style={{ width: 150, height: 150, borderRadius: 99 }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: OutfitBold, fontSize: 20, textAlign: 'center', width: '80%' }}>How was your experience with {doctor.name}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <RatingInput
                            rating={rating}
                            setRating={setRating}
                            size={50}
                            maxStars={5}
                            bordered={false}
                            color={Colors.primary}
                        />
                    </View>
                </View>

                <View style={{ borderTopColor: Colors.gray, borderTopWidth: 0.5, marginTop: 15, marginRight: 10, marginLeft: 10 }}>
                    <Title title="Write Your Review" />
                    <View style={{ marginTop: 10, borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8, backgroundColor: Colors.white }} >
                        <TextInput
                            multiline={true}
                            numberOfLines={14}
                            onChangeText={(text) => setReview(text)}
                            value={review}
                            placeholder="Your review here"
                            style={{ textAlignVertical: 'top', fontFamily: OutfitRegular }}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 20, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigate('AppointmentScreen');
                }} style={{ width: '100%', borderRadius: 50, padding: 15, backgroundColor: Colors.secondary, paddingHorizontal: 60 }}>
                    <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.primary }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendReview} style={{ backgroundColor: Colors.primary, width: '100%', borderWidth: 1.5, borderRadius: 50, padding: 15, borderColor: Colors.primary, paddingHorizontal: 60 }}>
                    <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.white }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} isSuccess={isSuccess} message={message} title={title} textButton={textButton} onPress={onPress} />
        </>
    )
}