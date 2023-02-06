import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, SafeAreaView, Alert, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Block, Button, theme } from "galio-framework"
import { AppStyles } from '../AppStyles';
import localhostaddress from '../localhost';

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const dataProfile = useSelector(state => state.dataProfile);
    const isProfile = useSelector(state => state.isProfile);


    const fetchProfile = async () => {

        if(!dataProfile){
            
            navigation.navigate("AddProfile");

        } else{

            axios.get(`${localhostaddress}:8081/api/doctor`, { 
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
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <Block safe center>
            <Text style={[styles.title, styles.leftTitle]}>Welcome back Dr. {dataProfile.name}</Text>
            <Block center style={styles.shadow}>
                <Image source={{uri: dataProfile.coverImage}} style={styles.horizontalImage} />
            </Block>
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
        textAlign: 'center',
        // marginLeft: 20,
      },
      shadow: {
        marginTop: 10,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
      },
      horizontalImage: {
        height: 150,
        width: 150,
        borderRadius: 10,
      },
})

export default Home;
