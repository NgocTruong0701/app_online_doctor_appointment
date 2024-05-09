import Title from "@/components/BookAppointment/Title";
import ServiceList from "@/components/SelectPackage/ServiceList";
import PageHeader from "@/components/Share/PageHeader";
import { durations } from "@/constants/constants";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitRegular } from "@assets/Shared/typography";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface IPackageAppointment {
    id: number;
    name: string;
    price: number;
    icon: string;
    description: string;
}

export default function SelectPackage() {
    const navigation = useNavigation();
    const [services, setServices] = useState<IPackageAppointment[]>([]);

    const handlSetDuration = (item: any) => {

    }

    useEffect(() => {
        axiosClient.get(API.API_BASE_GET_PACKAGE_APPOINTMENT)
            .then((response) => setServices(response.data.data as IPackageAppointment[]))
            .catch((error) => console.error(error.message));
    }, []);

    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <PageHeader title="Select Package" />

            <View>
                <View style={{ marginRight: 10, marginLeft: 10 }}>
                    <Title title="Select Duration" />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={durations}
                            onValueChange={(itemValue) => { void handlSetDuration(itemValue) }}
                        >
                            {durations.map(item => (
                                <Picker.Item key={item.id} value={item.duration} label={item.label} style={styles.itemPicker} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ marginRight: 10, marginLeft: 10 }}>
                    <Title title="Select Package" />
                    <ServiceList services={services} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    pickerContainer: {
        marginTop: 10,
        borderWidth: 0.6,
        borderColor: Colors.gray,
        borderRadius: 8,
        backgroundColor: Colors.white
    },
    itemPicker: {
        fontFamily: OutfitRegular
    }
});