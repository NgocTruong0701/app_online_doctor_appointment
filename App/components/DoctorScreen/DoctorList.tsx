import { FlatList, TouchableOpacity, View } from "react-native";
import DoctorCard from "./DoctorCard";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { IDoctorResponse } from "@/redux/type";
import { useNavigation } from "@react-navigation/native";

interface IDoctorListProps {
    categoryId: number;
}

export default function DoctorList({ categoryId }: IDoctorListProps) {
    const [doctors, setDoctors] = useState<IDoctorResponse[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        axiosClient.get(`${API.API_GET_DOCTORS_BY_SPECIALITY}/${categoryId}`).then((response) => {
            setDoctors(response.data.data);
        }).catch((error) => {
            console.error(JSON.stringify(error, null, 2));
        })
    }, [])

    return (
        <View style={{ marginTop: 30 }}>
            <FlatList
                data={doctors}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.navigate('DoctorDetails', {
                        doctor: item
                    })}>
                        <DoctorCard doctor={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}