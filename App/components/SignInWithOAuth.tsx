import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Dimensions, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { Colors } from "@assets/Shared";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Home from "@/screens/Home";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    // // Warm up the android browser to improve UX
    // // https://docs.expo.dev/guides/authentication/#improving-user-experience
    // useWarmUpBrowser();

    // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    // const onPress = React.useCallback(async () => {
    //     try {
    //         const { createdSessionId, signIn, signUp, setActive } =
    //             await startOAuthFlow();

    //         if (createdSessionId) {
    //             setActive({ session: createdSessionId });
    //         } else {
    //             // Use signIn or signUp for next steps such as MFA
    //         }
    //     } catch (err) {
    //         console.error("OAuth error", err);
    //     }
    // }, []);
    GoogleSignin.configure({
        webClientId: '76558726637-jp6bsvqrdq3t0eeockm1g89o3dhajv2g.apps.googleusercontent.com',
    });

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // const navigation = useNavigation();

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);

        // auth()
        //     .signOut()
        //     .then(() => console.log('User signed out!'));

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (user) {
        // navigation.navigate("Home");
    }
    else {
        console.log("NO USER");
    }

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        try{
            const res = await axiosClient.post(API.LOGIN_GOOGLE, {'token': idToken});
            console.log('asset_token :' + JSON.stringify(res.data.data, null, 2));
        }catch(error) {
            console.log(error);
        }
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const user_sign_in = auth().signInWithCredential(googleCredential);

        user_sign_in.then((user) => console.log(user)).catch((err) => console.log(err));
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <TouchableOpacity
            onPress={() => {
                console.log("hello");
                onGoogleButtonPress()
                    .then(() => console.log("Signed in with Google"))
                    .catch((err) => console.log(JSON.stringify(err, null, 2)))
                    .finally(() => console.log("Google"));
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
    );
}
export default SignInWithOAuth;