import { FlatList, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { IDoctorResponse } from "@/redux/type";
import { useNavigation } from "@react-navigation/native";
import DoctorCard from "../DoctorScreen/DoctorCard";

export default function DoctorFavoriteList() {
  const [doctors, setDoctors] = useState<IDoctorResponse[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axiosClient
      .get(API.API_GET_DOCTORS_FAVORITE)
      .then((response) => {
        setDoctors(response.data.data);
      })
      .catch((error) => {
        console.error(JSON.stringify(error, null, 2));
      });
  }, [doctors]);

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