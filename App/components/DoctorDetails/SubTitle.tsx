import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitLight } from "@assets/Shared/typography";
import { Text, View, StyleSheet } from "react-native";

export interface ISubTitle {
    title: string;
    content: string | undefined;
}

export default function SubTitle({ title, content }: ISubTitle) {
    const isTruncated = content && content.length > 100; // Adjust threshold as needed

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content} numberOfLines={5} ellipsizeMode="tail">{content}</Text>
            {isTruncated && <Text style={styles.viewMore}>View More</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20,
    },
    title: {
        fontFamily: OutfitBold,
        fontSize: 20
    },
    content: {
        fontFamily: OutfitLight
    },
    viewMore: {
        color: Colors.primary,
        marginTop: 5,
        fontFamily: OutfitLight
    },
});