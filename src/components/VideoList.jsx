import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function VideoList({ item }) {
    return (
        // <Link href={`/${item.name}`} asChild>
        <Pressable >
            <View style={styles.listContainer}>
                <View>
                    <Image source={{ uri: item.img }} style={styles.image} />
                </View>
                <View style={styles.playContent}>
                    <Text style={styles.content}>Press to play
                    </Text>
                    <Image source={require('../../assets/YouTubePlayer.png')} style={styles.playerImage} />
                </View>
                <Text style={styles.content}>{item.name}</Text>
            </View>

        </Pressable>
        // </Link>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        gap: 10,
        // flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black'
    },
    content: {
        color: '#ffff',
        lineHeight: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 120
    },
    playerImage: {
        width: 50,
        height: 50,
    },
    playContent: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    }
})