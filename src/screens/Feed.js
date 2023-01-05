import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Feed({ navigation }) {
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    firebase.firestore()
      .collection("allPosts")
      .where("status", "==", "approved")
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
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailPost", { postId: item.id, uid: item.uid })}
            >
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
              <Text
                style={styles.titlepost}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
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