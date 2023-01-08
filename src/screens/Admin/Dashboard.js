import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import firebase from "firebase/compat/app";
require("firebase/compat/firestore");

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Dashboard({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("allPosts")
      .where("status", "==", "Pending")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const dataPost = [];
        snapshot.docs.map((doc) => {
          dataPost.push({
            id: doc.id,
            creation: doc.data().creation,
            description: doc.data().description,
            downloadURL: doc.data().downloadURL,
            status: doc.data().status,
            title: doc.data().title,
            uid: doc.data().uid,
          });
        });
        setPosts(dataPost);
      });
  }, []);

  const onRefresh = useCallback(() => {
    firebase
      .firestore()
      .collection("allPosts")
      .where("status", "==", "Pending")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const dataPost = [];
        snapshot.docs.map((doc) => {
          dataPost.push({
            id: doc.id,
            creation: doc.data().creation,
            description: doc.data().description,
            downloadURL: doc.data().downloadURL,
            status: doc.data().status,
            title: doc.data().title,
            uid: doc.data().uid,
          });
        });
        setPosts(dataPost);
      });
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const signOut = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={signOut}
        >
          <Text style={styles.textbutton}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={() => navigation.navigate("User")}
        >
          <Text style={styles.textbutton}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={() => navigation.navigate("AdminFeed")}
        >
          <Text style={styles.textbutton}>Feed</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            { fontSize: 48, marginBottom: 10, fontWeight: "bold" },
          ]}
        >
          Pending Post
        </Text>

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
                onPress={() =>
                  Alert.alert(
                    "Update",
                    "Are you sure you want to accept this post?",
                    [
                      {
                        text: "Yes",
                        onPress: () =>
                          firebase
                            .firestore()
                            .collection("allPosts")
                            .doc(item.id)
                            .update({ status: "Approved" })
                            .then(() => {
                              Alert.alert(
                                "Information",
                                "This Post Has Been Approved!"
                              );
                            }),
                      },
                      { text: "No" },
                    ]
                  )
                }
              >
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadURL }}
                />
                <Text style={styles.titlepost}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FD8A8A",
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
    margin: 20,
    borderRadius: 15,
    backgroundColor: "#A8D1D1",
    padding: 25,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  button: {
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  textbutton: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  titlepost: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
