import { IPackageAppointment } from '@/screens/SelectPackage';
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import RadioGroup, { RadioButtonProps } from '@/components/react-native-radio-buttons-group';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@assets/Shared';
import { OutfitBold, OutfitLight } from '@assets/Shared/typography';

interface IPackageAppointmentProps {
    services: IPackageAppointment[];
    selectedService: IPackageAppointment | undefined;
    setSelectedService: (item: any) => void;
    handlSetPackageAppointment: (item: any, id: string) => void;
}

const ServiceList = ({ services, selectedService, setSelectedService, handlSetPackageAppointment }: IPackageAppointmentProps) => {
    const radioButtons: RadioButtonProps[] = useMemo(
        () =>
            services.map((item) => ({
                // Note the parentheses for implicit return
                id: item.id.toString(), // Ensure id is a string
                description: (
                    <Pressable onPress={() => handlSetPackageAppointment(item, item.id.toString())}>
                        <View style={styles.serviceItem}>
                            <View style={{
                                backgroundColor: Colors.secondary,
                                padding: 13,
                                borderRadius: 99,
                                alignItems: 'center',
                            }}>
                                <Ionicons name={item.icon} size={28} color={Colors.primary} />
                            </View>
                            <View style={styles.serviceInfo}>
                                <Text style={{ fontFamily: OutfitBold, fontSize: 20, marginBottom: 3 }}>{item.name}</Text>
                                <Text style={{ fontFamily: OutfitLight, color: Colors.text_gray }}>{item.description}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>${item.price}</Text>
                                <Text style={styles.durationText}>/30 mins</Text>
                            </View>
                        </View>
                    </Pressable>
                ),
                value: item, // Consider converting value to string for consistency
                layout: 'row',
                containerStyle: {
                    display: 'flex',
                    flexDirection: 'row',
                },
                item: item,
            })),
        [services]
    );

    return (
        <View style={{ marginTop: 20 }}>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={handlSetPackageAppointment}
                selectedId={`${selectedService?.id}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    serviceItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center', // Align items vertically
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    serviceInfo: {
        flex: 1 // Allow service info to take up available space
    },
    priceContainer: {
        alignItems: 'flex-end' // Align price and duration to the right
    },
    priceText: {
        textAlign: 'right',
        fontSize: 20,
        fontFamily: OutfitBold,
        marginBottom: 3,
        color: Colors.primary
    },
    durationText: {
        textAlign: 'right',
        fontSize: 12,
        color: Colors.text_gray,
        fontFamily: OutfitLight,
    },
});

export default ServiceList; 