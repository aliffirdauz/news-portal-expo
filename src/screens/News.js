import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import firebase from 'firebase/compat/app';
import DropDownPicker from 'react-native-dropdown-picker';
require("firebase/compat/firestore")

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function News({ navigation }) {
    const [posts, setPosts] = useState({})
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [items, setItems] = useState([
        { label: 'Australia', value: 'au' },
        { label: 'Canada', value: 'ca' },
        { label: 'China', value: 'cn' },
        { label: 'France', value: 'fr' },
        { label: 'Germany', value: 'de' },
        { label: 'India', value: 'in' },
        { label: 'Indonesia', value: 'id' },
        { label: 'Italy', value: 'it' },
        { label: 'Japan', value: 'jp' },
        { label: 'Russia', value: 'ru' },
        { label: 'South Korea', value: 'kr' },
        { label: 'United Kingdom', value: 'gb' },
        { label: 'United States', value: 'us' },
    ])
    const [items2, setItems2] = useState([
        { label: 'Business', value: 'business' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Health', value: 'health' },
        { label: 'Science', value: 'science' },
        { label: 'Sports', value: 'sports' },
        { label: 'Technology', value: 'technology' },
    ])
    const [refreshing, setRefreshing] = useState(false);
    const [category, setCategory] = useState('id')
    const [subCategory, setSubCategory] = useState('technology')
    const apiKey = '52fd08c928cc47fe81ab5a083929d1ed'

    const onRefresh = useCallback(() => {
        (async () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${category}&category=${subCategory}&apiKey=${apiKey}`).then(res => res.json()).then(data => {
                setPosts(data.articles);
            });
        })();
        console.log(category)
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        (async () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${category}&category=${subCategory}&apiKey=${apiKey}`).then(res => res.json()).then(data => {
                setPosts(data.articles);
            });
        })();
    }, [onRefresh]);

    return (
        <View style={styles.container} >
            <View style={styles.dropDownContainer}>
                <DropDownPicker
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setCategory}
                    setItems={setItems}
                    placeholder="Select a country"
                    defaultValue={'id'}
                    containerStyle={{ height: 40, width: 150, marginBottom: 10 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
                <DropDownPicker
                    open={open2}
                    value={subCategory}
                    items={items2}
                    setOpen={setOpen2}
                    setValue={setSubCategory}
                    setItems={setItems2}
                    placeholder="Select a category"
                    defaultValue={'technology'}
                    containerStyle={{ height: 40, width: 150, marginBottom: 10 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                />
            </View>
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
                                source={{ uri: item.urlToImage }}
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
    dropDownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
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