import React, {SafeAreaView, View} from 'react';
import homeStack from './dir/homestack';
import Home from './screens/home';
import Stores from './screens/stores';
//import DrawerNavigator from './dir/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './directory/s_drawer';
import auth from '@react-native-firebase/auth';
import LoginStack from './dir/loginstack';
import {createStackNavigator} from '@react-navigation/stack';

export default function App() {
  isLoggedIn = auth().currentUser;

  return <DrawerNavigator />;
}
