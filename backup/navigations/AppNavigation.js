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
import InputImage from '../components/InputImage';
import Doctors from '../screen/Doctors';
import { AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ConsultationScreen from '../screen/ConsultationScreen';
import Consultations from '../screen/Consultations';
import ConsultationDetails from '../screen/ConsultationDetails';
import Prescription from '../screen/Prescriptions';
import Medicines from '../screen/Medicines';
import MedicineDetail from "../screen/MedicineDetail"
import Referral from '../screen/Referral';

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

const DoctorStack = () => {
  return(
  <Stack.Navigator
    initialRouteName="Doctor"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen
      name="Doctor"
      component={Doctors}
      options={({navigation}) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: {paddingLeft: 10},
      })}
    />
    <Stack.Screen name="Consultation" component={ConsultationScreen} />
    <Stack.Screen name="Consultation Detail" component={ConsultationDetails} />
  </Stack.Navigator>
  )
}

const MedicineStack = () => {
  return(
  <Stack.Navigator
    initialRouteName="Medicine"
    screenOptions={{
      headerTintColor: 'red',
      headerTitleStyle: styles.headerTitleStyle,
      headerMode: 'float',
    }}>
    <Stack.Screen
      name="Medicine"
      component={Medicines}
      options={({navigation}) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image style={styles.iconStyle} source={AppIcon.images.menu} />
          </Pressable>
        ),
        headerLeftContainerStyle: {paddingLeft: 10},
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("")}>
            {/* <Image style={styles.iconStyle} source={AppIcon.images.menu} /> */}
            <AntDesign name="shoppingcart" size={24} color="black" />
          </Pressable>
        ),
        headerRightContainerStyle: {paddingRight: 15},
      })}
    />
    <Stack.Screen name="MedicineDetail" component={MedicineDetail} />
    {/* <Stack.Screen name="Consultation Detail" component={ConsultationDetails} /> */}
  </Stack.Navigator>
  )
}

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
        headerRightContainerStyle: {paddingRight: 15},
        headerLeftContainerStyle: {paddingLeft: 10},
      })}
    />
    <Stack.Screen name="Consultation Detail" component={ConsultationDetails} />
    <Stack.Screen name="Prescription" component={Prescription} />
    <Stack.Screen name="Referral" component={Referral} />
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
      <Stack.Screen
        name="Doctor"
        component={DoctorStack}
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
        name="Consultation"
        component={ConsultationStack}
        options={({navigation}) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image style={styles.iconStyle} source={AppIcon.images.menu} />
            </Pressable>
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
        })}
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
        tabBarLabel: 'Doctor',
        tabBarIcon: ({focused}) => {
          return (
            <MaterialCommunityIcons name="doctor" size={24} color="black" />
          );
        },
        headerShown: false,
      }}
      name="DoctorStack"
      component={DoctorStack}
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
    <BottomTab.Screen
      options={{
        tabBarLabel: 'Medicine',
        tabBarIcon: ({focused}) => {
          return (
            <FontAwesome5 name="pills" size={24} color="black" />
          );
        },
        headerShown: false,
      }}
      name="MedicineStack"
      component={MedicineStack}
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
