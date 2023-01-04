import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function Post({ navigation }) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');

        })();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    if (hasGalleryPermission === null) {
        return <View />;
    }

    if (hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Post</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add')}
            >
                <Text
                    style={styles.buttonText}
                >Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => pickImage()}
            >
                <Text
                    style={styles.buttonText}
                >Pick Image</Text>
            </TouchableOpacity>
            {image &&
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Save', { image })}
                    >
                        <Text
                            style={styles.buttonText}
                        >Save</Text>
                    </TouchableOpacity>
                </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#f15454',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16
    },
    image: {
        width: 400,
        height: 400,
        borderRadius: 15,
        marginTop: 20
    }
})