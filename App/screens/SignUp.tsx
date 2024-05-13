import BackButton from "@/components/Share/BackButton";
import { OutfitBold, OutfitLight, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CustomModal from "@/components/Modal";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/redux/store";
import { actions as appStateAction } from "@/redux/reducers/appState";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { storage } from "@/localStorage";
import Title from "@/components/BookAppointment/Title";
import { Picker } from "@react-native-picker/picker";
import { defaultAvatar, roles } from "@/constants/constants";
import { ISpecialization } from "@/redux/type";

export default function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [textButton, setTextButton] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShow, setIsShow] = useState(false);
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [role, setRole] = useState('patient');
    const [specializations, setSpecializations] = useState<ISpecialization[]>([]);
    const [specializationId, setSpecializationId] = useState(1);

    const handleCheckValidEmail = (email: string) => {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        setEmail(email);
        if (regex.test(email)) {
            setCheckValidEmail(true);
        }
        else { setCheckValidEmail(false); }
    }

    const handlSignUpPassword = async () => {
        if (checkValidEmail && password.length != 0) {
            let name = email.split('@');
            try {
                dispatch(appStateAction.showLoading());
                const { data } = await axiosClient.post(API.API_SINGUP_PASSWORD, {
                    name: name[0],
                    specializationId: specializationId,
                    email: email,
                    password: password,
                    avatar: defaultAvatar,
                    role: role
                });

                dispatch(appStateAction.setEmailSignup(email));
                dispatch(appStateAction.hideLoading());
                setIsVisible(true);
                setIsSuccess(false);
                setMessage('SignUp successful, please check your mail and verify code');
                setTitle('SignUp Successful!');
                setTextButton('Verify Email');
            } catch (err) {
                dispatch(appStateAction.hideLoading());
                setIsVisible(true);
                setIsSuccess(false);
                setMessage('SignUp failed, please check email or password again');
                setTitle('SignUp Failed!');
                setTextButton('SignUp Again');
                console.error(err);
            }
        }
    }

    const handleSelectRole = (role: any) => {
        setRole(role);
    }

    useEffect(() => {
        axiosClient.get(API.API_GET_SPECIALIZATIONS).then((response) => {
            setSpecializations(response.data as ISpecialization[]);
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    const handleSelectSpecialiton = (id: number) => {
        setSpecializationId(id);
    }

    const handlSignUpPasswordSuccess = () => {
        navigation.navigate('VerifyEmail' as never);
    }

    return (
        <View style={{
            padding: 10,
            marginTop: 20
        }}>
            <BackButton />
            <View>
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontFamily: OutfitBold, fontSize: 30, textAlign: 'center' }}>Create New Account</Text>
                </View>
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center', borderWidth: 0.5, borderColor: Colors.gray, backgroundColor: Colors.white, padding: 15, borderRadius: 15 }}>
                        <MaterialIcons name="email" size={24} color={Colors.text_gray} />
                        <TextInput
                            placeholder="Email"
                            onChangeText={(value) => handleCheckValidEmail(value)}
                            value={email}
                            style={{ width: '100%', fontFamily: OutfitSemiBold }}
                        />
                    </View>
                    {!checkValidEmail && <Text style={{ textAlign: 'right', marginRight: 15, fontFamily: OutfitRegular, color: Colors.red, marginTop: 4 }}>Not invalid Email</Text>}
                    <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center', borderWidth: 0.5, borderColor: Colors.gray, backgroundColor: Colors.white, padding: 15, borderRadius: 15 }}>
                        <Entypo name="lock" size={24} color={Colors.text_gray} />
                        <TextInput
                            secureTextEntry={!isShow}
                            placeholder="Password"
                            onChangeText={(value) => setPassword(value)}
                            style={{ width: '80%', fontFamily: OutfitSemiBold }}
                        />
                        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                            <Ionicons name={isShow ? 'eye-off-sharp' : 'eye'} size={24} color={Colors.text_gray} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center', marginLeft: 10 }}>
                            <Title title="Role" />
                            <View style={{
                                marginTop: 10,
                                borderWidth: 0.6,
                                borderColor: Colors.gray,
                                borderRadius: 8,
                                backgroundColor: Colors.white,
                                width: '80%'
                            }}>
                                <Picker
                                    selectedValue={role}
                                    onValueChange={(itemValue) => { void handleSelectRole(itemValue) }}
                                >
                                    {roles.map(item => (
                                        <Picker.Item key={item.id} value={item.name} label={item.name} style={{ fontFamily: OutfitRegular }} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {role === roles[1].name && <View>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center', marginLeft: 10 }}>
                            <Title title="Specialization" />
                            <View style={{
                                marginTop: 10,
                                borderWidth: 0.6,
                                borderColor: Colors.gray,
                                borderRadius: 8,
                                backgroundColor: Colors.white,
                                width: '57%'
                            }}>
                                <Picker
                                    selectedValue={specializationId}
                                    onValueChange={(itemValue) => { void handleSelectSpecialiton(itemValue) }}
                                >
                                    {specializations.map(item => (
                                        <Picker.Item key={item.id} value={item.id} label={item.name} style={{ fontFamily: OutfitRegular }} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            handlSignUpPassword();
                        }}
                        style={{
                            padding: 16,
                            backgroundColor: Colors.primary,
                            borderRadius: 90,
                            alignItems: 'center',
                            marginTop: 10,
                            width: Dimensions.get('screen').width * 0.8
                        }}
                    >
                        <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitSemiBold }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
                    <Text style={{ fontFamily: OutfitLight, color: Colors.text_gray, fontSize: 15 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('LoginPassword' as never)
                    }}>
                        <Text style={{ fontFamily: OutfitSemiBold, color: Colors.primary, fontSize: 16 }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} isSuccess={isSuccess} message={message} title={title} textButton={textButton} onPress={handlSignUpPasswordSuccess} />
        </View>
    )
}