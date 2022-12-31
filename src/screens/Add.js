import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")
require("firebase/compat/storage")

function Save(props) {
  const [caption, setCaption] = useState('')

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
      }).then(function () {
        props.navigation.popToTop()
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
      <TextInput
        placeholder="Write a caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  )
}

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.fixedRation} type={type} ratio={'1:1'} />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }
        }>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Pick Image" onPress={() => pickImage()} />
      <Button title="Save Image" onPress={() => navigation.navigate('Save', { image })} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRation: {
    flex: 1,
    aspectRatio: 1
  }
});