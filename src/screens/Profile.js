import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../db/firebase'

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState([])

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

  }, [])

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

  return (
    <View style={styles.container} >
      <View style={styles.containerInfo} >
        <Text>{name}</Text>
        <Text>{email}</Text>
        <View style={styles.containerGallery} >
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  },

})