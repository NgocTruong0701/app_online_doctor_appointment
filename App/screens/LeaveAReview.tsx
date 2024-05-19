import Title from "@/components/BookAppointment/Title";
import PageHeader from "@/components/Share/PageHeader";
import { RadioGroup } from "@/components/react-native-radio-buttons-group";
import { Colors } from "@assets/Shared";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@assets/Shared/typography";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RatingInput } from 'react-native-stock-star-rating'

export default function LeaveAReview() {
    const [rating, setRating] = useState(0);
    const params = useRoute().params;
    const { patient, doctor } = params;

    return (
        <View style={{ padding: 10, marginTop: 20 }}>
            <View>
                <PageHeader title="Review Summary" />

                <View style={{ marginTop: 25, marginBottom: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={{ uri: doctor.avatar }} style={{ width: 150, height: 150, borderRadius: 99 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: OutfitBold, fontSize: 20, textAlign: 'center', width: '80%' }}>How was your experience with {doctor.name}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <RatingInput
                        rating={rating}
                        setRating={setRating}
                        size={50}
                        maxStars={5}
                        bordered={false}
                        color={Colors.primary}
                    />
                </View>
            </View>

            <View style={{ borderTopColor: Colors.gray, borderTopWidth: 0.5, marginTop: 15, marginRight: 10, marginLeft: 10 }}>
                <Title title="Write Your Review" />
                <View style={{ marginTop: 10, borderWidth: 0.6, borderColor: Colors.gray, padding: 10, borderRadius: 8, backgroundColor: Colors.white }} >
                    <TextInput
                        multiline={true}
                        numberOfLines={14}
                        // onChangeText={(text) => setProblem(text)}
                        // value={problem}
                        placeholder="Your review here"
                        style={{ textAlignVertical: 'top', fontFamily: OutfitRegular }}
                    />
                </View>
            </View>

            <View style={{ padding: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 20 }}>
                    <TouchableOpacity style={{ width: '100%', borderRadius: 50, padding: 15, backgroundColor: Colors.secondary, paddingHorizontal: 60 }}>
                        <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.primary }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: Colors.primary, width: '100%', borderWidth: 1.5, borderRadius: 50, padding: 15, borderColor: Colors.primary, paddingHorizontal: 60 }}>
                        <Text style={{ textAlign: 'center', fontFamily: OutfitSemiBold, color: Colors.white }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}