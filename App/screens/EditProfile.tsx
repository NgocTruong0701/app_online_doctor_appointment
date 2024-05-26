import PageHeader from "@/components/Share/PageHeader";
import { genderOption, rolePatient } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Colors } from "@assets/Shared";
import { OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from '@expo/vector-icons';
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { actions as appStateAction } from "@/redux/reducers/appState";
import { getUser } from "@/redux/reducers/user/thunk";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile() {
    const { user } = useAppSelector(state => state.user);
    const account = user.doctor ? user.doctor : user.patient;

    const [name, setName] = useState(account?.name);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [birthDate, setBirthDate] = useState(moment(account?.date_of_birth, 'YYYY-MM-DD').format('DD/MM/YYYY'));

    const [address, setAddress] = useState(account?.address);
    const [phoneNumber, setPhoneNumber] = useState(account?.phone_number ? account.phone_number : '+84');

    const role = user.role;

    const patientGender = genderOption.find(item => {
        return item.value == account?.gender;
    })?.value;
    const [gender, setGender] = useState(!patientGender ? genderOption[0].value : patientGender);

    const [hospital, setHospital] = useState(user.doctor?.hospital);
    const [years_experience, setYearsExperience] = useState(user.doctor?.years_experience ?? 0);
    const [timeStart, setTimeStart] = useState(user.doctor?.time_start);
    const [timeEnd, setTimeEnd] = useState(user.doctor?.time_end);
    const [startDateOfWeek, setStartDateOfWeek] = useState(user.doctor?.start_day_of_week);
    const [endDateOfWeek, setEndDateOfWeek] = useState(user.doctor?.end_day_of_week);
    const [description, setDescription] = useState(user.doctor?.description);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        setBirthDate(moment(date).format('DD/MM/YYYY'));
        hideDatePicker();
    };

    const handlSetGender = (gender: number) => {
        setGender(gender);
    }

    const dispatch = useAppDispatch();

    const navigation = useNavigation();

    const handlUpdateProfile = () => {
        const API_UPDATE = user.doctor ? API.API_BASE_DOCTOR : API.API_BASE_PATIENT;
        const data = user.doctor ? {
            name: name,
            date_of_birth: moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            gender: gender,
            phone_number: phoneNumber,
            address: address,
            hospital: hospital,
            years_experience: years_experience,
            description: description
        } : {
            name: name,
            date_of_birth: moment(birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            gender: gender,
            phone_number: phoneNumber,
            address: address
        }
        dispatch(appStateAction.showLoading());
        axiosClient.patch(`${API_UPDATE}/${account?.id}`, data).then((response) => {
            dispatch(getUser()).unwrap().catch(error => {
                console.error(error.message);
                navigation.navigate("Login" as never);
            });
        }).catch((error) => {
            alert('Update profile failed')
            console.error(error.message);
        }).finally(() => {
            dispatch(appStateAction.hideLoading());
        })
    }

    return (
        <>
            {role === rolePatient ? (
                <>
                    <ScrollView style={{ padding: 10, marginTop: 20 }}>
                        <PageHeader title={'Edit Profile'} />

                        <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your name" onChangeText={(newText) => setName(newText)} value={name} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <TouchableOpacity style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }} onPress={showDatePicker}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TextInput
                                        numberOfLines={1}
                                        editable={false}
                                        placeholder="Choose Your Date of Birth"
                                        value={birthDate}
                                        style={{
                                            fontFamily: OutfitSemiBold
                                        }}
                                    />
                                    <FontAwesome5 name="calendar-alt" size={24} color="black" />
                                </View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput editable={false} value={user.email} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your place" value={address} onChangeText={(newText) => setAddress(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your phone number" maxLength={12} value={phoneNumber} onChangeText={(newText) => setPhoneNumber(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', borderRadius: 10, marginBottom: 20 }}>
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => { void handlSetGender(itemValue) }}
                                >
                                    {genderOption.map(item => (
                                        <Picker.Item key={item.value} value={item.value} label={item.label} style={styles.itemPicker} />
                                    ))}
                                </Picker>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                        <TouchableOpacity
                            onPress={handlUpdateProfile}
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
                            <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitRegular }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <ScrollView style={{ padding: 10, marginTop: 20 }}>
                        <PageHeader title={'Edit Profile'} />

                        <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your name" onChangeText={(newText) => setName(newText)} value={name} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <TouchableOpacity style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }} onPress={showDatePicker}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TextInput
                                        numberOfLines={1}
                                        editable={false}
                                        placeholder="Choose Your Date of Birth"
                                        value={birthDate}
                                        style={{
                                            fontFamily: OutfitSemiBold
                                        }}
                                    />
                                    <FontAwesome5 name="calendar-alt" size={24} color="black" />
                                </View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </TouchableOpacity>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput editable={false} value={user.email} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your place" value={address} onChangeText={(newText) => setAddress(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Please enter your phone number" maxLength={12} value={phoneNumber} onChangeText={(newText) => setPhoneNumber(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', borderRadius: 10, marginBottom: 20 }}>
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => { void handlSetGender(itemValue) }}
                                >
                                    {genderOption.map(item => (
                                        <Picker.Item key={item.value} value={item.value} label={item.label} style={styles.itemPicker} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput editable={false} placeholder="Specialazation" maxLength={12} value={user.doctor?.specialization.name} onChangeText={(newText) => setPhoneNumber(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ backgroundColor: Colors.white, width: '100%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput placeholder="Hospital" maxLength={12} value={hospital} onChangeText={(newText) => setHospital(newText)} style={{ width: '100%', fontFamily: OutfitSemiBold }} />
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.white, width: '50%', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                                <TextInput keyboardType="numeric" placeholder="Years Experience" maxLength={12} value={years_experience.toString()} onChangeText={(newText) => setYearsExperience(+newText)} style={{ width: '20%', fontFamily: OutfitSemiBold }} />
                                <Text style={{ fontFamily: OutfitSemiBold }}>Years</Text>
                            </View>

                            <View style={{ marginTop: 10, borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8, backgroundColor: Colors.white, marginBottom: 20 }} >
                                <TextInput
                                    multiline={true}
                                    numberOfLines={12}
                                    onChangeText={(text) => setDescription(text)}
                                    value={description}
                                    placeholder="About me"
                                    style={{ textAlignVertical: 'top', fontFamily: OutfitRegular }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                        <TouchableOpacity
                            onPress={handlUpdateProfile}
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
                            <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitRegular }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    pickerContainer: {
        marginTop: 10,
        borderWidth: 0.6,
        borderColor: Colors.gray,
        borderRadius: 8,
        backgroundColor: Colors.white
    },
    itemPicker: {
        fontFamily: OutfitRegular
    }
});