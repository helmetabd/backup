import React from 'react';
import {View, StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const DefaultImage = () => {
    return (
        <View style={styles.container}>
            <FontAwesome5 name="user" size={40} color="black"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2, 
        borderColor: "black", 
        width: 150, 
        height: 150, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center'}
})

export default DefaultImage;
