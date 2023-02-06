import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { AppStyles } from '../AppStyles';

function WelcomeScreen({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin)

  const checkTokenInStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('Authorization');
      if(token) {
        // setIsLogin(true)
        dispatch({ type: 'SET_LOGIN' })
        navigation.navigate("DrawerStack")
        console.log(token)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      } 
    } catch(err) {
      console.log(err)
      Alert.alert(err)
    }
  }

  useEffect(() => {
    console.log(isLogin);
    checkTokenInStorage();
  }, []);

  if (isLoading == true) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={AppStyles.color.tint}
      />
    );
  }
  return (
    <View>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to HealMe App</Text>
          <Image style={styles.logo} source={require("../assets/img/Picture5.png")}/>
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  logo: {
    display: 'flex',
    height: 250,
    width: 250,
    resizeMode:'contain',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  signupContainer: {
    alignItems: 'center',
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: AppStyles.color.tint,
  },
  spinner: {
    marginTop: 200,
  },
});

export default WelcomeScreen;
