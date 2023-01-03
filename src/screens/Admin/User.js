import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../db/firebase'


export default function User() {
    const [userlist, setUserList] = useState([])

    useEffect(() => {
        firestore
            .collection('users')
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    console.log(doc.data())
                    setUserList(doc.data())
                })
            })
    }, [])

    return (
        <View
            style={styles.container}
        >
            <FlatList
                numColumns={1}
                horizontal={false}
                data={userlist}
                renderItem={({ item }) => (
                    <View>
                        <Text
                            style={styles.text}
                        >{item.name}</Text>
                        <Text
                            style={styles.text}
                        >{item.email}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    }
})