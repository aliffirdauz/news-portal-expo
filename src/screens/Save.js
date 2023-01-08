import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")
require("firebase/compat/storage")


export default function Save(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

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
                Alert.alert('Image Uploaded', 'Your image has been uploaded successfully')
                savePostData(snapshot)
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            Alert.alert('Error', 'Something went wrong')
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
                title,
                description,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(
                firebase.firestore()
                    .collection("allPosts")
                    .add({
                        downloadURL,
                        title,
                        description,
                        creation: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: firebase.auth().currentUser.uid,
                        status: 'Pending'
                    })
            ).then(function () {
                navigation.navigate('Feed')
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.title}>ADD POST</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.route.params.image }} style={styles.image} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Write a title"
                onChangeText={(title) => setTitle(title)}
            />
            <TextInput
                multiline
                numberOfLines={4}
                style={[styles.input, {height: 100}]}
                placeholder="Write a description"
                onChangeText={(description) => setDescription(description)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => uploadImage()}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    input: {
        margin: 10,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: 400,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#9EA1D4',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 300,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    title: {
        marginTop: 20,
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
});
