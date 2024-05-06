import { useState } from "react";
import { Button, Modal, Pressable, Text, View } from "react-native";

interface IModalProps {
    isVisible: boolean;
    setIsVisible: any
}

export default function CustomModal({ isVisible, setIsVisible }: IModalProps) {

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
                    backgroundColor: 'transparent',
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
                        backgroundColor: 'black',
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
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                            }}
                        >
                            {'title'}
                        </Text>
                        <View
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{ textAlign: 'center' }}>{'message'}</Text>
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
                        <Button title="alskhdlkas"></Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}