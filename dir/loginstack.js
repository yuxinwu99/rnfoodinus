import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import SignUpContainer from '../screens/signup';
import Login from '../screens/login';
import React from 'react';
import MenuImage from '../comp/MenuImage';
import MenuButton from '../comp/MenuButton';
import ProfilePage from '../screens/profile';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import ConsumerDrawerNavigator from './drawer';
import SellerDrawerNavigator from '../directory/s_drawer';
import Signup from '../screens/signup';
import sSignup from '../screens/s_signup';
export default function LoginStack() {
  const Stack = createStackNavigator();
  isLoggedIn = auth().currentUser;
  return (
    <Stack.Navigator
    // initialRouteName="Seller"
    // screenOptions={{
    //   headerStyle: {
    //     //backgroundColor: '#4caf50',
    //   },
    //   headerTintColor: '#333',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //     fontSize: 20,
    //     letterSpacing: 1,
    //   },
    //   //headerTitleAlign: 'center',
    //}}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{
        //   headerLeft: () => (
        //     <MenuImage
        //       onPress={() => {
        //         navigation.openDrawer();
        //       }}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen name="Seller Signup" component={sSignup} />
      <Stack.Screen name="Customer Signup" component={Signup} />
      <Stack.Screen
        name="Consumer"
        component={ConsumerDrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Seller"
        component={SellerDrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
