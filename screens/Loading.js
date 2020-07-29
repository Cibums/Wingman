
import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Loading() {

return (
    <View style={styles.centerContainer}>
        <ActivityIndicator size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
