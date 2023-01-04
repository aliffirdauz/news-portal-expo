import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

export default function DetailPost(props) {
    const [post, setPost] = useState([])

    const { postId } = props.route.params

    console.log(postId)

    useEffect(() => {
        firebase.firestore()
            .collection("allPosts")
            .doc(postId)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log(snapshot.data())
                    setPost(snapshot.data())
                } else {
                    console.log("does not exist")
                }
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
            >
                {post.title}
            </Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: post.downloadURL }} style={styles.image} />
            </View>
            <Text
                style={styles.text}
            >
                {post.description}
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