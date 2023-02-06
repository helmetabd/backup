import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Block, Button, Text, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppStyles } from "../AppStyles";
import localhostaddress from "../localhost";

const { width, height } = Dimensions.get("screen");

export default function Consultations(props) {
  const { navigation } = props;
  const [consultations, setConsultations] = useState([]);
  const dispatch = useDispatch();

  const fetchConsultations = async () => {
    axios.get(`${localhostaddress}:8080/api/consult`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setConsultations(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchConsultations();
  }, [])

  const goToConsultation = (data) => {
    dispatch({ type: 'SET_CONSULT', payload: data })
    dispatch({ type: 'SET_DOCTOR', payload: data.doctor })
    navigation.navigate("Consultation Detail");
  };
  
  const renderConsultation = ({ item }) => (
    // <Product doctor={item} horizontal />
    <Block row={true} card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback onPress={() => goToConsultation(item)}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: item.doctor.doctorDetail.coverImage }} style={styles.horizontalImage} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToConsultation(item)}>
          <Block flex space="between" style={styles.productDescription}>
            <Text bold size={14} style={styles.productTitle}>Dr. {item.doctor.doctorDetail.name}</Text>
            <Text size={14} style={styles.productTitle} >Specialist {item.doctor.doctorDetail.specialist}</Text>
            <Block row>
              <Text size={12} style={styles.productTitle}>{item.subject}</Text>
              <Text size={12} color={(item.status === "PROGRESS") ? theme.COLORS.PRIMARY : (item.status === "COMPLETED") ? "#45DF31" : theme.COLORS.TWITTER} 
                style={styles.statusTitle}
              >{item.status}</Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
  );

  return (
    <Block flex center>
      <ScrollView
        style={styles.components}
        showsVerticalScrollIndicator={false}>
        <Block flex style={styles.group}>
          <Block row space="between">
            <Text bold size={16} style={[styles.title, styles.leftTitle]}>List Consultation</Text>
            <Button onlyIcon onPress={() => fetchConsultations()} icon="reload1" iconFamily="antdesign" iconSize={14} color={AppStyles.color.tint} iconColor="black" style={{marginTop: 20, marginRight: 20}}></Button>
          </Block>
          <Text bold size={12} style={[styles.titleConsultation, styles.leftTitle]}>{consultations.length} Consultation</Text>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <FlatList vertical numColumns={1} data={consultations} renderItem={renderConsultation} keyExtractor={(item) => `${item.id}`} />
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
    statusTitle: {
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
    titleConsultation: {
      fontSize: AppStyles.fontSize.content,
      fontWeight: 'bold',
      color: AppStyles.color.categoryTitle,
      marginTop: 20,
      marginBottom: 5,
    },
    leftTitle: {
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 20,
    },
  });
