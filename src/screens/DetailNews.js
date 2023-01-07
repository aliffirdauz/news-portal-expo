import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

require("firebase/compat/firestore")

export default function DetailNews({ route: { params: { title, urlToImage, content, description } } }) {
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
            >
                {title}
            </Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: urlToImage }} style={styles.image} />
            </View>
            <Text
                style={styles.text}
            >
                {description}
            </Text>
            <Text
                style={styles.text}
            >
                {content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FD8A8A'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 15
    },
    title: {
        marginTop: 20,
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        color: 'white',
        padding: 15
    }
})