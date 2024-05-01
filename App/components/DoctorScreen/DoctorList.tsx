import { FlatList, TouchableOpacity, View } from "react-native";
import DoctorCard from "./DoctorCard";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { IDoctorResponse } from "@/redux/type";

export default function DoctorList() {
    const [doctors, setDoctors] = useState<IDoctorResponse[]>([]);

    useEffect(() => {
        axiosClient.get(API.API_GET_DOCTORS).then((response) => {
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
                    <TouchableOpacity style={{marginBottom: 20}}>
                        <DoctorCard doctor={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}