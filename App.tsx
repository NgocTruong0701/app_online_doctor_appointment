import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './App/screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Colors } from '@assets/Shared';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '@/navigations/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { OutfitBold, OutfitLight, OutfitRegular, OutfitSemiBold } from '@assets/Shared/typography';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    OutfitRegular: require('./assets/fonts/Outfit-Regular.ttf'),
    OutfitBold: require('./assets/fonts/Outfit-Bold.ttf'),
    OutfitLight: require('./assets/fonts/Outfit-Light.ttf'),
    OutfitSemiBold: require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    // <ClerkProvider publishableKey={`${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`}>
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
      {/*
        <SignedIn>
          
        </SignedIn>
        <SignedOut> */}
      <Login />
      {/* </SignedOut> */}
    </SafeAreaView>
    // </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyscale50,
  },
});
