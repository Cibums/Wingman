import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import * as firebase from 'firebase';
import 'firebase/firestore';

import topBarPicture from '../assets/images/logo.png';
import profileIcon from '../assets/images/profile.png';
import cogIcon from '../assets/images/cog.png';
import doneBtn from '../assets/images/doneBtn.png';
import App from '../App';
import Loading from './Loading';

const GoToProfilePage = (id) => {
    App.currentProfileID = id;
    App.changePage(6);
}

export default function WingmanScreen() {

    const [loaded, setLoadedState] = useState(false);

    async function GetUsers(){
    
        setLoadedState(true);

        const dbh = firebase.firestore();
      
        if(dbh == null){
          console.log("No database connecttion");
          return <View><Text>no database</Text></View>;
        }
      
        dbh.collection("UserInformation").get().then(async function(querySnapshot) {
            
            const userss = [];

            await querySnapshot.forEach(async function(doc) {

                var picUrl = "https://bkc.nu/wp-content/uploads/2016/07/profile-placeholder-300x300.png";

                await firebase.storage().ref(doc.id + "/image0.jpeg").getDownloadURL().then(function(url) {
                    picUrl = url;
                    console.log("got picture");
                  }).catch(function(error) {
                    // Handle any errors
                });

                console.log("pushing");

                userss.push({
                    id: doc.id,
                    profilePicUri: picUrl,
                    name: doc.data().name,
                    age: doc.data().age,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude
                });

                setUsers(userss);
                
            });

            console.log("got user");
            
        });

    }

    const [users, setUsers] = useState([
        {
            id: "",
            profilePicUri: "data:image/jpeg;base64,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",
            name: "Chris",
            age: 41,
            latitude: 0,
            longitude: 0
        }
    ]);

    if(loaded == false){
        GetUsers();
        return(
            <Loading /> 
        )
    }
    else{
        return (
            <View style={styles.container}>
                
                <TopBar 
                    leftIcon={profileIcon}
                    middleIcon={topBarPicture}
                    rightIcon={cogIcon}
                    leftOnPress={4}
                />
                <View style={styles.container}>
                    <FlatList 
                        data={users}
                        numColumns={2}
                        renderItem={({ item }) => 
                            <View style={styles.profileBox}>
                                <TouchableOpacity onPress={() => GoToProfilePage(item.id)} >
                                    <Image style={styles.profilePic} source={{uri: item.profilePicUri}} />
                                </TouchableOpacity>
                                
                                <Text style={styles.label}>{item.name}, {item.age}, {item.location}</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
    label:{
        marginVertical: 20,
    },
    profileBox:{
        flexDirection: 'column',
        alignItems: 'center',
        height:250,
        width:'50%',
        justifyContent: 'space-between'
    },
    profilePic:{
        borderRadius: 100,
        width:150,
        height:150,
        margin: 20
    }
});
