import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../db/firebase'

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

export default function User() {
    const [userList, setUserList] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        firebase.firestore()
            .collection("allPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                const dataPost = []
                snapshot.docs.map(doc => {
                    dataPost.push({
                        id: doc.id,
                        caption: doc.data().caption,
                        creation: doc.data().creation,
                        downloadURL: doc.data().downloadURL,
                        uid: doc.data().uid,
                    })
                })
                setPosts(dataPost);
            })
    }, [])

    useEffect(() => {
        firestore
            .collection('users')
            .orderBy("name", "asc")
            .get()
            .then((snapshot) => {
                const dataUser = []
                snapshot.docs.forEach(doc => {
                    dataUser.push({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email
                    })
                })
                setUserList(dataUser)
            })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerInfo}>
                    <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={posts}
                        renderItem={({ item }) => (
                            <View style={styles.containerImage}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                            </View>
                        )}
                    />
                </View>
                <View style={styles.containerGallery}>
                    <Text
                        style={styles.title}
                    >User</Text>
                    <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={userList}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.text}>{item.email}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 5,
    },
    containerInfo: {
        margin: 20,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,
        margin: 20
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
    },
})