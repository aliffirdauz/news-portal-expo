import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Feed from '../screens/Feed'
import Post from '../screens/Post'
import Profile from '../screens/Profile'

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}