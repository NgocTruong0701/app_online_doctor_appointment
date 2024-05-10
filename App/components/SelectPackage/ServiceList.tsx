import { IPackageAppointment } from '@/screens/SelectPackage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Package from './Package';

interface IPackageAppointmentProps {
    services: IPackageAppointment[];
}

const ServiceList = ({ services }: IPackageAppointmentProps) => {
    const [packageId, setPackageId] = useState(0);

    return (
        <View style={{}}>
            <ScrollView>
                <View>
                    {/* {services.map((item) => (
                        // <Package
                        //     key={item.id}
                        //     title={item.name}
                        //     money={item.price}
                        //     subTitle={item.description}
                        //     onOutSidePress={() => {
                        //         setPackageId(item.id);
                        //     }}
                        //     onPress={() => setPackageId(item.id)}
                        //     checked={item.id === packageId}
                        // />
                    ))} */}
                </View>
            </ScrollView>
        </View>
    );
};

export default ServiceList;