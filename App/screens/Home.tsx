import Categories from "@/components/Home/Categories";
import DoctorsTop from "@/components/Home/DoctorsTop";
import Header from "@/components/Home/Header";
import SearchBarReadOnly from "@/components/Home/SearchBarReadOnly";
import Slider from "@/components/Home/Slider";
import { storage } from "@/localStorage";
import { View } from "react-native";

export default function Home() {

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