import DoctorList from "@/components/DoctorScreen/DoctorList";
import PageHeader from "@/components/Share/PageHeader";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function DoctorOfSpecialityList() {
    const params = useRoute().params;
    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <PageHeader title={params?.categoryName} />

            <DoctorList categoryId={params?.categoryId} />
        </View>
    )
}