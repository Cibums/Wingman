import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import TopBar from '../components/TopBar';
import addBtn from '../assets/images/add.png'

import * as firebase from 'firebase';
import 'firebase/firestore';

import Loading from './Loading';

export default function ChatScreen(props) {

    const messages = [
        "qwertyui",
        "fheifjepof",
        "rgrrhrjh",
        "qwertyui",
        "fheifjepof",
        "rgrrhrjh",
        "qwertyui",
        "fheifjepof",
        "rgrrhrjh",
        "qwertyui",
        "fheifjepof",
        "rgrrhrjh",
    ];

    const [loaded, setLoadedState] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    function GetProfile(){

        if(loaded == true){
          return;
        }
    
        const dbh = firebase.firestore();
      
        if(dbh == null){
          console.log("No database connecttion");
          return <View><Text>no database</Text></View>;
        }
      
        var docRef = dbh.collection("UserInformation").doc(props.uid);
      
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

    if(loaded == false){
        GetProfile();
        return(
            <Loading /> 
        )
    }
    else{
        return (
            <View style={styles.container}>
                <View style={{height: 100, width: '100%', backgroundColor: '#F8F9FE', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}} >
                        <Image source={{uri: "https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"}} style={{width: 50, height: 50, borderRadius: 50}} />
                        <Text>{userInfo.username}</Text>
                    </View>
                    
                </View>
                <FlatList 
                    data={messages}
                    renderItem={({ item, index }) => 
                        <View>
                            {renderMessage(item, index)}
                        </View>
                    }
                    inverted={true}
                />
                <View style={{width: '100%', flexDirection: 'row', backgroundColor: 'white', backgroundColor: '#F8F9FE', padding: 20}}>
                    <View style={{flex: 1}}><TextInput style={{height: 50, backgroundColor: '#eee', borderRadius: 10}} /></View>
                    <TouchableOpacity style={{width: 100, height: 50, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginLeft: 10}} >
                        <Text>SEND</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderMessage(item, index) {

        var style = {minHeight: 80, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginHorizontal: 20};

        if(index % 2 == 0){
            style = [style, {flexDirection: 'row-reverse'}];
        }

        return(
            <View style={style}>
                <View style={{width: '60%', minHeight: 50, backgroundColor: '#eee', borderRadius: 20, justifyContent: 'center', padding: 10, marginVertical: 20}}>
                    <Text>Halloj</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    label:{
        marginVertical: 20,
    },
    messageBox:{
        flexDirection: 'row',
        alignItems: 'center',
        height:150,
        width:'100%',
        justifyContent: 'flex-start',
        padding:20
    },
    messageSubBox:{
        flex:1,
        height:'100%',
        justifyContent: 'center' 
    },
    messagePic:{
        height: 100,
        width: 100,
        borderRadius:100,
        backgroundColor: '#000',
        marginRight:20
    }
});
