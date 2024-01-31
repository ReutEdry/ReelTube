import { getVideos } from '../service/youtubeVideos';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import { useState } from 'react';
import VideoList from '../components/VideoList';

export default function ReelTubeScreen() {
    const [videosToDisplay, setVideosToDisaply] = useState([])
    const [search, setSearch] = useState('')
    const [searchKey, setSearchkey] = useState('')

    async function onHandelSearch() {
        Keyboard.dismiss()
        const videos = await getVideos(search)
        setSearchkey(videos.searchKey)
        setVideosToDisaply((videos.videos))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[styles.container, !videosToDisplay?.length && { justifyContent: 'center' }]}>
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
                {videosToDisplay?.length ? (
                    <FlatList
                        data={videosToDisplay}
                        contentContainerStyle={{ gap: 5 }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <VideoList item={item} searchKey={searchKey} />}
                        contentInsetAdjustmentBehavior="automatic"
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text style={styles.content}>Welcome to ReelTube. Start searching for a video!</Text>
                )}
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
    },
});