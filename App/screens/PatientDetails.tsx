import Title from "@/components/BookAppointment/Title";
import PageHeader from "@/components/Share/PageHeader";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import { useState } from "react";
import { Dimensions, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { defaultAge, genderOption } from "@/constants/constants";
import { calculateAge, calculateDateOfBirth } from "@assets/Shared/utils";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { getUser } from "@/redux/reducers/user/thunk";
import { useNavigation } from "@react-navigation/native";
import { actions as appointmentDetailActions } from "@/redux/reducers/appointmentDetails"

export default function PatientDetails() {
    const { user } = useAppSelector(state => state.user);
    const { patient } = user;

    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const patientGender = genderOption.find(item => {
        return item.value == patient?.gender;
    })?.value;
    const [gender, setGender] = useState(!patientGender ? genderOption[0].value : patientGender);


    const patientAge = !patient?.date_of_birth ? defaultAge : calculateAge(patient?.date_of_birth);
    const [age, setAge] = useState(patientAge);

    const [problem, setProblem] = useState('');

    const handlSetGender = (gender: number) => {
        setGender(gender)

        if (!patient?.gender) {
            axiosClient.patch(`${API.API_BASE_PATIENT}/${patient?.id}`, {
                gender: gender
            }).then(response => {
                dispatch(getUser()).catch(error => {
                    console.error('Error dispatch: ', error.message);
                    navigation.navigate("Login" as never);
                });
            }).catch(error => {
                console.error(error.message);
                navigation.navigate("Login" as never);
            })
        }
    }

    const handlSetAge = (age: number) => {
        setAge(age)

        if (!patient?.date_of_birth) {
            const dateOfBirth = calculateDateOfBirth(age);
            axiosClient.patch(`${API.API_BASE_PATIENT}/${patient?.id}`, {
                date_of_birth: dateOfBirth
            }).then(response => {
                dispatch(getUser()).catch(error => {
                    console.error('Error dispatch: ', error.message);
                    navigation.navigate("Login" as never);
                });
            }).catch(error => {
                console.error(error.message);
                navigation.navigate("Login" as never);
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View onStartShouldSetResponder={() => true}>
                <ScrollView style={styles.container}>
                    <PageHeader title="Patient Details" />

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Full Name" />
                        <View style={{ marginTop: 10, borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8, backgroundColor: Colors.white }}>
                            <TextInput
                                placeholder="Name"
                                style={{ width: '100%', fontFamily: OutfitRegular }}
                                value={patient?.name}
                                readOnly={true}
                            />
                        </View>
                    </View>

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Gender" />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) => { void handlSetGender(itemValue) }}
                                enabled={!patient?.gender}
                            >
                                {genderOption.map(item => (
                                    <Picker.Item key={item.value} value={item.value} label={item.label} style={styles.itemPicker} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Your Age" />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={age}
                                onValueChange={(itemValue) => { void handlSetAge(itemValue) }}
                                enabled={!patient?.date_of_birth}
                            >
                                {Array.from({ length: 100 }, (_, i) => (
                                    <Picker.Item key={i} label={`${i + 1} years`} value={i + 1} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Write Your Problem" />
                        <View style={{ marginTop: 10, borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8, backgroundColor: Colors.white }} >
                            <TextInput
                                multiline={true}
                                numberOfLines={15}
                                onChangeText={(text) => setProblem(text)}
                                value={problem}
                                placeholder="Enter your problem"
                                style={{ textAlignVertical: 'top' }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(appointmentDetailActions.setProblem(problem));
                            navigation.navigate('ReviewSummary' as never)
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
            </View>
        </TouchableWithoutFeedback>
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