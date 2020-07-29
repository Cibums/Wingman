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

export default function CommentScreen(props) {

    async function Comment(cmnt){
        console.log("adding comment")

        var dbh = firebase.firestore();

        if(dbh == null){
            console.log("No databse connection");
            return;
        }

        dbh.collection("Comments").doc().set({
            userID: firebase.auth().currentUser.uid,
            message: cmnt,
            postID: props.post.id

        });

        setCommentsLoadedState(false);
        console.log("done");
    }

    function GetComments(){
    
        const dbh = firebase.firestore();
      
        if(dbh == null){
          console.log("No database connecttion");
          return <View><Text>no database</Text></View>;
        }
      
        dbh.collection("Comments").get().then(function(querySnapshot) {

            const commentss = [];

            querySnapshot.forEach(function(doc) {

                if(doc.data().postID == props.post.id){
                    commentss.push({
                        id: doc.id,
                        userID: doc.data().userID,
                        message: doc.data().message
                    });
                }
            });

            setComments(commentss);
            setLoadedState(true);
        });

        
    }

    const [loaded, setLoadedState] = useState(false);

    const [comments, setComments] = useState([
    ]);

    const [commentInput, setCommentInput] = useState("");
    const [commentButtonActive, setCommentButtonState] = useState(false);

    if(loaded == false){
        GetComments();
        return(
            <Loading /> 
        )
    }
    else{
        return (
            <View style={styles.container}>
                
                <View style={styles.container}>


                    

                    <View style={[styles.messageBox, {backgroundColor: '#F8F9FE'}]}>
                        <Image style={styles.messagePic}/>
                        <View style={styles.messageSubBox} >
                            <Text>{props.post.message}</Text>
                        </View>
                    </View>

                    

                    <FlatList 
                        data={comments}
                        renderItem={({ item, index }) => 
                            <View style={[styles.messageBox, {height:100, borderTopWidth: 1, borderColor: '#eee'}]}>
                                <View style={styles.messageSubBox} >
                                    <Text>Namn</Text>
                                    <Text>{item.message}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />

                    <View style={{width: '100%', flexDirection: 'row', backgroundColor: 'white', backgroundColor: '#F8F9FE', padding: 20}}>
                        <View style={{flex: 1}}><TextInput style={{height: 50, backgroundColor: '#eee',borderRadius: 10}} onChangeText={(text) => setCommentInput(text)} /></View>
                        <TouchableOpacity style={{width: 100, height: 50, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginLeft: 10}} onPress={() =>{
                            Comment(commentInput);
                            setLoadedState(false);
                        }} >
                            <Text>COMMENT</Text>
                        </TouchableOpacity>
                    </View>
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
