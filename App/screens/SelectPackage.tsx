import Title from "@/components/BookAppointment/Title";
import ServiceList from "@/components/SelectPackage/ServiceList";
import PageHeader from "@/components/Share/PageHeader";
import { durations } from "@/constants/constants";
import { useAppDispatch } from "@/redux/store";
import { API } from "@/services/Apis/api";
import axiosClient from "@/services/Apis/axiosClient";
import { Colors } from "@assets/Shared";
import { OutfitRegular } from "@assets/Shared/typography";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { actions as appointmentDetailsAction } from "@/redux/reducers/appointmentDetails";

export interface IPackageAppointment {
    id: number;
    name: string;
    price: number;
    icon: string;
    description: string;
}

export interface IDuration {
    duration: number;
    id: number;
    label: string;
    value: number;
}

export default function SelectPackage() {
    const navigation = useNavigation();
    const [services, setServices] = useState<IPackageAppointment[]>([]);
    const [selectedService, setSelectedService] = useState<IPackageAppointment | undefined>();
    const [duration, setDuration] = useState<IDuration>(durations[0]);
    const dispatch = useAppDispatch();

    const handlSetDuration = (item: any) => {
        setDuration(item);
        dispatch(appointmentDetailsAction.setDuration(item));
    }

    const handlSetPackageAppointment = (item: any, id: string) => {
        setSelectedService(item);
        dispatch(appointmentDetailsAction.setPackage(item));
    }

    useEffect(() => {
        axiosClient.get(API.API_BASE_GET_PACKAGE_APPOINTMENT)
            .then((response) => setServices(response.data.data as IPackageAppointment[]))
            .catch((error) => console.error(error.message));

        handlSetDuration(durations[0]);
    }, []);

    return (
        <>
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <PageHeader title="Select Package" />

                <View>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Select Duration" />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={duration}
                                onValueChange={(itemValue) => { void handlSetDuration(itemValue) }}
                            >
                                {durations.map(item => (
                                    <Picker.Item key={item.id} value={item} label={item.label} style={styles.itemPicker} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={{ marginRight: 10, marginLeft: 10 }}>
                        <Title title="Select Package" />
                        <ServiceList services={services} selectedService={selectedService} setSelectedService={setSelectedService} handlSetPackageAppointment={handlSetPackageAppointment} />
                    </View>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center' }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PatientDetails' as never)
                    }}
                    disabled={!selectedService?.id}
                    style={[{
                        padding: 15,
                        backgroundColor: Colors.primary,
                        borderRadius: 90,
                        alignItems: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        width: Dimensions.get('screen').width * 0.9
                    }, !selectedService?.id && { backgroundColor: Colors.primary_disabled }]}
                >
                    <Text style={{ fontSize: 17, color: Colors.white, fontFamily: OutfitRegular }}>Next</Text>
                </TouchableOpacity>
            </View>
        </>
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