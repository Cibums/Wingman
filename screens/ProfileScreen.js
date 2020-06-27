import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import topBarPicture from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';
import backPicture from '../assets/images/backBtn.png';
import logo from '../assets/images/logo.png';
import Break from '../components/Break';

export default function ProfileScreen() {

const name = "Chris";
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
    <ScrollView style={styles.container}>
        <TopBar 
            leftIcon={backPicture}
            rightIcon={logo}
        />
        <FlatList 
          horizontal={true}
          data={DATA}
          renderItem={({item}) => 
          <View style={styles.picture}>
            <Image 
              style={styles.picture} 
              source={{uri: item.uri}}
            />
          </View>
          }
          keyExtractor={item => item.id}
        />
        <View style={styles.pictureIndicator}></View>
        <View style={styles.infoBar}>
        <Text>{name}</Text>
          <View style={{width:20, height:20}}></View>
        </View>
        
        <Break />

        <View style={styles.inputBox}>
          <Text style={styles.label}>About Me:</Text>
          <Text style={styles.inputLonger} > rågjrå gjkåoegjprogjrågjrå gjkåo </Text>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  picture:{
    width:400,
    height: 300
  },
  pictureIndicator:{
    height: 50
  },
  infoBar:{
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  inputBox:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  inputLonger:{
    backgroundColor: '#F0F1FD',
    minHeight:120,
    width:'100%',
    padding:10
  },
  label:{
    margin: 10,
    width: 80
  },
});
