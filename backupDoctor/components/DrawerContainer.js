import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MenuButton from '../components/MenuButton';
import { AppIcon, AppStyles } from '../AppStyles';
import { useDispatch } from 'react-redux';
import { Button } from 'galio-framework';

export default function DrawerContainer({navigation}) {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
        await AsyncStorage.removeItem('Authorization');
        dispatch({ type: 'SET_LOGOUT'});
    } catch(err) {
        console.log(err)
        Alert.alert('Something went wrong')
    }
  }
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Profile Settings"
          icon="user"
          onPress={() => {navigation.navigate("AddProfile")}}
        />
        {/* <MenuButton
          title="Image"
          icon="picture"
          onPress={() => {navigation.navigate("Image")}}
        /> */}
        <MenuButton
          title="Logout"
          icon="logout"
          onPress={() => {logout()}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});
