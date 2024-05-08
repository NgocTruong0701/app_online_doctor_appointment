import { Colors } from "@assets/Shared";
import { OutfitLight, OutfitSemiBold } from "@assets/Shared/typography";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Dimensions, Modal, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IModalProps {
    isVisible: boolean;
    setIsVisible: any;
    title: string;
    message: string;
    isSuccess: boolean;
    textButton: string;
}

export default function CustomModal({ isVisible, setIsVisible, title, message, isSuccess, textButton }: IModalProps) {

    const navigation = useNavigation();

    return (
        <Modal animationType="fade" transparent visible={isVisible}>
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}
            >
                <Pressable
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                    }}
                    onPress={() => {
                        setIsVisible(false);
                    }}
                />
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.white,
                        width: '85%',
                        borderRadius: 24,
                        zIndex: 2,
                        gap: 16,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 16,
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'stretch',
                                textAlign: 'center',
                                fontSize: 24,
                                fontFamily: OutfitSemiBold,
                                color: Colors.primary,
                                marginTop: 20,
                            }}
                        >
                            {title}
                        </Text>
                        <View
                            style={{
                                marginLeft: 25,
                                marginRight: 25,
                            }}
                        >
                            <Text style={{ textAlign: 'center', fontFamily: OutfitLight, }}>{message}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                setIsVisible(false);
                                navigation.navigate('Appointment' as never)
                            }}
                            style={{
                                padding: 15,
                                backgroundColor: Colors.primary,
                                borderRadius: 90,
                                alignItems: 'center',
                                marginTop: 10,
                                marginBottom: 10,
                                width: Dimensions.get('screen').width * 0.7
                            }}>
                            <Text style={{ color: Colors.white, fontFamily: OutfitSemiBold, fontSize: 16 }}>{textButton}</Text>
                        </Pressable>
                        <Pressable style={{
                            padding: 15,
                            backgroundColor: Colors.secondary,
                            borderRadius: 90,
                            alignItems: 'center',
                            marginTop: 5,
                            marginBottom: 10,
                            width: Dimensions.get('screen').width * 0.7
                        }}>
                            <Text style={{ color: Colors.primary, fontFamily: OutfitSemiBold, fontSize: 16 }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}