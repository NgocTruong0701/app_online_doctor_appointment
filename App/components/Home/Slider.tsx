import { Dimensions, FlatList, Image, Text, View } from "react-native";
import slide from '@assets/images/slide.jpg';
import slide2 from '@assets/images/slide2.jpg';
import slide3 from '@assets/images/slide3.jpg';
import Carousel from "react-native-reanimated-carousel";


export default function Slider() {
    const sliderList = [
        {
            id: 1,
            name: 'Slider 1',
            imageUrl: slide
        },
        {
            id: 2,
            name: 'Slider 2',
            imageUrl: slide2
        },
        {
            id: 3,
            name: 'Slider 2',
            imageUrl: slide3
        }
    ]

    const width = Dimensions.get('screen').width * 0.9;
    const height = 170;
    return (
        <View style={{ marginTop: 10 }}>
            <Carousel
                loop
                width={width}
                height={height}
                autoPlay={true}
                data={sliderList}
                scrollAnimationDuration={1000}
                autoFillData
                pagingEnabled={true}
                renderItem={({ item }) => (
                    <Image
                        source={item.imageUrl}
                        style={{ width: Dimensions.get('screen').width * 0.9, height: 170, borderRadius: 40, margin: 2 }}
                        alt={item.name}
                    />
                )}
            />
        </View>
    )
}