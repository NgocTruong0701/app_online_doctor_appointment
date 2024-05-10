import { FlatList, View } from "react-native";
import SubHeading from "./SubHeading";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import DoctorItem from "./DoctorItem";
import { IDoctorResponse } from "@/redux/type";

export default function DoctorsTop() {
    const [doctors, setDoctors] = useState<IDoctorResponse[]>([]);

    useEffect(() => {
        axiosClient.get(`${API.API_GET_DOCTORS}?limit=${API.LIMIT}`).then((response) => {
            setDoctors(response.data.data);
        }).catch((error) => {
            console.error(JSON.stringify(error, null, 2));
        })
    }, [])
    return doctors && (
        <View style={{ marginTop: 10 }}>
            <SubHeading subHeadingTitle="Top Doctors" route='DoctorTopAll' />

            <FlatList
                data={doctors}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <DoctorItem doctor={item} />
                )}
            />
        </View>
    )
}