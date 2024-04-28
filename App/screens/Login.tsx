import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';
import Colors from '@assets/Shared/Colors'
import appImage from '@assets/images/app.png'
import SignInWithOAuth from '@/components/SignInWithOAuth';

export default function Login() {
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
                <SignInWithOAuth />
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
