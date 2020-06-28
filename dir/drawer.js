import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import histStack from './histstack';
import homeStack from './homestack';
import loginStack from './loginstack';
import signupStack from './signupstack';
import {useWindowDimensions} from 'react-native';
import MenuImage from '../comp/MenuImage';
import Stores from '../screens/stores';
import StoresStack from './storestack';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const dimensions = useWindowDimensions();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}>
        <Drawer.Screen name="Login" component={loginStack} />
        <Drawer.Screen name="Purchase History" component={histStack} />
        <Drawer.Screen name="Stores" component={StoresStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
