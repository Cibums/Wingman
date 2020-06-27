import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import topBarPicture from '../assets/images/logo.png';
import editIcon from '../assets/images/editIcon.png';
import doneBtn from '../assets/images/doneBtn.png';
import Break from '../components/Break';

export default function OwnProfileScreen() {

const name = "Chris";

return (
    <View style={{flex:1}}>
        <TopBar 
            picture={topBarPicture}
        />
        <View style={styles.container} >
            <Image style={styles.picture} source={{uri: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'}} />
            <View style={{maxWidth: 100, alignItems: 'center'}}>
                <Text style={styles.label}>{name}</Text>
                <Text>Information</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity>
                    <Image style={styles.editBtn} source={editIcon} />
                </TouchableOpacity>
                <Text>Edit Profile</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    marginVertical: 100,
    flex:1
  },
  picture:{
    width:250,
    height: 250,
    borderRadius: 150
  },
  label:{
    margin: 10,
    fontSize: 18
  },
  editBtn:{
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    borderWidth:1, 
    borderColor: '#eee'
  }
});
