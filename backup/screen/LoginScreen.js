import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Image,
} from 'react-native';
// import Button from 'react-native-button';
import { AppStyles } from '../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import localhostaddress from '../localhost';
import { Button, Block, Input } from "galio-framework"
import { useFonts } from 'expo-font';

function LoginScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    'MonoSpace': require("../assets/Fonts/Space_Mono/SpaceMono-Regular.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
}, [fontsLoaded]);

if (!fontsLoaded) {
    return null;
}

  const onPressLogin = async () => {
    if (username.length <= 0 || password.length <= 0) {
      Alert.alert('Please fill out the required fields.');
      return;
    }
    try {
      // login
      let { data } = await axios.post(`${localhostaddress}:8080/api/authenticate`, { username: username, password: password });
      // ketika berhasil login, token disimpan di dalam asyncStorage
      await AsyncStorage.setItem('Authorization', `Bearer ${data.token}`);
      dispatch({ type: 'SET_LOGIN' })
    } catch(err) {
      console.log(err);
      Alert.alert('Something went wrong')
    }
  };

  return (
    <Block flex center>
      <Block>
        <Image style={styles.gambar} source={require("../assets/img/Picture2.png")}/>
      </Block>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <Text style={styles.comment}>Please put your information below to sign in to your account</Text>
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
        onPress={() => onPressLogin()}
      >Log In</Button>
      <Text style={styles.or}>Dont Have Account?</Text>
      <Text onPress={() => navigation.navigate("Signup")} style={{ color: 'dimgrey'}}>  Sign Up</Text>
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
  facebookContainer: {
    alignItems: 'center',
    width: 192,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  googleContainer: {
    width: 195,
    height: 50,
    marginTop: 30,
  },
  googleText: {
    color: AppStyles.color.white,
  },
  gambar: {
    height: 52,
    marginTop: 20,
    width: 198,
    resizeMode:'contain',
},
});

export default LoginScreen;
