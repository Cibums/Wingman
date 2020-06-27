import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';
import Break from '../components/Break';

import topBarPicture from '../assets/images/editIcon.png';
import doneBtn from '../assets/images/doneBtn.png';
import InformationDrop from '../components/InformationDrop';

export default function RegisterScreen() {

return (
    <View style={styles.container}>
        <TopBar 
            middleIcon={topBarPicture}
        />
        <ScrollView style={styles.container}>
            <InformationDrop 
                title="Before Gaming"
                info="egrgetheth"
                videos={
                    [
                        {
                            key: 'https://www.youtube.com/watch?v=5VLR1j6hg1E'
                        }
                    ]
                }
            />
            <InformationDrop 
                title="Opening"
                info="sdfghiuehf"
            />
            <InformationDrop 
                title="Testing"
                info="sdfghiuehf"
            />
            <InformationDrop 
                title="Making Value"
                info="sdfghiuehf"
            />
            <InformationDrop 
                title="Escalation"
                info="sdfghiuehf"
            />
            <InformationDrop 
                title="Closing"
                info="sdfghiuehf"
            />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
    },
});
