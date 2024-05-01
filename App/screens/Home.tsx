import Categories from "@/components/Home/Categories";
import DoctorsTop from "@/components/Home/DoctorsTop";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import Slider from "@/components/Home/Slider";
import { View } from "react-native";

export default function Home() {
    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <Header />
            <SearchBar setSearchText={(value: string) => console.log(value)} />
            <Slider />
            <Categories />
            <DoctorsTop /> 
        </View>
    )
}