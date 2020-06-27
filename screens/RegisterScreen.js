import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';
import Break from '../components/Break';

import topBarPicture from '../assets/images/editIcon.png';
import backPicture from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';

import * as firebase from 'firebase';
import 'firebase/firestore';

const dbh = firebase.firestore();

var userID = "asdfghjk";
var name = "";
var age = 20;
var bio = "";
var work = "";
var location = "";
var alcohol = false;
var onlyMen = false;
var civilState = "single";
var minAge = 13;
var maxAge = 100;
var maxDistance = 20;
var town = "Stockholm";

function addUserInfo() {
  dbh.collection("UserInformation").doc(userID).set({
    name: name,
    age: age,
    bio: bio,
    work: work,
    location: location,
    alcohol: alcohol,
    onlyMen: onlyMen,
    civilState: civilState,
    minAge: minAge,
    maxAge: maxAge,
    maxDistance: maxDistance,
    town: town
  });
};

export default function RegisterScreen() {

const DATA = 
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

return (
    <View style={styles.container}>
        <TopBar 
            leftIcon={backPicture}
            middleIcon={topBarPicture}
            rightIcon={logo}
        />
        <ScrollView style={styles.container}>
            <FlatList 
                horizontal={true}
                data={DATA}
                renderItem={({item}) => 
                <Image source={{uri: item.uri}} style={styles.picture} />}
                keyExtractor={item => item.id}
            />
            <View style={styles.pictureIndicator}></View>
            
            <View style={styles.inputBox}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} onChangeText={(username) => {name=username}} />
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Age:</Text>
                <Button title='pick age' />
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.label}>About Me:</Text>
                <TextInput style={styles.inputLonger} />
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.label}>Job and education:</Text>
                <TextInput style={styles.inputLonger} />
            </View>

            <Break />

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Location:</Text>
                <Button title='pick location' />
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Alcohol:</Text>
                <Switch style={styles.label} />
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Gender: Only men</Text>
                <Switch style={styles.label} />
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Civil State:</Text>
                <Button title='pick civil state' />
            </View>

            <Break />

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Age Range:</Text>
                <View style={[{flex:1, backgroundColor: '#ccc', height: '100%'}, styles.label]}></View>
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Distance:</Text>
                <View style={[{flex:1, backgroundColor: '#ccc', height: '100%'}, styles.label]}></View>
            </View>

            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>Choose Town:</Text>
                <Button title='pick town' />
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
    picture:{
        height: 300,
        width: 300,
        aspectRatio:1
    },
    pictureIndicator:{
        height: 50
    },
    inputBox:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    input:{
        backgroundColor: '#F0F1FD',
        height:50,
        width:'100%',
    },
    inputLonger:{
        backgroundColor: '#F0F1FD',
        height:120,
        width:'100%',
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
