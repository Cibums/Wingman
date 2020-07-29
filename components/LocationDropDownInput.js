import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox, Button, Modal } from 'react-native';
import { RectButton, ScrollView, TextInput, FlatList } from 'react-native-gesture-handler';

import SettingsModal from '../components/SettingsModal';

import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

import btnIcon from '../assets/images/backBtn.png'
import RegisterScreen from '../screens/RegisterScreen';
import Loading from '../screens/Loading';

export default function LocationDropDownInput(props) {

    const [location, setLocation] = useState(null);
    const [chosenIndex, setIndex] = useState(0);
    const [locationData, setLocationData] = useState({});

    if(location == null){
        UpdateLocation(); 
    }

    return (
        <View>
            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>{props.title}:</Text>
                <TouchableOpacity style={{flexDirection: 'row', flex:1}} onPress={() => {
                    setLocation(null);
                    UpdateLocation();
                }} >
                    <View style={styles.dropDown}>
                        {renderLocationText()}
                    </View>
                    <View style={styles.dropDownButton}><Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Icon_-_Update.svg/1024px-Icon_-_Update.svg.png"}} style={styles.dropDownButton} /></View>
                </TouchableOpacity>
            </View>
            
        </View>
    );

    function renderLocationText() {

        if(location == null){
            return(
                <Text style={styles.placeholder}>Waiting.. </Text>
            )
        }
        else{
            /*fetch('https://api.opencagedata.com/geocode/v1/json?q='+ location.coords.latitude +'+'+ location.coords.longitude +'&key=f66a6844b24348a0960a9c330948d371', {
                method: 'GET'
                //Request Type 
            })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success 

                setLocationData(responseJson);

                console.log(locationData);
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                console.error(error);
            });*/

            return(
                <Text style={styles.placeholder}>{location.coords.latitude} {location.coords.longitude}</Text>
            )  
        }
    }

    function UpdateLocation(){

        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            RegisterScreen.latitude = location.coords.latitude;
            RegisterScreen.longitude = location.coords.longitude;
        })();
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
    label:{
        margin: 10,
        width: 80
    },
    placeholder:{
        margin: 10,
        color: '#C9CAD8',
    },
    inputBoxPicker:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F0F1FD',
        height: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    dropDown:{
        flex:1,
        height: '100%',
        justifyContent: 'center',
    },
    dropDownButton:{
        alignSelf: 'center',
        height: 30,
        width: 30,
        marginHorizontal: 10
    },
    modalContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bg: {
        backgroundColor: '#000',
        opacity: 0.5,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
});
