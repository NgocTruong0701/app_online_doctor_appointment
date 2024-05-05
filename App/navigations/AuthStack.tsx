import Login from '@/screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}