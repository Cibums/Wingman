import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import topBarPicture from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';
import backPicture from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';
import Break from '../components/Break';

import * as firebase from 'firebase';
import 'firebase/firestore';
import RegisterScreen from './RegisterScreen';
import Loading from './Loading';

const pictures = 
[
  {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      uri: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  },
  {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      uri: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  },
  {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      uri: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
  },
];

var pics = [];

export default function ProfileScreen(props) {

  function setImage(i){

    console.log("Setting Image...");

    if(pics.length === 0){
        pics = ([{
            id: i,
            uri: i
        }]);
    }
    else{
        pics.push({
            id: i,
            uri: i
        });
    }

    setPictures(pics);
  }

  const [pictures, setPictures] = useState([]);

  function getPictures(index = 0){
    
    firebase.storage().ref(props.id + "/image" + index + ".jpeg").getDownloadURL().then(function(url) {
        console.log("Got Image: " + url);
        setImage(url, true);
        getPictures(index + 1);
        return;
      }).catch(function(error) {
        switch(error.code){
            case 'storage/object-not-found':
                return;
        }
    });
  }

  const [userInfo, setUserInfo] = useState({
    username: "",
    bio: ""
  });

  const [picturesLoaded, loadPictures] = useState(false);
  const [loaded, setLoadedState] = useState(false);

  if(loaded == false){
    GetProfile();

    return(
      <Loading />
    )
  }

  if(picturesLoaded == false){

    setPictures([]);
    pics = [];

    getPictures();
    loadPictures();
  }

  return (
    <ScrollView style={styles.container}>
        <TopBar 
            leftIcon={backPicture}
            rightIcon={logo}
            rightOnPress={2}
            leftOnPress={3}
        />
        <View>
          <FlatList 
            horizontal={true}
            data={pictures}
            renderItem={({item}) => 
            <View style={styles.picture}>
              <Image 
                style={styles.picture} 
                source={{uri: item.uri}}
              />
            </View>
            }
            keyExtractor={item => item.id}
          />
          <TouchableOpacity style={{position: 'absolute', }}><Image style={{height: 100, width: 100}} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRty_XLYXUcbWOTaePNV7fahK66FiR41r-kQ&usqp=CAU"}} /></TouchableOpacity>
        </View>        
        <View style={styles.infoBar}>
          <Text>{userInfo.username}</Text>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width: 20, height: 20}} source={{uri: "https://icon-library.com/images/position-icon/position-icon-8.jpg"}} />
            <Text>73 km</Text>
          </View>
        </View>
        
        <Break />

        <View style={styles.inputBox}>
          <Text style={styles.label}>About Me:</Text>
          <Text style={styles.inputLonger} > {userInfo.bio} </Text>
        </View>
    </ScrollView>
  )

  function GetProfile(){

    if(loaded == true){
      return;
    }

    const dbh = firebase.firestore();
  
    if(dbh == null){
      console.log("No database connecttion");
      return <View><Text>no database</Text></View>;
    }
  
    var docRef = dbh.collection("UserInformation").doc(props.id.toString());
  
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

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  picture:{
    width:400,
    height: 400
  },
  pictureIndicator:{
    height: 50
  },
  infoBar:{
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  inputBox:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  inputLonger:{
    backgroundColor: '#F0F1FD',
    minHeight:120,
    width:'100%',
    padding:10
  },
  label:{
    margin: 10,
    width: 80
  },
});
