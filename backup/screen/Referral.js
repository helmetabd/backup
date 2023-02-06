import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Block, Text, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppStyles } from "../AppStyles";
import localhostaddress from "../localhost";

const { width, height } = Dimensions.get("screen");

export default function Referral(props) {
  const { navigation, route } = props;
  const dataConsult = useSelector(state => state.dataConsult)
  const [referral, setReferral] = useState({});
  const dispatch = useDispatch();
  const dataReferral = useSelector(state => state.dataRefer);
  const dataPatient = useSelector(state => state.dataPatient);
  const { id } = route.params;

  const fetchReferral = async () => {
    axios.get(`${localhostaddress}:8080/api/referral/${id}`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setReferral(data);
        dispatch({ type: 'SET_PATIENT', payload: data.patient.patientDetail })
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchReferral();
  }, [])

  const goToDoctor = () => {
    // dispatch({ type: 'SET_DOCTOR', payload: data })
    // navigation.navigate("Consultation");
    Alert.alert("Copy")
  };
  
  const convertDate = (date) => {
    const newDate = new Date(date);
    const parseDate = newDate.toDateString().split(' ').slice(1);
    const finalDate = `${parseDate[1]} ${parseDate[0]} ${parseDate[2]}`;
    // console.log(newDate);
    return finalDate;
    // return console.log(date);
  }

  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}>
        <Block flex style={styles.group}>
          <Text bold size={16} style={[styles.title, styles.leftTitle]}>List Medicine</Text>
          <Text bold size={16} style={[styles.title, styles.leftTitle]}>Doctor: {dataConsult.doctor.doctorDetail.name}</Text>
          <Text bold size={16} style={[styles.title, styles.leftTitle]}>Patient: {dataConsult.patient.patientDetail.name}</Text>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block card flex style={[styles.product, styles.shadow]}>
                  <Block flex style={[styles.imageContainer, styles.shadow]}>
                    <Image source={{ uri: referral.hospital.image }} style={styles.horizontalImage} />
                  </Block>
                  <Block flex space="between" style={styles.productDescription}>
                    <Text bold size={14} style={styles.productTitle}>{referral.hospital.name}</Text>
                    <Text size={14} style={styles.productTitle} >{referral.hospital.address}</Text>
                    <Text size={14} style={styles.productTitle} >{ convertDate(referral.referralDate) }</Text>
                  </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}
  
  const SCREEN_WIDTH = width < height ? width : height;
  const numColumns = 2;
  const ITEM_HEIGHT = 150;
  const ITEM_MARGIN = 20;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: ITEM_MARGIN,
      marginTop: 20,
      width: (SCREEN_WIDTH - (numColumns + 1) * ITEM_MARGIN) / numColumns,
      height: ITEM_HEIGHT + 75,
      borderColor: AppStyles.color.tint,
      borderWidth: 1,
      borderRadius: 15
    },
    photo: {
      width: (SCREEN_WIDTH - (numColumns + 1) * ITEM_MARGIN) / numColumns,
      height: ITEM_HEIGHT,
      borderRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    // title: {
    //   paddingVertical: theme.SIZES.BASE,
    //   paddingHorizontal: theme.SIZES.BASE * 2,
    // },
    category: {
      marginTop: 5,
      marginBottom: 5
    },
    group: {
      paddingTop: theme.SIZES.BASE * 0.5,
    },
    product: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE,
      borderWidth: 0,
      minHeight: 114,
    },
    shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    },
    productTitle: {
      flex: 1,
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      paddingVertical: 10
    },
    imageContainer: {
      elevation: 1,
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
      borderRadius: 10
    },
    components: {
      width: width
    },
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
  });
