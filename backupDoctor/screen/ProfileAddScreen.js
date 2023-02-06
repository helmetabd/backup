import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Image, TouchableHighlight} from 'react-native';
// import Button from 'react-native-button';
import {AppIcon, AppStyles} from '../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../components/CustomDatePicker';
import axios from 'axios';
import localhostaddress from '../localhost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Button, Input, theme} from "galio-framework"
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileAddScreen = ({navigation}) =>  {
  const isProfile = useSelector(state => state.isProfile)
  const dataProfile = useSelector(state => state.dataProfile)
  const [name, setName] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [titleImage, setTitleImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Men', value: 'Men'},
    {label: 'Woman', value: 'Woman'}
  ]);

  const dispatch = useDispatch();

  const checkIsProfile = () => {
    if(isProfile){
      setName(dataProfile.name)
      setSpecialist(dataProfile.specialist)
      setBirthDate(dataProfile.birthDate)
      setGender(dataProfile.gender)
      setAge(dataProfile.age)
    }
  }

  const checkImage = () => {
    if(dataProfile.coverImage){
      setSelectedImage(dataProfile.coverImage)
    } 
  }

  useEffect(() => {
    checkIsProfile();
    checkImage();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setTitleImage(result.assets[0].width);
        upload(result.assets[0].uri,)
    } else {
        alert('You did not select any image.');
    }
  };

  const upload = async (uri) => {

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const storageRef = ref(storage, `Doctor/${dataProfile.name}/${titleImage}.${dataProfile.id}`);

    await uploadBytes(storageRef, blob)
    .then((snapshot) => {
        return getDownloadURL(storageRef)
    })
    .then(downloadUrl => {
        console.log(downloadUrl);
        // setLinkImage(downloadUrl);
        dispatch({type: "SET_IMAGE", payload: downloadUrl} )
    })
    .catch(err => {
        console.log(err);
    })      
  }

  const convertDate = (date) => {
    const newDate = new Date(date);
    const parseDate = newDate.toDateString().split(' ').slice(1);
    const finalDate = `${parseDate[1]} ${parseDate[0]} ${parseDate[2]}`;
    // console.log(newDate);
    return finalDate;
    // return console.log(date);
  }

  const addProfile = async () => {
    try {
      let { data } = await axios.put(`${localhostaddress}:8081/api/doctor`, 
        { name: name, specialist: specialist, birthDate: birthDate, gender: gender, coverImage: dataProfile.coverImage }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await AsyncStorage.getItem("Authorization")
        },
      })
      dispatch({ type: 'SET_DATA', payload: data })
      dispatch({ type: 'SET_PROFILE'})
      navigation.navigate("Home")
    } catch (error) {
      console.log(error)
      Alert.alert("Something went wrong");
    } 
  };

  const edit = () => {
    return(
      <Block center>
        <Input
          rounded
          type="default"
          placeholder='Name'
          bgColor='transparent'
          style={styles.InputContainer}
          onChangeText={setName}
          value={name}
          label="Name"
        />
        <Input
          rounded
          type="default"
          placeholder='Specialist'
          bgColor='transparent'
          style={styles.InputContainer}
          onChangeText={setSpecialist}
          value={specialist}
          label="Specialist"
        />
        <Block>
          <Text style={styles.body}>Birthdate</Text>
          <View style={styles.InputDrop}>
            <TextInput
              value={convertDate(birthDate)}
              editable={false}
            />
          </View>
        </Block>
        <View style={{width: AppStyles.textInputWidth.main, marginTop: 30}}>
          <DropDownPicker
            open={open}
            disabled={true}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            placeholder="Gender"
            style={styles.bodyDrop}
            textStyle={{
              color: AppStyles.color.text,
            }}
            // containerStyle={styles.bodyDrop}
          />
        </View>
      </Block>
    )
  }

  return (
    <Block flex center safe>
      <Block center>
      <Text style={[styles.title, styles.leftTitle]}>{dataProfile ? "Change Profile" : "Input your profile"}</Text>
      <Block center style={[styles.imageContainer, styles.shadow]}>
        <TouchableHighlight onPress={() => pickImageAsync()}>
          <Image source={!selectedImage ? AppIcon.images.defaultUser : {uri: selectedImage}} style={styles.horizontalImage} />
        </TouchableHighlight>
      </Block>
      { dataProfile ? edit() : 
      <Block center>
        <Input
          rounded
          type="default"
          placeholder='Name'
          bgColor='transparent'
          style={styles.InputContainer}
          onChangeText={setName}
          value={name}
          label="Name"
        />
        <Input
          rounded
          type="default"
          placeholder='Specialist'
          bgColor='transparent'
          style={styles.InputContainer}
          onChangeText={setSpecialist}
          value={specialist}
          label="Specialist"
        />
        <Block>
          <Text style={styles.body}>Birthdate</Text>
          <View style={styles.InputDrop}>
            <CustomDatePicker
                defaultDate="2000-05-03"
                onDateChange={(value) => setBirthDate(value)}
                />
          </View>
        </Block>
        <View style={{width: AppStyles.textInputWidth.main, marginTop: 30}}>
          <DropDownPicker
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            placeholder={gender}
            style={styles.bodyDrop}
            textStyle={{
              color: AppStyles.color.text,
            }}
          />
        </View>
      </Block> 
      }
      </Block>
      <Button
        color={AppStyles.color.tint}
        round
        shadowless
        size='large'
        style={styles.ButtonDrop}
        onPress={() => addProfile()}
      >Add Data</Button>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',
    // marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
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
    // marginTop: 30,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: AppStyles.color.grey,
    // borderRadius: AppStyles.borderRadius.main,
  },
  InputDrop: {
    // width: AppStyles.textInputWidth.main,
    width: 325,
    height: 45, 
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    paddingLeft: 20,
    paddingTop: 5
  },
  ButtonDrop: {
    // width: AppStyles.textInputWidth.main,
    width: 325,
    height: 45, 
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    paddingLeft: 20,
    paddingTop: 5
  },
  bodyDrop: {
    color: AppStyles.color.text,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
  },
  facebookContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  shadow: {
    marginTop: 10,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  horizontalImage: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
});

export default ProfileAddScreen;
