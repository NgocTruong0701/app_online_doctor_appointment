import { useAppSelector } from '@/redux/store';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';


const LoadingIndicator = () => {
    const {isLoading} = useAppSelector(s => s.user)
    if(!isLoading) return null;
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    },
});

export default LoadingIndicator;
