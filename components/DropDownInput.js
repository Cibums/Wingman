import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox, Button, Modal } from 'react-native';
import { RectButton, ScrollView, TextInput, FlatList } from 'react-native-gesture-handler';

import SettingsModal from '../components/SettingsModal';

import * as Linking from 'expo-linking';

import btnIcon from '../assets/images/backBtn.png'
import RegisterScreen from '../screens/RegisterScreen';

export default function DropDownInput(props) {

    const [visible, setVisability] = useState(false);
    const [chosenIndex, setIndex] = useState(0);

    function onModalClosed(index){
        setVisability(false);
        setIndex(index);
        
        switch(props.variable){
            case "town":
                RegisterScreen.setTownHandler(props.data[index].name);
                console.log("town response");
                break;
            case "civilState":
                //RegisterScreen.civilState = props.data[chosenIndex].name;
                RegisterScreen.setCivilStateHandler(props.data[index].name);
                console.log("civil state response");
                break;
            default:
                console.log("default response");
                break;
        }
    }

    return (
        <View>
            <View style={styles.inputBoxPicker}>
                <Text style={styles.label}>{props.title}:</Text>
                <TouchableOpacity style={{flexDirection: 'row', flex:1}} onPress={() => setVisability(true)} >
                    <View style={styles.dropDown}>
                        <Text style={styles.placeholder}>{props.data[chosenIndex].name}</Text>
                    </View>
                    <View style={styles.dropDownButton}><Image source={btnIcon} style={{width:50, height:50}} /></View>
                </TouchableOpacity>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modalContainer} >
                        <TouchableOpacity style={styles.bg} onPress={() => setVisability(false)} ></TouchableOpacity>
                        <View style={{backgroundColor: '#eee', width: 300, minHeight: 225, maxHeight: 300, borderRadius: 5}} >
                            <FlatList
                            data={props.data}
                            renderItem={({ item, index }) => 
                                <TouchableOpacity onPress={() => onModalClosed(index)} style={{width: '100%', height: 75, borderColor: '#ccc', borderBottomWidth: 1, justifyContent: 'center'}}>
                                    <Text style={styles.label} >{item.name}</Text>
                                </TouchableOpacity>
                            }
                            />
                        </View>
                    </View>
                    
                </Modal>
            </View>
            
        </View>
    );
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
        height: 50,
        width: 50
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
