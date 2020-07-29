import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox, Button } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import * as firebase from 'firebase';
import 'firebase/auth';

import logo from '../assets/images/logo.png';
import fbLoginBtn from '../assets/images/facebookLoginBtn.png';
import App from '../App';

export default function LoginScreen() {

  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

  const [checked, setCheckState] = useState(false);

  return (
    <View style={styles.container}>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />

        <View style={[styles.subContainer, {flexDirection: 'column-reverse'}] }>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.subContainer}>
            <TouchableOpacity style={[styles.input, styles.facebookBtn] } onPress={async () => {

                console.log("Facebook");

                await Facebook.initializeAsync(
                  '1141395156239145',
                );
             
                console.log("Initialized");

                const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                  { permissions: ['public_profile'] }
                );
             
                if (type === 'success') {
                  // Build Firebase credential with the Facebook access token.
                  const credential = firebase.auth.FacebookAuthProvider.credential(token);
             
                  // Sign in with credential from the Facebook user.
                  firebase.auth().signInWithCredential(credential).catch((error) => {
                    // Handle Errors here.
                  });
                }
            }} >
                <Image source={fbLoginBtn} style={{width:'100%', height: '100%'}} />
            </TouchableOpacity> 
            <View  style={[styles.input, styles.phoneInput, {flexDirection: 'row'}]} >
              <TextInput 
                style={{flex:1}} 
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} 
              />
              <TouchableOpacity 
                disabled={!phoneNumber}
                onPress={async () => {
                  // The FirebaseRecaptchaVerifierModal ref implements the
                  // FirebaseAuthApplicationVerifier interface and can be
                  // passed directly to `verifyPhoneNumber`.

                  if(checked){
                    try {
                      const phoneProvider = new firebase.auth.PhoneAuthProvider();
                      const verificationId = await phoneProvider.verifyPhoneNumber(
                        phoneNumber,
                        recaptchaVerifier.current
                      );
                      setVerificationId(verificationId);
                      showMessage({
                        text: "Verification code has been sent to your phone.",
                      });
                    } catch (err) {
                      showMessage({ text: `Error: ${err.message}`, color: "red" });
                    }
                  }
                }} 
                style={{width: 50, height: 50, backgroundColor: '#657EE8', borderRadius: 10}} 
              ></TouchableOpacity>
            </View>

            {renderVerificationCode()}
            
            <View style={[styles.input, styles.termsBox]}>
                <Text>Terms and conditions</Text>
                <CheckBox value={checked} onChange={() => setCheckState(!(checked))} />
            </View>
        </View>
    </View>
  );

  function renderVerificationCode(){

    if(verificationId){
      return(
        <View  style={[styles.input, styles.phoneInput, {flexDirection: 'row'}]} >
          <TextInput 
            style={{flex:1}} 
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity 
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                showMessage({ text: "Phone authentication successful 👍" });
                console.log("Phone authentication successful 👍");
                console.log("Logged in id" + firebase.auth().currentUser.uid);
                App.changePage(1);
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
              }
            }}
            style={{width: 50, height: 50, backgroundColor: '#657EE8', borderRadius: 10}} 
          ></TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View></View>
      )
    }

    
  }
  
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
    paddingLeft: 10
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
