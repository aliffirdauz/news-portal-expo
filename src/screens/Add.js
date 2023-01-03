import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Camera ref={ref => setCamera(ref)} style={styles.fixedRation} type={type} ratio={'1:1'} />
          {image && <Image source={{ uri: image }} style={{ flex: 1, aspectRatio: 1 / 1 }} />}
          {!image && <View style={{ flex: 1, aspectRatio: 1 / 1 }} />}
          
        </View>
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }
          }>
          <Text
            style={styles.buttonText}
          >Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => takePicture()}
        >
          <Text
            style={styles.buttonText}
          >Take Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Save', { image })}
        >
          <Text
            style={styles.buttonText}
          >Save</Text>
        </TouchableOpacity>
      </View>
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
    aspectRatio: 1 / 1
  },
  button: {
    margin: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  text: {
    fontSize: 18,
    color: 'white'
  }
});