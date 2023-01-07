import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

export default function SearchNews({ navigation }) {
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
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const apiKey = '52fd08c928cc47fe81ab5a083929d1ed'

    return (
        <View style={styles.container} >
            <View style={styles.box}>
                <Text style={styles.title}>Search News</Text>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('DetailNews', { category: category, subCategory: subCategory, apiKey: apiKey })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FD8A8A',
    },
    box: {
        backgroundColor: '#A8D1D1',
        width: '90%',
        height: '90%',
        borderRadius: 15,
        alignSelf: 'center',
        margin: 20
    },
    dropDownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20
    },
    title: {
        marginTop: 20,
        fontSize: 80,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
    },
    button: {
        width: '80%',
        backgroundColor: '#9EA1D4',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16
    },
})