import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');
const navigation = useNavigation();
const dispatch = useDispatch();

const Product = ({ doctor, horizontal, full, style, priceColor, imageStyle }) => {

    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];

    const goToDoctor = (data) => {
      dispatch({ type: 'SET_DOCTOR', payload: data })
      navigation.navigate("Consultation");
    };

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => goToDoctor(doctor)}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: doctor.coverImage }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToDoctor(doctor)}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{doctor.name}</Text>
            <Text size={14} muted={!priceColor} color={priceColor}>${doctor.specialist}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
}

export default Product;

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});