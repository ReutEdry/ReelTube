import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getVideos } from "../service/youtubeVideos";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoDetailsScreen() {
    const params = useLocalSearchParams()
    const [video, setVideo] = useState([])
    const { searchKey, id } = params

    useEffect(() => {
        const fetchData = async () => {
            const videos = await getVideos(searchKey)
            const video = videos.videos.find((v) => v.id === id)
            setVideo(video)
        }

        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            {video && (
                <View>
                    <Stack.Screen options={{ title: video?.name }} />
                    <YoutubePlayer
                        height={250}
                        videoId={id}
                    />
                    <Text style={[styles.txt, { fontWeight: '700' }]}>{video.name}</Text>
                    <Text style={styles.txt}>{video.desc}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282828',
        height: '100%'
    },
    txt: {
        textAlign: 'center',
        lineHeight: 20,
        marginVertical: 10,
        color: '#ffff'
    }
})