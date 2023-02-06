import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import NumericInput from 'react-native-numeric-input'
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile({navigation}) {
  
  const dispatch = useDispatch();
  const dataMedic = useSelector(state => state.dataMedic);
  const [medicine, setMedicine] = useState({});
  const [quantity, setQuantity] = useState(0);

  const fetchMedicine = async () => {
    axios.get(`${localhostaddress}:8080/api/medicine/${dataMedic.id}`, { 
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

  const addCart = async (id, quantity) => {
    try {
      let { data } = await axios.post(`${localhostaddress}:8080/api/add-to-cart`, 
      { medicineId: id, quantity: quantity }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: await AsyncStorage.getItem("Authorization")
      },
    });
    dispatch({ type: 'ADD_CART', payload: data })
    } catch (error) {
      console.log(err);
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
              {/* <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>Rachel Brown</Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">Pro</Text>
                    </Block>
                    <Text color="white" size={16} muted style={styles.seller}>Seller</Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                    </Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                      {` `} Los Angeles, CA
                      </Text>
                  </Block>
                </Block>
              </Block> */}
              {/* <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} /> */}
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block center style={{ margin: 25, marginTop: 20 }}>
              <Text size={28} bold color='black' style={styles.infoRecipeName}>{item.title}</Text>
            </Block>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{medicine.stocks}</Text>
                <Text muted size={12}>Stocks: </Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{medicine.price}</Text>
                <Text muted size={12}>Price: </Text>
              </Block>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              {/* <Block row space="between" style={{ flexWrap: 'wrap' }} >
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={{ uri: img }}
                    key={`viewed-${img}`}  
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block> */}
              <Block>
                <NumericInput value={quantity} onChange={value => setQuantity({value})} />
                <Button onPress={() => addCart(medicine.id, quantity)}>Add to cart</Button>
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
    margin: 10,
    textAlign: 'center'
  }
});
