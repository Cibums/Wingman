import { Ionicons } from '@expo/vector-icons';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, {useState} from 'react';
import { FlatList } from 'react-native-gesture-handler';

export default function SettingsModal(props) {

  const [visible, setVisability] = useState(true);

  return (
    <View style={styles.container} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer} >
          <TouchableOpacity style={styles.bg} onPress={() => setVisability(false)} ></TouchableOpacity>
          <View style={{backgroundColor: '#eee', width: 300, minHeight: 225, borderRadius: 5}} >
            <FlatList
              data={data}
              renderItem={({ item, index }) => 
                  <TouchableOpacity style={{width: '100%', height: 75, borderColor: '#ccc', borderBottomWidth: 1, justifyContent: 'center'}}>
                      <Text style={styles.label} >{item.message}</Text>
                  </TouchableOpacity>
              }
            />
          </View>
        </View>
        
      </Modal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      flexDirection: 'column',
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
  label:{
    margin: 10,
    width: 80
  },
})
