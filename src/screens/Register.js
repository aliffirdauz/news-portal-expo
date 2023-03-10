import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { auth, firestore } from '../db/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {
        var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

        if ((email.length == 0) || (password.length == 0) || (confirmPassword.length == 0)) {
            alert("Required Field Is Missing!!!");
        } else if (!(checkEmail).test(email)) {
            alert("invalid email!!!");
        }
        // Password validations
        else if (password.length < 8) {
            alert("Minimum 08 characters required!!!");
        } else if (((/[ ]/).test(password))) {
            alert("Don't include space in password!!!");
        } else if (password !== confirmPassword) {
            alert("Password does not match!!!");
        }


        else {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    firestore.collection("users")
                        .doc(auth.currentUser.uid)
                        .set({
                            name: name,
                            email: email,
                            creation: firebase.firestore.FieldValue.serverTimestamp()
                        })
                    console.log(result)
                    navigation.navigate('Login');
                })
                .catch(error => alert(error.message))
        }
    }

    const handleLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://docs.google.com/uc?export=download&id=1X2L5n1-FtpLQBGWuiT0eIP69CmHxUKWO' }}
                />
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Already have an account? <Text onPress={handleLogin} style={styles.footerLink}>Login</Text></Text>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FD8A8A',
    },
    image: {
        aspectRatio: 1 / 1,
        borderRadius: 5,
    },
    inputContainer: {
        width: '90%',
        backgroundColor: '#F1F7B5',
        padding: 30,
        borderRadius: 10,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'lightgray',
        borderWidth: 1

    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        flexDirection: 'column',
    },
    button: {
        backgroundColor: '#9EA1D4',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    title: {
        fontSize: 48,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000',
    },
    footerText: {
        marginTop: 20,
        fontSize: 16,
        color: '#000000',
    },
    footerLink: {
        color: "#9EA1D4",
        fontWeight: "bold",
        fontSize: 16
    }
})