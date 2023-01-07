import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Main from './src/components/Main';
import Add from './src/screens/Add';
import Save from './src/screens/Save';
import User from './src/screens/Admin/User';
import Dashboard from './src/screens/Admin/Dashboard';
import DetailPost from './src/screens/DetailPost';
import News from './src/screens/News';
import SearchNews from './src/screens/SearchNews';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Save" component={Save} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
        <Stack.Screen name="News" component={SearchNews} />
        <Stack.Screen name="DetailNews" component={News} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
