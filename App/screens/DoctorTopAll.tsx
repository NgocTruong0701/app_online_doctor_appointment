import DoctorTopAllList from "@/components/DoctorTopAll/DoctorTopAllList";
import PageHeader from "@/components/Share/PageHeader";
import { View } from "react-native";

export default function DoctorTopAll() {
    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <PageHeader title={'Top Doctor'} />

            <DoctorTopAllList />
        </View>
    )
}