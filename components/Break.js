import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, CheckBox } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';


export default function Break() {
  return (
    <View style={styles.container}>
        <View style={{width:'100%', height:5, backgroundColor: '#F4E5EA'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
});
