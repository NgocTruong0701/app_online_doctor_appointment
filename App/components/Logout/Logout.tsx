import { storage } from "@/localStorage";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { actions as userAction } from "@/redux/reducers/user";
import { useAppDispatch } from "@/redux/store";

export default function Logout() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const removeToken = () => {
        storage.set('token', '');
        dispatch(userAction.clearUser());
        navigation.navigate('Login' as never);
    }

    return (
        <View>
            <Button title="Logout" onPress={removeToken} />
        </View>
    )
}