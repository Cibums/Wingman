import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import logo from '../assets/images/logo.png';
import fbLoginBtn from '../assets/images/facebookLoginBtn.png';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <View style={[styles.subContainer, {flexDirection: 'column-reverse'}] }>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.subContainer}>
            <TouchableOpacity style={[styles.input, styles.facebookBtn]} >
               <Image source={fbLoginBtn} style={{width:'100%', height: '100%'}} />
            </TouchableOpacity> 
            <TextInput style={[styles.input, styles.phoneInput]} placeholder='Phone Number' textContentType='telephoneNumber' keyboardType='phone-pad' />
            <View style={[styles.input, styles.termsBox]}>
                <Text>Terms and conditions</Text>
                <CheckBox />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly'
  },
  subContainer: {
    flex: 1,
    margin: '10%',
    alignItems: 'center',
  },
  logo:{
    width:'130%',
    height:'130%',
    aspectRatio: 1,
  },
  input:{
      width:'100%',
      height: 50,
      marginBottom: 30,
      borderRadius: 5, 
  },
  phoneInput:{
    backgroundColor: '#E7E8FD',
    paddingHorizontal: 10
  },
  termsBox:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  facebookBtn:{
    borderRadius: 0,
  }
});
