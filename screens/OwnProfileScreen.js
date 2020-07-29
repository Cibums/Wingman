import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import topBarPicture from '../assets/images/profile.png';
import chat from '../assets/images/backBtn.png';
import cog from '../assets/images/cog.png';
import Break from '../components/Break';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import editIcon from '../assets/images/editIcon.png'
import App from '../App';
import Loading from './Loading';

export default function OwnProfileScreen() {

  const [profilePicUri, setProfilePic] = useState("https://magnuskolsjo.se/wp-content/uploads/sites/2/2019/03/no-image.jpg");
  const [loaded, setLoadedState] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    bio: ""
  });

  function GetProfile(){

    const dbh = firebase.firestore();

    if(dbh == null){
      console.log("No database connecttion");
      return <View><Text>no database</Text></View>;
    }

    var docRef = dbh.collection("UserInformation").doc(firebase.auth().currentUser.uid);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setUserInfo({
              username: doc.data().name,
              bio: doc.data().bio
            });
            setLoadedState(true);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  const renderProfilePic = () => {

    firebase.storage().ref(firebase.auth().currentUser.uid + "/image0.jpeg").getDownloadURL().then(function(url) {
      setProfilePic(url);
    }).catch(function(error) {
      // Handle any errors
    });
  }

  if(loaded){
    return (
      <View style={{flex:1}}>
          <TopBar 
              leftIcon={chat}
              middleIcon={topBarPicture}
              rightIcon={cog}
              leftOnPress={5}
          />
          <View style={styles.container} >
              {renderProfilePic()}
              <Image style={styles.picture} source={{uri: profilePicUri}} />
              <View style={{maxWidth: 100, alignItems: 'center'}}>
                  <Text style={styles.label}>{userInfo.username}</Text>
                  <Text>{userInfo.bio}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => App.changePage(1)}>
                      <Image style={styles.editBtn} source={editIcon} />
                  </TouchableOpacity>
                  <Text>Edit Profile</Text>
              </View>
          </View>
      </View>
    );
  }
  else{
    GetProfile();
    return(
      <Loading />
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    marginVertical: 100,
    flex:1
  },
  picture:{
    width:250,
    height: 250,
    borderRadius: 150
  },
  label:{
    margin: 10,
    fontSize: 18
  },
  editBtn:{
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    borderWidth:1, 
    borderColor: '#eee'
  }
});
