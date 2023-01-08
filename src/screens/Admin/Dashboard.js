import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")


export default function Dashboard({ navigation }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        firebase.firestore()
            .collection("allPosts")
            .where("status", "==", "Pending")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                const dataPost = []
                snapshot.docs.map(doc => {
                    dataPost.push({
                        id: doc.id,
                        creation: doc.data().creation,
                        description: doc.data().description,
                        downloadURL: doc.data().downloadURL,
                        status: doc.data().status,
                        title: doc.data().title,
                        uid: doc.data().uid,
                    })
                })
                setPosts(dataPost);
            })
    }, [])

    const signOut = () => {
        navigation.navigate('Login')
      }

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <TouchableOpacity style={styles.button} onPress={signOut}>
                    <Text style={styles.textbutton}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('User')}
                >
                    <Text style={styles.textbutton}>User</Text>
                </TouchableOpacity>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <TouchableOpacity
                                onPress={() => Alert.alert('Update', 'Are you sure you want to accept this post?', [
                                { text: 'Yes', onPress: () => firebase.firestore().collection('allPosts').doc(item.id).update({status: "Approved"}).then(() => {console.log("Post Approved")})},
                                { text: 'No' }
                                ])}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                            </TouchableOpacity>
                            {/* <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            /> */}
                            {/* <TouchableOpacity
                                onPress={() => Alert.alert('Update', 'Are you sure you want to accept this post?', [
                                { text: 'Yes', onPress: () => firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid).collection('userPosts').doc(item.id).update() },
                                { text: 'No' }
                                ])}
                            >
                                <Text style={[styles.text, { padding: 10 }]}>Confirm</Text>
                            </TouchableOpacity> */}
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        margin: 20
    },
    image: {
        // flex: 1,
        aspectRatio: 1 / 1
    },
    text: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    textbutton: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
    
})