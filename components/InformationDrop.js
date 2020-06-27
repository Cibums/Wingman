import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import * as Linking from 'expo-linking';

export default function InformationDrop(props) {

    const [tabState, setTabState] = useState(false);

    return (
        <View style={{marginBottom: 30}}>
            <TouchableOpacity style={styles.titleButton} onPress={() => setTabState(!tabState)} >
                <Text style={styles.label}>{props.title}</Text>
            </TouchableOpacity>
            <View>
                {renderInformation(tabState, props.info, props.videos)}
            </View>
        </View>
    );
}

const renderInformation = (state, info, v) =>{
    if(state){
        return(
            <View style={styles.infoBox}>
                <Text style={{fontSize: 15}}>{info}</Text>
                <View style={styles.videoTabs}>
                    {renderVideos(v)}
                </View>
            </View>
        )
    }
}

const renderVideos = (v) => {

    if(v == null){
        return;
    }

    return v.map((video) => {
        return (
            <TouchableOpacity key={video.key} style={styles.videoTab} onPress={() => Linking.openURL(video.key)} ><Text style={styles.label} >Video</Text></TouchableOpacity>
        )
    })
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
    label:{
        margin: 10,
        fontSize: 18
    },
    titleButton:{
        width: '100%',
        height:75,
        backgroundColor: '#F0F1FD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoBox:{
        width: '100%',
        padding:20,
        backgroundColor: '#F7F7FF'
    },
    videoTabs:{
        width:'100%',
        minHeight: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videoTab:{
        width: 120,
        height:60,
        backgroundColor: '#52955A',
        borderRadius:7,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
