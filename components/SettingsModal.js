import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export default function SettingsModal(props) {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        }}
    >
        
    </Modal>
  );
}
