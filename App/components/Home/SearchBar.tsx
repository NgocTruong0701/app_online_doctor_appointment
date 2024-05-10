import { TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors } from "@assets/Shared";
import { useState } from "react";
import { OutfitRegular } from "@assets/Shared/typography";

interface ISearchBar {
    setSearchText: any;
}

export default function SearchBar({ setSearchText }: ISearchBar) {

    const [searchInput, setSearchInput] = useState('');

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', borderWidth: 0.6, borderColor: Colors.gray, padding: 8, borderRadius: 8 }}>
                <Feather name="search" size={24} color={Colors.blue} />
                <TextInput
                    placeholder="Search"
                    onChangeText={(value) => setSearchInput(value)}
                    style={{ width: '100%', fontFamily: OutfitRegular }}
                    onSubmitEditing={() => setSearchText(searchInput)}
                />
            </View>
        </View>
    )
}