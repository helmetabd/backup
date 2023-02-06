import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Alert, StatusBar } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';

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

export default function MedicineDetail({navigation, route}) {
  
  const dispatch = useDispatch();
  const dataMedic = useSelector(state => state.dataMedic);
  const dataDiagnose = useSelector(state => state.dataDiagnose);
  const [medicine, setMedicine] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [dossage, setDossage] = useState("");
  const { id } = route.params;

  const fetchMedicine = async () => {
    axios.get(`${localhostaddress}:8081/api/medicine/${id}`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setMedicine(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchMedicine();
  }, [])

  const addPrescript = async (id, quantity) => {
    try {
      let { data } = await axios.post(`${localhostaddress}:8081/api/add-to-prescription`, 
      { medicineId: id, quantity: quantity, dossage: dossage, diagnoseId: dataDiagnose.id}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization")
      },
    });
    // dispatch({ type: 'ADD_CART', payload: data })
    Alert.alert("Added");
    navigation.navigate("Medicines");
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong')
    }
  };

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: medicine.image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex shadow shadowColor="red" style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block center style={{ margin: 25, marginTop: 20 }}>
              <Text size={28} bold style={styles.infoRecipeName}>{medicine.name}</Text>
            </Block>
            <Block row space="evenly" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={16} style={{marginBottom: 8}}>{medicine.stocks}</Text>
                <Text muted size={16}>Stocks: </Text>
              </Block>
              <Block middle>
                <Text bold size={16} style={{marginBottom: 8}}>{medicine.price}</Text>
                <Text muted size={16}>Price: </Text>
              </Block>
            </Block>
            <Block style={{ paddingBottom: 200 }}>
              <Block center>
                <Input
                  rounded
                  type='default'
                  placeholder="Dossage"
                  bgColor='transparent'
                  style={styles.InputContainer}
                  onChangeText={setDossage}
                  value={dossage}
                />
                <NumericInput value={quantity} onChange={value => setQuantity(value)} />
                <Button round color={AppStyles.color.tint} onPress={() => addPrescript(medicine.id, quantity)}>Add to Prescription</Button>
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
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
  },
});
