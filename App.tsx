import { SafeAreaView, StyleSheet } from 'react-native';
import Login from './App/screens/Login';
import { Colors } from '@assets/Shared';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from '@/navigations/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import LoadingIndicator from '@/components/Loading/LoadingIndicator';
import { storage } from '@/localStorage';
import { navigationRef } from '@/navigations/Root';


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Outfit-Regular": require('./assets/fonts/Outfit-Regular.ttf'),
    "Outfit-Bold": require('./assets/fonts/Outfit-Bold.ttf'),
    "Outfit-Light": require('./assets/fonts/Outfit-Light.ttf'),
    "Outfit-SemiBold": require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const token = storage.getString('token');

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <LoadingIndicator />
        <StatusBar hidden />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName='TabNavigation'>
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
    backgroundColor: Colors.white,
  },
});
