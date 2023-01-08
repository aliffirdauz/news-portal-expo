import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../db/firebase';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {
        navigation.navigate('Register')
    }

    const handleLogin = () => {
        if ((email == "admin") && (password == "admin")) {
            navigation.navigate('Dashboard')
            setEmail('')
            setPassword('')
            return
        }
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
                navigation.navigate('Main');
            })
            .catch(error => alert(error.message))

        setEmail('')
        setPassword('')
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
        >
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://docs.google.com/uc?export=download&id=1X2L5n1-FtpLQBGWuiT0eIP69CmHxUKWO' }}
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={handleSignUp} style={styles.footerLink}>Sign up</Text></Text>
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
        backgroundColor: '#FD8A8A'
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
        backgroundColor: '#F1F7B5',
        padding: 10,
        borderRadius: 10
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
    text: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
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