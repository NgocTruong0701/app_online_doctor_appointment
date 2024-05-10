import DoctorFavoriteList from "@/components/DoctorFavorite/DoctorFavoriteList";
import PageHeader from "@/components/Share/PageHeader";
import { View } from "react-native";

export default function DoctorFavorite() {
    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <PageHeader title={'My Favorite Doctor'} />

            <DoctorFavoriteList />
        </View>
    )
}