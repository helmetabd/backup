import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Image,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
// import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import localhostaddress from '../localhost';
import { Button, Block, Input, theme } from "galio-framework"

function ConsultationScreen({navigation}) {
  const [doctor, setDoctor] = useState({});
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const dataDoctor = useSelector(state => state.dataDoctor);

  const dispatch = useDispatch();

  const fetchDoctor = async () => {
    axios.get(`${localhostaddress}:8080/api/doctor/${dataDoctor.id}`, { 
        headers:{
            "Content-Type": "application/json",
            Authorization: await AsyncStorage.getItem('Authorization')
        }
    })
    .then(({ data }) => {
        console.log(data)
        setDoctor(data)
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('Something went wrong')
    });
  }

  useEffect(() => {
      fetchDoctor();
  }, [])

  const consult = async () => {
    if (subject.length <= 0 || description.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }
    try {
      // login
      let { data } = await axios.post(`${localhostaddress}:8080/api/consult`, 
        { doctorId: doctor.id, subject: subject, description: description }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization")
        },
      });
      dispatch({ type: 'SET_CONSULT', payload: data })
      dispatch({ type: 'SET_DOCTOR', payload: data.doctor })
      navigation.navigate("Consultation Detail")
    } catch(err) {
      console.log(err);
      Alert.alert('Something went wrong')
    }
  };

  return (
    <Block>
      <ScrollView>
        <Block flex center>
          <Block row={true} card flex style={[styles.product, styles.shadow]}>
              <Block flex style={[styles.imageContainer, styles.shadow]}>
                <Image source={{ uri: doctor.coverImage }} style={styles.horizontalImage} />
              </Block>
              <Block flex space="between" style={styles.productDescription}>
                <Text bold size={14} style={styles.productTitle}>Dr. {doctor.name}</Text>
                <Text size={14} style={styles.productTitle} >{doctor.age} years old</Text>
                <Text size={14} style={styles.productTitle} >Specialist {doctor.specialist}</Text>
              </Block>
            </Block>
          <Text style={[styles.title, styles.leftTitle]}>Consultation</Text>
          <Input
            rounded
            type='default'
            placeholder='Subject'
            bgColor='transparent'
            style={styles.InputContainer}
            onChangeText={setSubject}
            value={subject}
            label="Subject"
          />
          <Block>
          <Text style={styles.body}>Description</Text>
          <View
            style={{
              backgroundColor: "transparent",
              borderColor: '#000000',
              borderWidth: 1,
              width: 325,
              height: 100,
              marginTop: 5,
              borderRadius: 20
            }}>
            <TextInput
              editable
              placeholder='Description'
              multiline
              numberOfLines={5}
              maxLength={400}
              onChangeText={setDescription}
              value={description}
              style={{paddingLeft: 15, height: 100, width: AppStyles.textInputWidth.main}}
            />
          </View>
          </Block>
          <Button
            color={AppStyles.color.tint}
            round
            shadowless
            size='large'
            style={styles.loginContainer}
            onPress={() => consult()}
          >Send Consultation</Button>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  or: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  body: {
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    fontWeight:'bold'
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
  comment: {
    fontSize: AppStyles.fontSize.normal,
    fontWeight: 'normal',
    color: "black",
    marginTop: 5,
    marginBottom: 20,
    width: 300,
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    alignItems: 'center',
    // width: AppStyles.buttonWidth.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginBottom: 20
    // marginTop: 30,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: 'transparent',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  gambar: {
    height: 52,
    marginTop: 20,
    width: 198,
    resizeMode:'contain',
  },
  product: {
    marginHorizontal: theme.SIZES.BASE,
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
});

export default ConsultationScreen;
