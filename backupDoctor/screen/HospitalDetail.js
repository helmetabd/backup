import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Alert, StatusBar } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

import NumericInput from 'react-native-numeric-input'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import localhostaddress from "../localhost";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStyles } from '../AppStyles';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));

export default function HospitalDetail({navigation, route}) {
  
  const dispatch = useDispatch();
  const dataMedic = useSelector(state => state.dataMedic);
  const dataDiagnose = useSelector(state => state.dataDiagnose);
  const [hospital, setHospital] = useState({});
  const { id } = route.params;

  const fetchHospital = async () => {
    axios.get(`${localhostaddress}:8081/api/hospital/${id}`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setHospital(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchHospital();
  }, [])

  const addReferral = async (id) => {
    try {
      let { data } = await axios.post(`${localhostaddress}:8081/api/referral`, 
      { hospitalId: id, diagnoseId: dataDiagnose.id }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization")
      },
    });
    // dispatch({ type: 'ADD_CART', payload: data })
    Alert.alert("Added");
    navigation.navigate("Consultations");
    } catch (error) {
      console.log(err);
      Alert.alert('Something went wrong')
    }
  };

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: hospital.image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex shadow shadowColor="red" style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block center style={{ margin: 25, marginTop: 20 }}>
              <Text size={25} bold style={styles.infoRecipeName}>{hospital.name}</Text>
            </Block>
            <Block space="evenly" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text muted size={16}>Address: </Text>
                <Text bold size={16} style={{marginBottom: 8}}>{hospital.address}</Text>
              </Block>
              <Block middle>
                <Text muted size={16}>Description: </Text>
                <Text bold size={16} style={{marginBottom: 8}}>{hospital.description}</Text>
              </Block>
            </Block>
            {/* <Block style={{ paddingBottom: -HeaderHeight * 2 }}> */}
            <Block style={{ paddingBottom: 150 }}>
              <Block center>
                <Button round color={AppStyles.color.tint} onPress={() => addReferral(hospital.id)}>Add To Referral</Button>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
    paddingBottom: 20
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderColor: theme.COLORS.BLACK,
    borderWidth: 2,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  infoRecipeName: {
    margin: 5,
    padding: 5,
    textAlign: 'center'
  }
});
