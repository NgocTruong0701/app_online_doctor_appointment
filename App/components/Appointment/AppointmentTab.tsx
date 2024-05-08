import { Colors } from "@assets/Shared";
import { OutfitRegular } from "@assets/Shared/typography";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AppointmentTab() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={{backgroundColor: Colors.white}}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: Colors.gray, borderBottomWidth: 0.5 }}>
                <TouchableOpacity
                    style={[
                        activeIndex == 0
                            ? styles.activeTab
                            : styles.inActiveTab
                    ]}
                    onPress={() => {
                        setActiveIndex(0)
                    }}
                >
                    <Text style={[
                        activeIndex == 0
                            ? styles.activeText
                            : styles.inActiveText
                    ]}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        activeIndex == 1
                            ? styles.activeTab
                            : styles.inActiveTab
                    ]}
                    onPress={() => {
                        setActiveIndex(1)
                    }} >
                    <Text style={[
                        activeIndex == 1
                            ? styles.activeText
                            : styles.inActiveText
                    ]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        activeIndex == 2
                            ? styles.activeTab
                            : styles.inActiveTab
                    ]}
                    onPress={() => {
                        setActiveIndex(2)
                    }}>
                    <Text style={[
                        activeIndex == 2
                            ? styles.activeText
                            : styles.inActiveText
                    ]}>Cancelled</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    activeText: {
        textAlign: 'center',
        fontFamily: OutfitRegular,
        fontSize: 16,
        color: Colors.primary
    },
    inActiveText: {
        textAlign: 'center',
        fontFamily: OutfitRegular,
        fontSize: 16,
        color: Colors.gray
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        padding: 3,
        width: '100%',
    },
    inActiveTab: {
        padding: 3,
        width: '100%',
    }
})