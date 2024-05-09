import { Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import Title from "./Title";
import { useEffect, useState } from "react";
import axiosClient from "@/services/Apis/axiosClient";
import { API } from "@/services/Apis/api";
import moment from 'moment';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@assets/Shared";
import { OutfitRegular } from "@assets/Shared/typography";
import { IDoctorResponse } from "@/redux/type";

interface ISelectHourProps {
    doctor: IDoctorResponse,
    handleTimeChange: any
}

export default function SelectHour({ doctor, handleTimeChange }: ISelectHourProps) {
    const [hoursList, setHoursList] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);

    useEffect(() => {
        axiosClient.get(`${API.API_GET_TIMEWORKING}/${doctor?.id}`)
            .then((response) => {
                const { timeStart, timeEnd } = response.data.data;

                // Tạo danh sách giờ
                const startTime = moment(timeStart, 'HH:mm');
                const endTime = moment(timeEnd, 'HH:mm');
                const now = moment(); // Lấy thời gian hiện tại trực tiếp

                const hours = [];
                while (startTime <= endTime) {
                    if (startTime > now) {
                        hours.push(startTime.format('hh:mm A'));
                    }
                    startTime.add(30, 'minutes');
                }

                setHoursList(hours);
            })
            .catch((error) => console.error(error));
    }, [doctor?.id]);

    const handleHourPress = (hour) => {
        setSelectedHour(hour);
        const momentHour = moment(hour, 'hh:mm A'); // Chuyển đổi thành moment
        const formattedHour = momentHour.format('HH:mm:ss');
        handleTimeChange(formattedHour);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleHourPress(item)}>
            <View style={[
                styles.hourItem,
                item === selectedHour && styles.selectedHour,
            ]}>
                <Text style={[
                    styles.hourText,
                    item === selectedHour && styles.selectedHourText,
                ]}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <Title title="Select Hour" />
            <FlatList
                data={hoursList}
                renderItem={renderItem}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                keyExtractor={(item) => item}
                style={{ padding: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    hourItem: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: Dimensions.get('screen').width * 0.25,
    },
    hourText: {
        textAlign: 'center',
        color: Colors.primary,
        fontFamily: OutfitRegular,
    },
    selectedHour: {
        backgroundColor: Colors.primary,
    },
    selectedHourText: {
        color: Colors.white,
    },
});