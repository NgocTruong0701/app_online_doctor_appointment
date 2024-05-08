import { appointmentStatus, packageIcons } from "@/constants/constants";
import { IAppointment } from "@/screens/Appointment";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular } from "@assets/Shared/typography";
import moment from "moment";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useChatContext } from "stream-chat-expo";
import { useAppSelector } from "@/redux/store";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "@assets/Shared/utils";

interface IAppointmentItemProps {
    appointment: IAppointment
}

export default function AppoinmentMessItem({ appointment }: IAppointmentItemProps) {
    const { client } = useChatContext();
    const { doctor, patient } = appointment;
    const isAppointmentCancelled = appointment.status === appointmentStatus.CANCELLED;
    const dateFormat = moment(appointment.date).format("MMM DD, YYYY");
    const timeFormat = moment(appointment.date).format('HH:mm A');
    const packageIcon = packageIcons.find((item) => item.name == appointment.packageAppointment.name);
    const navigation = useNavigation();

    const onPress = async () => {
        const channel = client.channel('messaging', {
            members: [`${patient?.id}`, `jlahey`]
        });
        try {
            await channel.create();
        } catch (error) {
            console.error(error.message);
        }
        navigation.navigate('ChannelScreen' as never, {
            cid: channel.cid
        });
    }

    return (
        <View style={{
            marginLeft: 10, marginRight: 10, marginTop: 15, backgroundColor: Colors.white,
            borderRadius: 30,
            padding: 15,
        }}>
            <View style={styles.container}>
                <Image source={{ uri: doctor?.avatar }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.name}>{doctor?.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.textInfo}>{appointment.packageAppointment.name} - {capitalizeFirstLetter(appointment.status)}</Text>
                    </View>
                    <View>
                        <Text style={styles.textInfo}>{dateFormat} | {timeFormat}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                    <View style={{
                        backgroundColor: Colors.secondary,
                        padding: 13,
                        borderRadius: 99,
                        alignItems: 'center',
                    }}>
                        <Ionicons name={packageIcon?.icon} size={25} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            </View>
            {
                !isAppointmentCancelled &&
                <View>
                    <View style={styles.divider} />
                </View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontFamily: OutfitBold
    },
    divider: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 13,
        marginBottom: 13,
    },
    textInfo: {
        color: Colors.text_gray,
        fontFamily: OutfitRegular,
        marginTop: 10
    },
    rateInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        fontFamily: OutfitRegular
    },
    actionButton: {
        alignItems: 'center',
    }
});