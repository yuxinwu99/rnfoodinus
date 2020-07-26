import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import histStack from './histstack';
import homeStack from './homestack';
import loginStack from './loginstack';
import signupStack from './signupstack';
import {useWindowDimensions} from 'react-native';
import MenuImage from '../comp/MenuImage';
import StoresStack from './storestack';
import ProfilePage from '../screens/profile';
import LoginStack from './loginstack';
import Notif from '../screens/notification';

const Drawer = createDrawerNavigator();
export default function ConsumerDrawerNavigator() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="User"
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}>
      <Drawer.Screen name="User" component={ProfilePage} />
      <Drawer.Screen name="Purchase History" component={histStack} />
      <Drawer.Screen name="Stores" component={StoresStack} />
      <Drawer.Screen name="Notif" component={Notif} />
    </Drawer.Navigator>
  );
}
