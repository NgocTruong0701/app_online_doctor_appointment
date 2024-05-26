import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { OutfitBold, OutfitSemiBold } from "@assets/Shared/typography";
import { Colors } from "@assets/Shared";
import { useState, useEffect } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import { IDoctorResponse } from "@/redux/type";
import DoctorCard from "@/components/DoctorScreen/DoctorCard";

export function SearchDoctor() {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState<IDoctorResponse[]>([]);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            if (searchTerm) {
                setIsLoading(true);
                axiosClient.get(`${API.API_SEARCH_DOCTOR}?name=${searchTerm}`)
                    .then(response => {
                        setDoctors(response.data.data);
                    })
                    .catch(error => {
                        console.error('Search error:', error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <View style={{
            padding: 10,
            marginTop: 20
        }}>
            <View style={{ display: 'flex', flexDirection: "row", gap: 15, alignItems: 'center', marginRight: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={37} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', borderWidth: 0.6, borderColor: Colors.primary, padding: 10, borderRadius: 8 }}>
                        <Ionicons name="search" size={24} color={Colors.primary} />
                        <TextInput
                            style={{ flex: 1, paddingLeft: 10, fontFamily: OutfitSemiBold }}
                            placeholder="Search doctor"
                            placeholderTextColor={Colors.gray}
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                        <TouchableOpacity>
                            <Ionicons name="options-outline" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                    {isLoading && (
                        <View style={styles.overlay}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}
                </View>
            </View>
            <View>
                <Text style={{fontFamily: OutfitSemiBold, fontSize: 20, marginTop: 20, marginBottom: 10, marginLeft: 10}}>{doctors.length} found</Text>
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
        </View>
    )
}


const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    },
});