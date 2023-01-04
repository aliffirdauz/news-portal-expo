import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")
require("firebase/compat/storage")


export default function Save(props) {
    const [caption, setCaption] = useState('')

    const navigation = useNavigation();

    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        console.log(childPath)

        const response = await fetch(uri)
        const blob = await response.blob()

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(
                firebase.firestore()
                    .collection("allPosts")
                    .add({
                        downloadURL,
                        caption,
                        creation: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: firebase.auth().currentUser.uid,
                        status: 'Pending'
                    })
            ).then(function () {
                navigation.navigate('Feed')
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.route.params.image }} style={styles.image} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Write a caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => uploadImage()}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    input: {
        margin: 10,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 300
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
});
