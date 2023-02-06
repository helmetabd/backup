import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Block, Text, theme, Button } from "galio-framework";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { AppStyles } from "../AppStyles";
import localhostaddress from "../localhost";

const { width, height } = Dimensions.get("screen");

export default function Hospitals(props) {
  const { navigation } = props;
  const [hospitals, setHospitals] = useState([]);
  const dispatch = useDispatch();

  const fetchHospitals = async () => {
    axios.get(`${localhostaddress}:8081/api/hospital`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setHospitals(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchHospitals();
  }, [])

  const goToHospital = (data) => {
    dispatch({ type: 'SET_HOSP', payload: data })
    navigation.navigate("HospitalDetail", {
      id: data.id,
    });
  };
  
  const renderHospitals = ({ item }) => (
    // <Product doctor={item} horizontal />
    <Block card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback onPress={() => goToHospital(item)}>
          <Block flex center style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: item.image }} style={styles.fullImage} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToHospital(item)}>
          <Block flex space="between" style={styles.productDescription}>
            <Text bold size={14} style={styles.productTitle}>{item.name}</Text>
            {/* <Text size={14} style={styles.productTitle} >Rp. {item.price}</Text>
            <Text size={14} style={styles.productTitle} >Stocks: {item.stocks}</Text> */}
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
          <Text bold size={16} style={[styles.title, styles.leftTitle]}>List Hospital</Text>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BORDER_RADIUS }}>
              <FlatList vertical numColumns={1} data={hospitals} renderItem={renderHospitals} keyExtractor={(item) => `${item.id}`} />
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
      padding: 5,
      margin: 5
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
      paddingVertical: 10,
    },
    productTitleNew: {
      flex: 1,
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontWeight: "bold",
      fontSize: 14,
    },
    imageContainer: {
      elevation: 1,
    },
    fullImage: {
      height: 215,
      width: width - theme.SIZES.BASE * 3,
      borderRadius: 10
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
