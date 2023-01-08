import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function AdminFeed({ navigation }) {
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    firebase.firestore()
      .collection("allPosts")
      .where("status", "==", "Approved")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const dataPost = []
        snapshot.docs.map(doc => {
          dataPost.push({
            id: doc.id,
            creation: doc.data().creation,
            downloadURL: doc.data().downloadURL,
            uid: doc.data().uid,
            title: doc.data().title,
            description: doc.data().description,
            status: doc.data().status,
          })
        })
        setPosts(dataPost);
      })
  }, [])

  const onRefresh = useCallback(() => {
    firebase.firestore()
      .collection("allPosts")
      .where("status", "==", "Approved")
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

  return (
    <View style={styles.container} >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
              <Text
                style={styles.titlepost}
              >
                {item.title}
              </Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FD8A8A'
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3,
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#A8D1D1',
    padding: 25
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    borderRadius: 15
  },
  titlepost: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }


})