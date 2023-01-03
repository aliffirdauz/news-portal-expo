import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

export default function Feed(props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // firebase.firestore()
    //   .collection("posts")
    //   .doc(firebase.auth().currentUser.uid)
    //   .collection("userPosts")
    //   .orderBy("creation", "asc")
    //   .get()
    //   .then((snapshot) => {
    //     const uid = snapshot.docs[0].ref.path.split('/')[1];
    //     const user = getState().usersState.users.find(el => el.uid === uid);

    //     let posts = snapshot.docs.map(doc => {
    //       const data = doc.data()
    //       const id = doc.id
    //       return { id, ...data, user }
    //     })
    //     posts.sort(function (x, y) {
    //       return x.creation - y.creation;
    //     }
    //     )
    //     console.log(posts);
    //     setPosts(posts);
    //   })

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

  return (
    <View style={styles.container} >
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
    flex: 1,
    aspectRatio: 1 / 1,
    borderRadius: 15
  },

})