import { IPackageAppointment } from '@/screens/SelectPackage';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

interface IPackageAppointmentProps {
    services: IPackageAppointment[];
}

const ServiceList = ({ services }: IPackageAppointmentProps) => {
    return (
        <View style={styles.container}>
            <RadioButtonGroup
                containerStyle={{ marginBottom: 10 }}
                // selected={current}
                // onSelected={(value) => setCurrent(value)}
                containerOptionStyle={{ margin: 5 }}
                radioBackground="green"
            >
                {}
                <RadioButtonItem value="test2" label="Example with string" />
                <RadioButtonItem
                    value="test"
                    label={
                        <Text style={{ color: "red" }}>Example passing React Element</Text>
                    }
                />
            </RadioButtonGroup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add your container styles here
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // Add more styles as needed
    },
    icon: {
        // Add styles for the icon container
    },
    iconText: {
        // Add styles for the icon text
    },
    details: {
        flex: 1, // Allow details to take up remaining space
        marginLeft: 10,
    },
    serviceName: {
        fontWeight: 'bold',
    },
    serviceDescription: {
        // Add styles for the description
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
    },
    duration: {
        // Add styles for the duration
    },
    selection: {
        // Add styles for the selection element container
    },
});

export default ServiceList;