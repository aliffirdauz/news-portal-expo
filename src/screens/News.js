import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function News({ navigation, route: { params: { category, subCategory, apiKey } } }) {
    const [posts, setPosts] = useState({})
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        (async () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${category}&category=${subCategory}&apiKey=${apiKey}`).then(res => res.json()).then(data => {
                setPosts(data.articles);
            });
        })();
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

    const getCategory = () => {
        switch (category) {
            case 'us':
                return 'United States';
            case 'in':
                return 'India';
            case 'gb':
                return 'United Kingdom';
            case 'au':
                return 'Australia';
            case 'br':
                return 'Brazil';
            case 'ca':
                return 'Canada';
            case 'cn':
                return 'China';
            case 'fr':
                return 'France';
            case 'de':
                return 'Germany';
            case 'hk':
                return 'Hong Kong';
            case 'it':
                return 'Italy';
            case 'jp':
                return 'Japan';
            case 'mx':
                return 'Mexico';
            case 'ru':
                return 'Russia';
            case 'sa':
                return 'Saudi Arabia';
            case 'sg':
                return 'Singapore';
            case 'za':
                return 'South Africa';
            case 'kr':
                return 'South Korea';
            case 'es':
                return 'Spain';
            case 'se':
                return 'Sweden';
            case 'ch':
                return 'Switzerland';
            case 'tw':
                return 'Taiwan';
            case 'th':
                return 'Thailand';
            case 'tr':
                return 'Turkey';
            default:
                return 'United States';
        }
    }

    const getSubCategory = () => {
        switch (subCategory) {
            case 'business':
                return 'Business';
            case 'entertainment':
                return 'Entertainment';
            case 'health':
                return 'Health';
            case 'science':
                return 'Science';
            case 'sports':
                return 'Sports';
            case 'technology':
                return 'Technology';
            default:
                return 'Technology';
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.dropDownContainer}>
                <View style={styles.dropDown}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Country</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{getCategory()}</Text>
                </View>
                <View style={styles.dropDown}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Category</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{getSubCategory()}</Text>
                </View>
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
        justifyContent: 'space-around',
        margin: 20,
        backgroundColor: '#A8D1D1',
        padding: 10,
        borderRadius: 15
    },
    dropDown: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 15
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