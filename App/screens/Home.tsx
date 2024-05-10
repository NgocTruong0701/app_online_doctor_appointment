import Categories from "@/components/Home/Categories";
import DoctorsTop from "@/components/Home/DoctorsTop";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import SearchBarReadOnly from "@/components/Home/SearchBarReadOnly";
import Slider from "@/components/Home/Slider";
import { storage } from "@/localStorage";
import { getUser } from "@/redux/reducers/user/thunk";
import { useAppDispatch } from "@/redux/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";

export default function Home() {
    const dispatch = useAppDispatch();

    console.log(storage.getString('token'))

    const navigation = useNavigation();
    // Fetch user data on component focus
    useFocusEffect(() => {
        dispatch(getUser()).unwrap().catch(error => {
            console.error(error.message);
            navigation.navigate("Login" as never);
        });
    })
    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <Header />
            <SearchBarReadOnly />
            <Slider />
            <Categories />
            <DoctorsTop />
        </View>
    )
}