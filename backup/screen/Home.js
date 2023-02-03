import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Block, Button } from "galio-framework"
import { AppStyles } from '../AppStyles';

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const dataProfile = useSelector(state => state.dataProfile)

    const fetchProfile = async () => {
        axios.get(`http://192.168.1.5:8080/api/patient`, { 
            headers:{
                "Content-Type": "application/json",
                Authorization: await AsyncStorage.getItem('Authorization')
            }
        })
        .then(({ data }) => {
            console.log(data)
            dispatch({ type: 'SET_DATA', payload: data })
            dispatch({ type: 'SET_PROFILE'});
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Something went wrong')
        });
        console.log(dataProfile)
    }

    useEffect(() => {
        fetchProfile();
    }, [])

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
        <Block safe>
            <Text style={[styles.title, styles.leftTitle]}>Welcome back {dataProfile.name}</Text>
            <Button round shadowless size='small' color={AppStyles.color.tint} onPress={logout}>Logout</Button>
        </Block>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 5,
      },
      leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
      },
})

export default Home;
