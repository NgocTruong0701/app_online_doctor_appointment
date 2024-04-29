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
import LoadingIndicator from '@/components/Loading/LoadingIndicator';
import { useAppDispatch } from '@/redux/store';
import { actions as userActions } from '@/redux/reducers/user';

export default function Login() {    
    const dispath = useAppDispatch();
    const navigation = useNavigation();
    GoogleSignin.configure({
        webClientId: '76558726637-jp6bsvqrdq3t0eeockm1g89o3dhajv2g.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
        // setIsLoading(true);
        dispath(userActions.showLoading())

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        try {
            const res = await axiosClient.post(API.LOGIN_GOOGLE, { 'token': idToken });
            storage.set('token', res.data.access_token);
            navigation.navigate('TabNavigation' as never);
        } catch (error) {
            console.log(error);
        } finally {
            dispath(userActions.hideLoading())
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
                <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}>Book Appointments Effortlessly and manager your health journey</Text>
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
                    <Text style={{ fontSize: 17, color: Colors.white }}>Login With Google</Text>
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
