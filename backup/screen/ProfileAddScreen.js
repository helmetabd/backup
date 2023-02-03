import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
// import Button from 'react-native-button';
import {AppStyles} from '../AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../components/CustomDatePicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block, Input} from "galio-framework"
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileAddScreen = ({navigation}) =>  {
  const isProfile = useSelector(state => state.isProfile)
  const dataProfile = useSelector(state => state.dataProfile)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Men', value: 'Men'},
    {label: 'Woman', value: 'Woman'}
  ]);

  const dispatch = useDispatch();

  const checkIsProfile = () => {
    if(isProfile){
      setName(dataProfile.name)
      setAddress(dataProfile.address)
      setBirthDate(dataProfile.birthDate)
      setGender(dataProfile.gender)
      setAge(dataProfile.age)
    }
  }

  useEffect(() => {
    checkIsProfile();
  }, []);

  const addProfile = async () => {
    try {
      let { data } = await axios.put(`http://192.168.1.5:8080/api/patient`, 
        { name: name, address: address, birthDate: birthDate, gender: gender }, {
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
      <Block>
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
          placeholder='Address'
          bgColor='transparent'
          style={styles.InputContainer}
          onChangeText={setAddress}
          value={address}
          label="Address"
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
            placeholder="Gender"
            style={styles.bodyDrop}
            textStyle={{
              color: AppStyles.color.text,
            }}
            // containerStyle={styles.bodyDrop}
          />
        </View>
        <TouchableOpacity
          style={[styles.facebookContainer, {marginTop: 50}]}
          onPress={() => addProfile()}>
          <Text style={styles.facebookText}>Add</Text>
        </TouchableOpacity>
      </Block>
    )
  }

  return (
    <Block flex center safe>
      <Text style={[styles.title, styles.leftTitle]}>{isProfile ? "Change Profile" : "Input your profile"}</Text>
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
        placeholder='Address'
        bgColor='transparent'
        style={styles.InputContainer}
        onChangeText={setAddress}
        value={address}
        label="Address"
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
          placeholder="Gender"
          style={styles.bodyDrop}
          textStyle={{
            color: AppStyles.color.text,
          }}
          // containerStyle={styles.bodyDrop}
        />
      </View>
      <TouchableOpacity
        style={[styles.facebookContainer, {marginTop: 50}]}
        onPress={() => addProfile()}>
        <Text style={styles.facebookText}>Add</Text>
      </TouchableOpacity>
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
    width: AppStyles.textInputWidth.main,
    // width: "80%",
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
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
});

export default ProfileAddScreen;
