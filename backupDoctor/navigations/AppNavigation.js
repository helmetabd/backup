import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Image, Pressable, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screen/Home';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import {AppIcon, AppStyles} from '../AppStyles';
import DrawerContainer from '../components/DrawerContainer';
import ProfileAddScreen from '../screen/ProfileAddScreen';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Consultations from '../screen/Consultations';
import ConsultationDetails from '../screen/ConsultationDetails';
import Medicines from '../screen/Medicines';
import Hospitals from '../screen/Hospitals';
import HospitalDetail from '../screen/HospitalDetail';
import MedicineDetail from '../screen/MedicineDetail';

const Stack = createStackNavigator();

// login stack
const LoginStack = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const ConsultationStack = () => {
  return(
  <Stack.Navigator
    initialRouteName="Consultations"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen
      name="Consultations"
      component={Consultations}
      options={({navigation}) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: {paddingLeft: 10},
      })}
    />
    <Stack.Screen name="Consultation Detail" component={ConsultationDetails} />
    <Stack.Screen name="Medicines" component={Medicines} />
    <Stack.Screen name="Hospitals" component={Hospitals} />
    <Stack.Screen name="HospitalDetail" component={HospitalDetail} />
    <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
  </Stack.Navigator>
  )
}

const HomeStack = () => {

  const isProfile = useSelector(state => state.isProfile)
  
  return(
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'red',
        headerTitleStyle: styles.headerTitleStyle,
        headerMode: 'float',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image style={styles.iconStyle} source={AppIcon.images.menu} />
            </Pressable>
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
        })}
      /> 
      <Stack.Screen
        name="AddProfile"
        component={ProfileAddScreen}
      />
    </Stack.Navigator>
  )
};

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarInactiveTintColor: AppStyles.color.grey,
      tabBarActiveTintColor: AppStyles.color.tint,
    }}
    >
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => {
          return (
            <AntDesign name="home" size={24} color="black" />
          );
        },
        headerShown: false,
      }}
      name="HomeStack"
      component={HomeStack}
    />
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Consultation',
        tabBarIcon: ({focused}) => {
          return (
            <AntDesign name="wechat" size={24} color="black" />
          );
        },
        headerShown: false,
      }}
      name="ConsultationStack"
      component={ConsultationStack}
    />
  </BottomTab.Navigator>
);

// drawer stack
const Drawer = createDrawerNavigator();
const DrawerStack = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {outerWidth: 200},
      drawerPosition: 'left',
      headerShown: false,
    }}
    drawerContent={({navigation}) => (
      <DrawerContainer navigation={navigation} />
    )}>
    <Drawer.Screen name="Tab" component={TabNavigator} />
  </Drawer.Navigator>
);

// Manifest of possible screens
const RootNavigator = () => {

  const isLogin = useSelector(state => state.isLogin)

  return (
    <Stack.Navigator
      initialRouteName="LoginStack"
      screenOptions={{headerShown: false}}>
      { !isLogin ? <Stack.Screen name="LoginStack" component={LoginStack} />   
        : <Stack.Screen name="DrawerStack" component={DrawerStack} /> 
      } 
    </Stack.Navigator>
  );
};

const AppNavigator = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
  iconStyle: {tintColor: AppStyles.color.tint, width: 30, height: 30},
});

export default AppNavigator;
