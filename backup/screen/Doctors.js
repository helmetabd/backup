import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Block, Text, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { AppStyles } from "../AppStyles";

export default function Doctors(props) {
  const { navigation } = props;
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const fetchDoctors = async () => {
    axios.get(`http://192.168.1.5:8080/api/doctor`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data);
        setDoctors(data);
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
    fetchDoctors();
  }, [])

  const goToDoctor = (data) => {
    dispatch({ type: 'SET_DOCTOR', payload: data })
    navigation.navigate("Consultation");
  };
  
  const renderDoctors = ({ item }) => (
    // <Product doctor={item} horizontal />
    <Block row={true} card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback onPress={() => goToDoctor(item)}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: item.coverImage }} style={styles.horizontalImage} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToDoctor(item)}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{item.name}</Text>
            <Text size={14} >${item.specialist}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    // <TouchableHighlight underlayColor="rgba(128, 128, 128, 0.1)" onPress={() => goToDoctor(item)}>
    //   <View style={styles.container}>
    //     <View>
    //       <Image style={styles.photo} source={{ uri: item.coverImage }} />
    //       <View>
    //         <Text style={styles.title}>Dr. {item.name}</Text>
    //         <Text style={styles.title}>{item.specialist}</Text>
    //         <Text style={styles.title}>{item.age} years old</Text>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableHighlight>
  );

  return (
    <Block flex style={styles.group}>
      <Text bold size={16} style={styles.title}>List Doctor</Text>
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={doctors} renderItem={renderDoctors} keyExtractor={(item) => `${item.id}`} />
        </Block>
      </Block>
    </Block>
  );
}
  const { width, height } = Dimensions.get("window");
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
    title: {
      paddingVertical: theme.SIZES.BASE,
      paddingHorizontal: theme.SIZES.BASE * 2,
    },
    category: {
      marginTop: 5,
      marginBottom: 5
    },
    group: {
      paddingTop: theme.SIZES.BASE * 3.75,
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
      paddingBottom: 6,
    },
    imageContainer: {
      elevation: 1,
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
    },
  });
