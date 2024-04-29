import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './App/screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Colors } from '@assets/Shared';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '@/navigations/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { OutfitBold, OutfitLight, OutfitRegular, OutfitSemiBold } from '@assets/Shared/typography';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import LoadingIndicator from '@/components/Loading/LoadingIndicator';

const Stack = createStackNavigator();

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

  const isLoggedIn = false;

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <LoadingIndicator />
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyscale50,
  },
});
