import Categories from "@/components/Home/Categories";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import Slider from "@/components/Home/Slider";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";


export default function Home() {
    const {isLoaded, signOut} = useAuth();
    return (
        <View style={{padding: 20, marginTop: 20}}>
            <Header />
            
            <SearchBar setSearchText={(value: string) => console.log(value)}/>

            <Slider />

            <Categories />
        </View>
    )
}