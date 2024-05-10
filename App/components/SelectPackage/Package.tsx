import { memo } from "react";
import { IPackageProps } from "./types";
import RadioButton from "../RadioButton";
import { Text, View } from "react-native";
import { Colors } from "@assets/Shared";

const Package = (props: IPackageProps) => {
    const { title, subTitle, money, onPress, checked, onOutSidePress } = props;
    return (
        <RadioButton
            checked={checked}
            darkColor={Colors.darkDark3}
            lightColor={Colors.darkDark3}
            titleDarkColor={Colors.white}
            titleLightColor={Colors.white}
            onPress={onPress}
            onOutSidePress={onOutSidePress}
            custom={
                <View
                    style={{ flex: 1, display: "flex", flexDirection: "row" }}
                >
                    <View style={{ flex: 1 }}>
                        <Text >{title}</Text>
                        <Text >
                            {subTitle}
                        </Text>
                    </View>
                    <View >
                        <Text>{money.toString()}</Text>
                    </View>
                </View>
            }
        />
    );
};

export default memo(Package);
