import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import {AppStyles} from '../AppStyles';
import {useDispatch} from 'react-redux';
import localhostaddress from '../localhost';
import axios from 'axios';
import { Button, Block, Input } from "galio-framework"

function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const register = async () => {
    if (username.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }
    axios.post(`${localhostaddress}:8080/api/register`, { username: username, password: password })
    .then(response => {
        let { data, status } = response;
        if (status === 200) {
          Alert.alert("Ditambahkan");
          navigation.navigate("Login");
        }
    })
    .catch(err => {
        console.log(err);
        Alert.alert("Something went wrong");
    })      
  };

  return (
    <Block flex center>
      <Block>
        <Image style={styles.gambar} source={require("../assets/img/Picture2.png")}/>
      </Block>
      <Text style={[styles.title, styles.leftTitle]}>Sign Up</Text>
      <Text style={styles.comment}>Please put your information below to create a new account</Text>
      <Input
        rounded
        type='email-address'
        placeholder='E-mail'
        bgColor='transparent'
        style={styles.InputContainer}
        onChangeText={setUsername}
        value={username}
      />
      <Input
        rounded
        password
        viewPass
        placeholder="Password"
        bgColor='transparent'
        style={styles.InputContainer}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        color={AppStyles.color.tint}
        round
        shadowless
        size='small'
        style={styles.loginContainer}
        onPress={() => register()}
      >Sign Up</Button>
      <Text style={styles.or}>Have an account already?</Text>
      <Text onPress={() => navigation.navigate("Login")} style={{ color: 'dimgrey', fontFamily: 'MonoSpace',}}>  Sign In</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  or: {
    color: 'black',
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
  gambar: {
    height: 52,
    marginTop: 20,
    width: 198,
    resizeMode:'contain',
},
});

export default SignupScreen;
