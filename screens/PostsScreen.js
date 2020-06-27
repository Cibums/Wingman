import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { RectButton, ScrollView, FlatList, TextInput, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import TopBar from '../components/TopBar';

import topBarPicture from '../assets/images/logo.png';
import doneBtn from '../assets/images/doneBtn.png';

export default function PostScreen() {

const posts = [
    {
        id: 0,
        userID: "",
        message: "thjjyrjr"
    },
    {
        id: 1,
        userID: "",
        message: "rgrgrh"
    },
    {
        id: 2,
        userID: "",
        message: "wqert"
    },
]

return (
    <View style={styles.container}>
        <TopBar 
            picture={topBarPicture}
        />
        <View style={styles.container}>
            <FlatList 
                data={posts}
                renderItem={({ item, index }) => 
                    <View>
                        {renderMessage(item, index)}
                    </View>
                }
                keyExtractor={item => item.id}
            />
        </View>
    </View>
  );
}

const renderMessage = (item, index) => {

    var style =  styles.messageBox;

    if(index % 2 == 0){
        style = [styles.messageBox, {backgroundColor: '#F8F9FE'}];
    }

    return(
        <View style={style}>
            <Image style={styles.messagePic} source={topBarPicture}/>
            <View style={styles.messageSubBox} >
                <Text>{item.message}</Text>
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
        marginVertical: 20,
    },
    messageBox:{
        flexDirection: 'row',
        alignItems: 'center',
        height:150,
        width:'100%',
        justifyContent: 'flex-start',
        padding:20
    },
    messageSubBox:{
        flex:1,
        height:'100%',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start' 
    },
    messagePic:{
        height: 100,
        width: 100,
        borderRadius:100,
        backgroundColor: '#000',
        marginRight:20
    }
});
