import { IDoctorResponse } from "@/redux/type";
import { Colors } from "@assets/Shared";
import { OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface IDoctorItemProps {
    doctor: IDoctorResponse | undefined;
}

export default function DoctorItem({ doctor }: IDoctorItemProps) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DoctorDetails', {
            doctor: doctor
        })} >
            <View style={{ marginRight: 15, width: 140, height: 150, backgroundColor: Colors.white, borderRadius: 10, borderWidth: 1, borderColor: Colors.gray }}>
                <Image source={{ uri: doctor?.avatar }} style={{ width: '100%', height: 90, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily: OutfitSemiBold, marginTop: 10 }}>{doctor?.name}</Text>
                    <Text style={{ fontFamily: OutfitRegular, color: Colors.cyan }}>{doctor?.specialization_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}