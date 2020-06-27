
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import backBtn from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';

export default function TopBar(props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.pictureBtn} onPress={() => props.leftOnPress} >
                <Image source={props.leftIcon} style={{width:40, height:40}}/>
            </TouchableOpacity>

            <View style={styles.pictureBtn}>
                <Image source={props.middleIcon} style={{width:40, height:40}}/>
            </View>

            <TouchableOpacity style={styles.pictureBtn} onPress={() => props.rightOnPress} > 
                <Image source={props.rightIcon} style={{width:40, height:40}}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  pictureBtn:{
      alignItems: 'center',
      justifyContent: 'center',
      margin:10
  }
});
