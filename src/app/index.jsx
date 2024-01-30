import { getVideos } from '../service/youtubeVideos';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {

    const [videosToDisplay, setVideosToDisaply] = useState([])
    const [search, setSearch] = useState('')
    // const data = await getVideos()
    // console.log(data);

    // async function getVideos() {

    // }


    function onHandelSearch() {
        Keyboard.dismiss()
        console.log(search);
    }

    console.log('search:', search);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[styles.container, !videosToDisplay.length && { justifyContent: 'center' }]}>
                <View style={styles.search}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                        placeholder='Search for a video'
                        placeholderTextColor="white"
                        onSubmitEditing={onHandelSearch}
                        returnKeyType='done'
                    />
                    <TouchableOpacity onPress={onHandelSearch}>
                        <View style={styles.searchContainer}>
                            <Image style={styles.searchIcon} source={require('../../assets/search.png')} />
                        </View>
                    </TouchableOpacity >
                </View>
                {!videosToDisplay?.length && <Text style={styles.content}>Welcome to ReelTube
                    for start search for a video</Text>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#282828',
        gap: 30,
        padding: 10
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 5,
        paddingTop: 20

    },
    content: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ffff',
        borderRadius: 3,
        color: '#ffff'
    },
    searchContainer: {
        height: 40,
        width: 40,
        padding: 8,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000',
    },
    searchIcon: {
        height: 23,
        width: 23,
    }
});
