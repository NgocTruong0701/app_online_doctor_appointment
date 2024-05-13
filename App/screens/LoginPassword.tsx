import BackButton from "@/components/Share/BackButton";
import { Dimensions, Text, TextInput, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { useState } from "react";
import { OutfitBold, OutfitLight, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import CustomModal from "@/components/Modal";
import { storage } from "@/localStorage";
import { useAppDispatch } from "@/redux/store";
import { actions as appStateAction } from "@/redux/reducers/appState";
import { getUser } from "@/redux/reducers/user/thunk";

export default function LoginPassword() {
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

    const handleCheckValidEmail = (email: string) => {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        setEmail(email);
        if (regex.test(email)) {
            setCheckValidEmail(true);
        }
        else { setCheckValidEmail(false); }
    }

    const handlLoginPassword = async () => {
        if (checkValidEmail && password.length != 0) {
            try {
                dispatch(appStateAction.showLoading());
                const { data } = await axiosClient.post(API.API_LOGIN_PASSWORD, {
                    email: email,
                    password: password
                });

                storage.set('token', data.access_token);
                dispatch(appStateAction.login());

                dispatch(getUser()).unwrap().catch(error => {
                    console.error(error.message);
                    navigation.navigate("LoginPassword" as never);
                });

                navigation.navigate('TabNavigation', { screen: 'Home' });
                dispatch(appStateAction.hideLoading());
            } catch (err) {
                setIsVisible(true);
                setIsSuccess(false);
                setMessage('Login failed, please check email or password again');
                setTitle('Login Failed!');
                setTextButton('Login Again');
                dispatch(appStateAction.hideLoading());
                console.error(err);
            }
        }
    }

    return (
        <View style={{
            padding: 10,
            marginTop: 20
        }}>
            <BackButton />
            <View>
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontFamily: OutfitBold, fontSize: 30, textAlign: 'center' }}>Login to Your Account</Text>
                </View>
                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center', borderWidth: 0.5, borderColor: Colors.gray, backgroundColor: Colors.white, padding: 15, borderRadius: 15 }}>
                        <MaterialIcons name="email" size={24} color={Colors.text_gray} />
                        <TextInput
                            placeholder="Email"
                            onChangeText={(value) => handleCheckValidEmail(value)}
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
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            handlLoginPassword();
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
                        <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitSemiBold }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
                    <Text style={{ fontFamily: OutfitLight, color: Colors.text_gray, fontSize: 15 }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SignUp' as never)
                    }}>
                        <Text style={{ fontFamily: OutfitSemiBold, color: Colors.primary, fontSize: 16 }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} isSuccess={isSuccess} message={message} title={title} textButton={textButton} onPress={handlLoginPassword} />
        </View>
    )
}