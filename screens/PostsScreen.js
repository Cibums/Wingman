import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import TopBar from '../components/TopBar';

import * as firebase from 'firebase';
import 'firebase/firestore';

import topBarPicture from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';
import backBtn from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';
import cog from '../assets/images/cog.png';
import Loading from './Loading';
import CommentScreen from './CommentsScreen';

export default function PostScreen() {

    const [commentsOpened, setCommentsOpenedState] = useState(false);
    const [openedPost, setPost] = useState({});

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function addPostHandler(){
        addPost(postInput);
    }

    function OpenPost(post){
        setPost(post);
        setCommentsOpenedState(true);
    }

    var locTxt = 'Waiting..';
    if (errorMsg) {
        locTxt = errorMsg;
    } else if (location) {
        locTxt = JSON.stringify(location);
    }

    const [loaded, setLoadedState] = useState(false);

    const addPost = async (msg) => {

        console.log("adding post")

        var dbh = firebase.firestore();

        if(dbh == null){
            console.log("No databse connection");
            return;
        }
        
        await (async () => {
            var { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
    
            var location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                console.log("location found");

                dbh.collection("Posts").doc().set({
                    userID: firebase.auth().currentUser.uid,
                    message: msg,
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    altitude: location.coords.altitude
        
                });

                setLoadedState(false);
        })();

        

        console.log("done");
    }

    function GetPosts(){
    
        const dbh = firebase.firestore();
      
        if(dbh == null){
          console.log("No database connecttion");
          return <View><Text>no database</Text></View>;
        }
      
        dbh.collection("Posts").get().then(function(querySnapshot) {

            const postss = [];

            querySnapshot.forEach(function(doc) {

                var deltaLat = Math.abs(doc.data().latitude - location.coords.latitude);
                var deltaLon = Math.abs(doc.data().longitude - location.coords.longitude);

                postss.push({
                    id: doc.id,
                    userID: doc.data().userID,
                    message: doc.data().message,
                    distance: Math.sqrt(Math.pow(deltaLat, 2) + Math.pow(deltaLon, 2))
                });
            });

            setPosts(postss);
            setLoadedState(true);
        });

        
    }

    const [posts, setPosts] = useState([
    ]);

    const [postInput, setPostInput] = useState("");
    const [postButtonActive, setPostButtonState] = useState(false);
    const [started, startedState] = useState(false);
    
    if(started == false){
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
          })();
        startedState(true);
    }

    if(commentsOpened){
        return(
            <View style={styles.container}>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity style={styles.pictureBtn} onPress={() => setCommentsOpenedState(false) } >
                        <Image source={backBtn} style={{width:40, height:40}}/>
                    </TouchableOpacity>

                    <View style={styles.pictureBtn}>
                    </View>

                    <View style={styles.pictureBtn}> 
                    </View>
                </View>
                <CommentScreen post={openedPost} />
            </View>
            
        )
    }

    if(loaded == false){
        GetPosts();
        return(
            <Loading /> 
        )
    }
    else{
        return (
            <View style={styles.container}>
                <TopBar 
                    leftIcon={logo}
                    rightIcon={cog}
                    leftOnPress={2}
                />
                
                <View style={styles.container}>
                    <View style={{width: '100%'}}>
                        <TextInput style={{width: '90%', minHeight: 50, backgroundColor: '#eee', margin: 20, borderRadius: 10, padding: 10}} multiline placeholder="What are you up to?" onChangeText={(text) => {
                                setPostInput(text);
                                setPostButtonState(true);
                                console.log(text);
                                console.log(postInput);
                            }} />
                        <TouchableOpacity   style={{width: '90%', height: 50, backgroundColor: '#eee', marginHorizontal: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10}} 
                                            onPress={
                                                () => {
                                                    console.log(postInput);

                                                    setPostButtonState(false);
                                                    addPostHandler("text");
                                                }
                                            } 
                                            disabled={!postButtonActive}
                                            >
                            <Text>POST</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={posts.sort((a,b) => a.distance > b.distance ? 1: -1 )}
                        renderItem={({ item, index }) => 
                            <TouchableOpacity onPress={() => {
                                OpenPost(item);
                            }}>
                                {renderMessage(item,index)}
                            </TouchableOpacity>
                            
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }

    function renderMessage(item, index) {
    
        var style =  styles.messageBox;
    
        if(index % 2 == 0){
            style = [styles.messageBox, {backgroundColor: '#F8F9FE'}];
        }
        else{
            style = [styles.messageBox, {borderBottomWidth: 1, borderColor: '#eee'}];
        }
    
        return(
            <View style={style}>
                <Image style={styles.messagePic}/>
                <View style={styles.messageSubBox} >
                    <Text>{item.message}</Text>
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
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start' 
    },
    messagePic:{
        height: 100,
        width: 100,
        borderRadius:100,
        backgroundColor: '#000',
        marginRight:20
    }
});
