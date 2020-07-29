import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, CheckBox, Text, Modal, TextInput } from 'react-native';

import useCachedResources from './hooks/useCachedResources';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import WingmanScreen from './screens/WingmanScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostsScreen from './screens/PostsScreen';
import GameStructureScreen from './screens/GameStructureScreen';
import OwnProfileScreen from './screens/OwnProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommentScreen from './screens/CommentsScreen';
import ChatScreen from './screens/ChatScreen';

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

var dbh = null;
var storage = null;

if (!firebase.apps.length) {
  console.log("Firebase init");
  firebase.initializeApp(firebaseConfig);
}
else{
  dbh = firebase.firestore();
  storage = firebase.storage();
}
const Stack = createStackNavigator();

export default function App(props) {

  console.disableYellowBox = true;

  const renderPage = (pageID) => {

    /*return(
      <ChatScreen uid="qIfhOvauQ5WV1V6stL2mrf73E502" />
    )*/

    switch(pageID){
      case 0:
        return(
          <LoginScreen />
        )
        break;
      case 1:
        return(
          <RegisterScreen />
        )
        break;
      case 2:
        return(
          <WingmanScreen />
        )
        break;
      case 3:
        return(
          <PostsScreen />
        )
        break;
      case 4:
        return(
          <OwnProfileScreen />
        )
        break;
      case 6:
        return(
          <ProfileScreen id={App.currentProfileID} />
        )
        break;
      case 7:
        return(
          <ChatScreen user={{}} />
        )
    }
  }

  const [loggedInUID, setLoggedInUID] = useState("");
  App.setLoggedInID = (id) => {
    setLoggedInUID(id);
    App.loggedInUserID = id;
  }

  App.changePage = (id) => {
    setPage(id);
    console.log("changed to " + id);
  }

  const [currentPage, setPage] = useState(0);
  const [modalVisible, setModalVisabilty] = useState(false);

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {

    if(firebase.auth().currentUser == null){ //Check if user is Signed in firebase.auth().currentUser == null
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          {renderPage(0)}
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          {renderPage(currentPage)}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label:{
      margin: 10,
      width: 80
  },
});
