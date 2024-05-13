import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '@assets/Shared/Colors'
import appImage from '@assets/images/app.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axiosClient from '@/services/Apis/axiosClient';
import { API } from '@/services/Apis/api';
import { storage } from '@/localStorage';
import { useAppDispatch } from '@/redux/store';
import { actions as appStateAction } from '@/redux/reducers/appState';
import { actions as userAction } from '@/redux/reducers/user';
import { navigate } from '@/navigations/Root';
import { OutfitSemiBold } from '@assets/Shared/typography';
import CustomModal from '@/components/Modal';
import { getUser } from "@/redux/reducers/user/thunk";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [textButton, setTextButton] = useState('');
    const token = storage.getString('token');
    if (token) navigate('TabNavigation')
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    GoogleSignin.configure({
        webClientId: '76558726637-jp6bsvqrdq3t0eeockm1g89o3dhajv2g.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
        // setIsLoading(true);
        dispatch(appStateAction.showLoading())

        try {
            const isSignedIn = await GoogleSignin.isSignedIn();

            if (isSignedIn) {
                await GoogleSignin.revokeAccess();
            }

            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            const res = await axiosClient.post(API.LOGIN_GOOGLE, { 'token': idToken });
            storage.set('token', res.data.access_token);
            dispatch(appStateAction.login());

            dispatch(getUser()).unwrap().catch(error => {
                console.error(error.message);
                navigation.navigate("Login" as never);
            });

            navigation.navigate('TabNavigation', { screen: 'Home' });
        } catch (error) {
            setIsVisible(true);
            setIsSuccess(false);
            setMessage('Login failed, please check internet connection and try again!!!');
            setTitle('Login Failed!');
            setTextButton('Login Again');
            console.error(error);
        } finally {
            dispatch(appStateAction.hideLoading())
        }
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={appImage} style={styles.appImage} />
            <View style={{
                backgroundColor: Colors.white,
                padding: 25,
                alignItems: 'center',
                marginTop: -50,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 1000,
            }}>
                <Text style={styles.heading}>Your Ultimate Doctor</Text>
                <Text style={styles.heading}>Appointment Booking App</Text>
                <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Book Appointments Effortlessly and manager your health journey</Text>
                <TouchableOpacity
                    onPress={() => {
                        void onGoogleButtonPress()
                    }}
                    style={{
                        padding: 16,
                        backgroundColor: Colors.primary900,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 20,
                        width: Dimensions.get('screen').width * 0.8
                    }}
                >
                    <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitSemiBold }}>Login With Google</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
                    <View>
                        <Text style={{ width: 50, textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.text_gray, fontSize: 18 }}>or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
                </View>
                <CustomModal isVisible={isVisible} setIsVisible={setIsVisible} isSuccess={isSuccess} message={message} title={title} textButton={textButton} onPress={onGoogleButtonPress} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LoginPassword' as never);
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
                    <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitSemiBold }}>Sign in with password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appImage: {
        width: 300,
        height: 500,
        objectFit: 'contain',
        marginTop: 50,
    },

    heading: {
        fontSize: 28,
        fontWeight: 'bold'
    }
})
