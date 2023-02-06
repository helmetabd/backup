import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Block, Text, theme, Button } from "galio-framework";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { AppStyles } from "../AppStyles";
import localhostaddress from "../localhost";

const { width, height } = Dimensions.get("screen");

export default function Medicines(props) {
  const { navigation } = props;
  const [medicines, setMedicines] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const fetchMedicines = async () => {
    axios.get(`${localhostaddress}:8081/api/medicine`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setMedicines(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchMedicines();
  }, [])

  const goToMedicine = (data) => {
    dispatch({ type: 'SET_MEDIC', payload: data })
    navigation.navigate("MedicineDetail", {
      id: data.id,
    });
  };

  const sendPrescript = () => {
    Alert.alert("Prescription send")
    navigation.navigate("Consultations")
  }
  
  const renderMedicines = ({ item }) => (
    // <Product doctor={item} horizontal />
    <Block card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback onPress={() => goToMedicine(item)}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: item.image }} style={styles.horizontalImage} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToMedicine(item)}>
          <Block flex space="between" style={styles.productDescription}>
            {/* <TextRN style={styles.productTitleNew}>{item.name}</TextRN> */}
            <Text bold size={14} style={styles.productTitle}>{item.name}</Text>
            <Text size={14} style={styles.productTitle} >Rp. {item.price}</Text>
            <Text size={14} style={styles.productTitle} >Stocks: {item.stocks}</Text>
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
          <Text bold size={16} style={[styles.title, styles.leftTitle]}>List Medicine</Text>
          <Block flex>
            <Block style={{ paddingHorizontal: theme.SIZES.BORDER_RADIUS }}>
              <FlatList vertical numColumns={2} data={medicines} renderItem={renderMedicines} keyExtractor={(item) => `${item.id}`} />
            </Block>
            <Block center>
              <Button round color={AppStyles.color.tint} onPress={() => {sendPrescript()}}>Send Prescription</Button>
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
