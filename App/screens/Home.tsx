import Categories from "@/components/Home/Categories";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import Slider from "@/components/Home/Slider";
import { getUser } from "@/redux/reducers/user/thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";


export default function Home() {
    const { user } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(getUser());
            console.log('Dispath user');
        }, []),
    );

    return (
        <View style={{ padding: 20, marginTop: 20 }}>
            <Header />
            <SearchBar setSearchText={(value: string) => console.log(value)} />
            <Slider />
            <Categories />
        </View>
    )
}