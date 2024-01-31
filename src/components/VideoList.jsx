import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function VideoList({ item, searchKey }) {
    const { img, name, id } = item

    return (
        <Link href={{
            pathname: `/${id}`,
            params: { searchKey: searchKey },
        }} asChild >
            <Pressable >
                <View style={styles.listContainer}>
                    <Image source={{ uri: img }} style={styles.videoImage} />
                    <Image source={require('../../assets/YouTubePlayer.png')} style={styles.playerImage} />
                    <Text style={styles.content}>{name}</Text>
                </View>
            </Pressable>
        </Link >
    )
}

const styles = StyleSheet.create({
    listContainer: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        width: 'auto',
        marginBottom: 15,

    },
    content: {
        color: '#ffff',
        lineHeight: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    videoImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        position: 'relative'
    },
    playerImage: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: 100
    },
    playContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    }
})