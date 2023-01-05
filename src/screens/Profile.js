import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { auth, firestore } from '../db/firebase'

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Profile({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name)
        setEmail(doc.data().email)
      })
    firebase.firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        posts.sort(function (x, y) {
          return x.creation - y.creation;
        })
        console.log(posts);
        setPosts(posts);
      })
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    firebase.firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        posts.sort(function (x, y) {
          return x.creation - y.creation;
        })
        console.log(posts);
        setPosts(posts);
      })

  }, [onRefresh])

  useEffect(() => {
    firestore
      .collection('users')
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        setName(doc.data().name)
        setEmail(doc.data().email)
      })
  }, [])

  const signOut = () => {
    auth.signOut()
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container} >
      <View style={styles.containerInfo}>
        <Text style={[styles.text, { fontSize: 48, marginBottom: 10, fontWeight: 'bold' }]}>Personal Information</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{email}</Text>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.textbutton}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerGallery}>
        <Text style={[styles.text, { fontSize: 48, marginBottom: 10, fontWeight: 'bold' }]}>Your News</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
              <TouchableOpacity
                onPress={() => Alert.alert('Delete', 'Are you sure you want to delete this post?', [
                  { text: 'Yes', onPress: () => firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid).collection('userPosts').doc(item.id).delete() },
                  { text: 'No' }
                ])}
              >
                <Text style={[styles.text, { padding: 10 }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD8A8A'
  },
  containerInfo: {
    margin: 20,
    backgroundColor: '#A8D1D1',
    padding: 20,
    borderRadius: 10
  },
  containerGallery: {
    flex: 1,
    backgroundColor: '#A8D1D1',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  containerImage: {
    borderRadius: 15,
    margin: 5,
    padding: 5,
    flex: 1
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    width: 160,
    height: 160,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  textbutton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  }
})