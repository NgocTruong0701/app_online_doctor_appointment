import { storage } from "@/localStorage";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";

export default function Logout() {

    const navigation = useNavigation();
    const removeToken = () => {
        storage.set('token', '');
        navigation.navigate('Login' as never);
    }

    return (
        <View>
            <Button title="Logout" onPress={removeToken} />
        </View>
    )
}