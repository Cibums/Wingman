import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, CheckBox, Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { render } from 'react-dom';
import WingmanScreen from './screens/WingmanScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostsScreen from './screens/PostsScreen';
import GameStructureScreen from './screens/GameStructureScreen';
import OwnProfileScreen from './screens/OwnProfileScreen';

var firebaseConfig = {
  apiKey: "AIzaSyD_R8aHKE6FxC8kzPon9rVCbddRlKa-0hE",
  authDomain: "wingman-2d994.firebaseapp.com",
  databaseURL: "https://wingman-2d994.firebaseio.com",
  projectId: "wingman-2d994",
  storageBucket: "wingman-2d994.appspot.com",
  messagingSenderId: "1028172654507",
  appId: "1:1028172654507:web:ff0ae0e6abea489c5894ee",
  measurementId: "G-24T2LNCQBZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <RegisterScreen />
    </View>
    )


  return (<View><Text>ERROR</Text></View>)

  if (!isLoadingComplete) {
    return null;
  } else {

    if(firebase.auth().currentUser == null){ //Check if user is Signed in
      return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Button title="efef" onPress={() => addUserInfo()} />
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
