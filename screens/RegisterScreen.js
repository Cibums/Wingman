import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, Slider, ActivityIndicator } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';
import Break from '../components/Break';
import DropDownInput from '../components/DropDownInput';
import LocationDropDownInput from '../components/LocationDropDownInput';
import * as Location from 'expo-location';

import topBarPicture from '../assets/images/editIcon.png';
import backPicture from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import app from '../App';
import Loading from './Loading';
import App from '../App';

var dbh = null;
var storage = null;

RegisterScreen.username = "";
RegisterScreen.age = 18;
RegisterScreen.bio = "";
RegisterScreen.work = "";
RegisterScreen.location = "";
RegisterScreen.alcohol = false;
RegisterScreen.onlyMen = false;
RegisterScreen.civilState = "single";
RegisterScreen.latitude = 0.0;
RegisterScreen.longitude = 0.0;
RegisterScreen.minAge = 13;
RegisterScreen.maxAge = 100;
RegisterScreen.maxDistance = 20;
RegisterScreen.town = "Stockholm";
var pics = [];

const towns = [
    {
        key: 0,
        name: "Stockholm"
    },
    {
        key: 1,
        name: "Göteborg"
    },
    {
        key: 2,
        name: "Warszawa"
    },
    {
        key: 3,
        name: "Växjö"
    },
    {
        key: 4,
        name: "kjoepfjep"
    },
]

const civilStates = [
    {
        key: 0,
        name: "Single"
    },
    {
        key: 1,
        name: "Taken"
    },
    {
        key: 2,
        name: "Complicated"
    },
]

async function uploadImage(uri, index) {

    console.log("uploading");

    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(firebase.auth().currentUser.uid + "/image" + index + ".jpeg");
    return ref.put(blob);
}

const setMaxDistance = (value) => {
    RegisterScreen.maxDistance = value;
}

const setMinAge = (value) => {
    RegisterScreen.minAge = value;
}

const setMaxAge = (value) => {
    RegisterScreen.maxAge = value;
}

const setAge = (value) => {
    RegisterScreen.age = value;
}

const setAlcoholState = (value) => {
    RegisterScreen.alcohol = value;
}

const setOnlyMenState = (value) => {
    RegisterScreen.alcohol = value;
}

export default function RegisterScreen() {

    const [userInfo, setUserInfo] = useState({
        age: 0,
        alcohol: false,
        bio: "",
        civilState: "",
        location: "",
        maxAge: 100,
        maxDistance: 100,
        minAge: 0,
        username: "",
        onlyMen: false,
        town: "",
        work: ""
    });

    const [loaded, setLoadedState] = useState(false);

    function addUserInfo() {

        if(dbh == null || storage == null){
          return;
        }
      
        dbh.collection("UserInformation").doc(firebase.auth().currentUser.uid).set({
          name: RegisterScreen.username,
          age: RegisterScreen.age,
          bio: RegisterScreen.bio,
          work: RegisterScreen.work,
          latitude: RegisterScreen.latitude,
          longitude: RegisterScreen.longitude,
          alcohol: RegisterScreen.alcohol,
          onlyMen: RegisterScreen.onlyMen,
          civilState: RegisterScreen.civilState,
          minAge: RegisterScreen.minAge,
          maxAge: RegisterScreen.maxAge,
          maxDistance: RegisterScreen.maxDistance,
          town: RegisterScreen.town
        });
    

        uploadImages();
      
        app.changePage(2);
      
      };
      
      function uploadImages(){
          var i = 0;
      
          pics.forEach(element => {

            if(element.downloaded == false){
                uploadImage(element.uri, i);
            }
            i = i + 1;
          });
      };
      
      function updatePictures(index = 0){
          var ref = firebase.storage().ref().child(firebase.auth().currentUser.uid + "/image" + index + ".jpeg");
      
          // Delete the file
          ref.delete().then(function() {
              console.log("deleted files");
              updatePictures(index + 1);
          }).catch(function(error) {
              switch(error.code){
                  case 'storage/object-not-found':
                      uploadImages();
                      return;
              }
              console.log("couldn't delete. Error");
          });
      }
      
      function getPictures(index = 0){
          firebase.storage().ref(firebase.auth().currentUser.uid + "/image" + index + ".jpeg").getDownloadURL().then(function(url) {
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

    function GetProfile(){

        if(loaded == true){
          return;
        }
    
        const dbh = firebase.firestore();
      
        if(dbh == null){
          console.log("No database connecttion");
          return <View><Text>no database</Text></View>;
        }

        console.log(pictures);
      
        var docRef = dbh.collection("UserInformation").doc(firebase.auth().currentUser.uid.toString());
      
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserInfo({
                    age: doc.data().age,
                    alcohol: doc.data().alcohol,
                    bio: doc.data().bio,
                    civilState: doc.data().civilState,
                    location: doc.data().location,
                    maxAge: doc.data().maxAge,
                    minAge: doc.data().minAge,
                    username: doc.data().name,
                    onlyMen: doc.data().onlyMen,
                    town: doc.data().town,
                    work: doc.data().work,
                    maxDistance: doc.data().maxDistance
                });
                setLoadedState(true);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dbh.collection("UserInformation").doc(firebase.auth().currentUser.uid).set({
                    name: RegisterScreen.username,
                    age: RegisterScreen.age,
                    bio: RegisterScreen.bio,
                    work: RegisterScreen.work,
                    location: RegisterScreen.location,
                    alcohol: RegisterScreen.alcohol,
                    onlyMen: RegisterScreen.onlyMen,
                    civilState: RegisterScreen.civilState,
                    minAge: RegisterScreen.minAge,
                    maxAge: RegisterScreen.maxAge,
                    maxDistance: RegisterScreen.maxDistance,
                    town: RegisterScreen.town
                  });

                  setLoadedState(true);
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      }

    function setImage(i, downloaded = false){

        console.log("Setting Image...");

        if(pics.length === 0){
            pics = ([{
                id: i,
                downloaded: downloaded,
                uri: i
            }]);
        }
        else{
            pics.push({
                id: i,
                downloaded: downloaded,
                uri: i
            });
        }

        setPictures(pics);
    }

    async function _pickImage() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    dbh = firebase.firestore();
    storage = firebase.storage();

    const [maxDistanceSliderValue, setMaxDistanceSliderValue] = useState(0);
    const [minAgeSliderValue, setMinAgeSliderValue] = useState(0);
    const [maxAgeSliderValue, setMaxAgeSliderValue] = useState(0);
    const [ageSliderValue, setAgeSliderValue] = useState(0);
    const [alcoholValue, setAlcoholValue] = useState(false);
    const [onlyMenValue, setOnlyMenValue] = useState(false);
    const [town, setTown] = useState("");
    const [civilState, setCivilState] = useState("");
    const [pictures, setPictures] = useState([]);

    RegisterScreen.setTownHandler = (value) =>{
        console.log("setTownHandler");
        setTown(value);
        RegisterScreen.town = value;
    }

    RegisterScreen.setCivilStateHandler = (value) =>{
        console.log("setCivilStateHandler");
        setCivilState(value);
        RegisterScreen.civilState = value;
    }

    const renderPictures = () => {
        if(pictures.length == 0){
            return(
                <View style={{width: '100%', aspectRatio: 1}}>
                    <Image style={{flex: 1}} source={{uri: "https://bkc.nu/wp-content/uploads/2016/07/profile-placeholder-300x300.png"}} />
                </View>
            )
        }
        else{
            return(
                <FlatList 
                    horizontal={true}
                    data={pictures}
                    renderItem={({item}) => 
                    <Image source={{uri: item.uri}} style={styles.picture} />}
                    keyExtractor={item => item.id}
                />
            )
        }
    }

    const [startRun, setStartState] = useState(false);

    async function startMethod(){

        setPictures([]);
        pics = [];

        setAge(userInfo.age);
        setMinAge(userInfo.minAge);
        setMaxAge(userInfo.maxAge);
        setMaxDistance(userInfo.maxDistance);
        RegisterScreen.bio = userInfo.bio;
        RegisterScreen.username = userInfo.username;
        RegisterScreen.work = userInfo.work;
        RegisterScreen.alcohol = userInfo.alcohol;
        RegisterScreen.onlyMen = userInfo.onlyMen;

        getPictures();

            // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        storageRef.child(firebase.auth().currentUser.uid + '/image0.jpg').getDownloadURL().then(function(url) {
            // `url` is the download URL for ‘images/stars.jpg’
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;

            console.log(img);
        }).catch(function(error) {
            // Handle any errors
        });

        setStartState(true);
    }

    if(loaded == false || userInfo.name == ""){
        GetProfile();

        return(
            <Loading />
        )
        
    }
    else if(startRun == false){
        startMethod();
    }
    else{
        return (
            <View style={styles.container}>
                <TopBar 
                    leftIcon={backPicture}
                    middleIcon={topBarPicture}
                    rightIcon={logo}
                    rightOnPress={2}
                    leftOnPress={3}
                />
                
                <ScrollView style={styles.container}>
                    
                    {renderPictures()}
    
                    <TouchableOpacity style={styles.inputBoxPicker} onPress={() => _pickImage()}><Text style={styles.label}>Choose Image</Text></TouchableOpacity>
    
                    <View style={styles.pictureIndicator}></View>
                    
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput style={styles.input} defaultValue={userInfo.username} onChangeText={(username) => {RegisterScreen.username=username}} />
                    </View>
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Your Age:</Text>
                        <View style={[{flex:1, height: '100%', flexDirection: 'row'}, styles.label]}>
                            <Text style={{alignSelf: 'center', width: 50}}>{RegisterScreen.age} y/o</ Text>
                            <Slider style={{flex: 1}} step={1} minimumValue={0} maximumValue={100} onValueChange={ (value) => {
                                setAge(value);
                                setAgeSliderValue(value);
                            }} />
                        </View>
                    </View>
    
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>About Me:</Text>
                        <TextInput style={styles.inputLonger} defaultValue={userInfo.bio} onChangeText={(bio) => { RegisterScreen.bio = bio; }} />
                    </View>
    
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Job and education:</Text>
                        <TextInput style={styles.inputLonger} defaultValue={userInfo.work} onChangeText={(work) => {RegisterScreen.work = work;}} />
                    </View>
    
                    <Break />
    
                    <LocationDropDownInput title="Location" />
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Alcohol:</Text>
                        <Switch style={styles.label} value={alcoholValue} onValueChange={(value) => {
                            setAlcoholValue(value);
                            setAlcoholState(value);
                        }} />
                    </View>
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Only Men:</Text>
                        <Switch style={styles.label} value={onlyMenValue} onValueChange={(value) => {
                            setOnlyMenValue(value);
                            setOnlyMenState(value);
                        }} />
                    </View>
    
                    <DropDownInput title="Civil State" data={civilStates} variable="civilState" />
    
                    <Break />
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Minimum Age:</Text>
                        <View style={[{flex:1, height: '100%', flexDirection: 'row'}, styles.label]}>
                            <Text style={{alignSelf: 'center', width: 50}}>{RegisterScreen.minAge} y/o</ Text>
                            <Slider style={{flex: 1}} step={1} minimumValue={0} maximumValue={100} onValueChange={ (value) => {
                                setMinAge(value);
                                setMinAgeSliderValue(value);
                            }} />
                        </View>
                    </View>
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Maximum Age:</Text>
                        <View style={[{flex:1, height: '100%', flexDirection: 'row'}, styles.label]}>
                            <Text style={{alignSelf: 'center', width: 50}}>{RegisterScreen.maxAge} y/o</ Text>
                            <Slider style={{flex: 1}} step={1} minimumValue={0} maximumValue={100} onValueChange={ (value) => {
                                setMaxAge(value);
                                setMaxAgeSliderValue(value);
                            }} />
                        </View>
                    </View>
    
                    <View style={styles.inputBoxPicker}>
                        <Text style={styles.label}>Maximum Distance:</Text>
                        <View style={[{flex:1, height: '100%', flexDirection: 'row'}, styles.label]}>
                            <Text style={{alignSelf: 'center', width: 50}}>{RegisterScreen.maxDistance} km</ Text>
                            <Slider style={{flex: 1}} step={1} minimumValue={0} maximumValue={100} onValueChange={ (value) => {
                                setMaxDistance(value);
                                setMaxDistanceSliderValue(value);
                            }} />
                        </View>
                    </View>
    
                    <Break />
    
                </ScrollView>
    
                <View style={styles.doneView}>
                    <View></View>
                    <TouchableOpacity style={styles.doneBtn} onPress={() => addUserInfo()}>
                        <Image source={doneBtn} style={{width: 40, height: 40}}/>
                    </TouchableOpacity>
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
    picture:{
        height: 400,
        width: 400,
        aspectRatio:1
    },
    pictureIndicator:{
        height: 50
    },
    inputBox:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    input:{
        backgroundColor: '#F0F1FD',
        height:50,
        width:'100%',
        padding:10
    },
    inputLonger:{
        backgroundColor: '#F0F1FD',
        height:120,
        width:'100%',
        padding:10
    },
    doneView:{
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    label:{
        margin: 10,
        width: 80
    },
    inputBoxPicker:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F0F1FD',
        height: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    doneBtn:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
