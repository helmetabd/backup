import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
// import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Block, Input } from "galio-framework"
import Textarea from 'react-native-textarea';

function ConsultationScreen({route, navigation}) {
  const [doctor, setDoctor] = useState({});
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { item } = route.params;
  const dataDoctor = useSelector(state => state.dataDoctor);

  const dispatch = useDispatch();

  const fetchDoctor = async () => {
    axios.get(`http://192.168.1.5:8080/api/doctor/${dataDoctor.id}`, { 
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
      let { data } = await axios.post('http://192.168.1.5:8080/api/consult', 
        { doctorId: doctor.id, subject: subject, description: description }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization")
        },
      });
      navigation.navigate("Consultation Detail", { data })
      dispatch({ type: 'SET_CONSULT', payload: data })
    } catch(err) {
      console.log(err);
      Alert.alert('Something went wrong')
    }
  };

  return (
    <ScrollView>
      <Block flex center>
        <Block row>
          <Image style={styles.gambar} source={{uri: dataDoctor.coverImage}}/>
          <Block>
            <Text style={styles.or}>Dr. {dataDoctor.name}</Text>
            <Text style={styles.comment}>{dataDoctor.specialist}</Text>
            <Text style={styles.comment}>{dataDoctor.age} years old</Text>
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
        />
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={setDescription}
          defaultValue={description}
          maxLength={120}
          placeholder={'Description'}
          placeholderTextColor={'black'}
          underlineColorAndroid={'transparent'}
        />
        {/* <Input
          multiline={true}
          textStyle={styles.textarea}
          placeholder="Description"
          numberOfLines={5}
          style={styles.textareaContainer}
          onChangeText={setDescription}
          value={description}
        /> */}
        <Button
          color={AppStyles.color.tint}
          round
          shadowless
          size='small'
          style={styles.loginContainer}
          onPress={() => consult()}
        >Send Consultation</Button>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  or: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
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
    marginTop: 30,
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
});

export default ConsultationScreen;
