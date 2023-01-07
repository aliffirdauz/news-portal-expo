import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Feed from '../screens/Feed'
import Post from '../screens/Post'
import Profile from '../screens/Profile'
import News from '../screens/News'
import SearchNews from '../screens/SearchNews'

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator screenOptions={
      {
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#A8D1D1',
        tabBarStyle: { backgroundColor: '#FD8A8A' },
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#F1F7B5' }
      }
    }>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="News" component={SearchNews} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}