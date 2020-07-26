import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
//import {createAppContainer, createSwitchNavigator} from '@react-navigation';
import shistStack from './s_histstack';
import sloginStack from './s_loginstack';
import smenuStack from './s_menustack';
//import scompletedStack from './s_completedstack';
import sordersStack from './s_ordersstack';
import ssignupStack from './s_signupstack';
import StoresStack from '../dir/storestack';
import {useWindowDimensions} from 'react-native';
import loginStack from '../dir/loginstack';
import sprofileStack from '../directory/s_profilestack';
const Drawer = createDrawerNavigator();
// const AppContainer = createAppContainer(createSwitchNavigator(
//   {
//     Main: Drawer,
//     Auth: AuthStack
//   },
//   {
//     initialRouteName: 'Auth',
//   }
// ));

export default function SellerDrawerNavigator() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}>
      <Drawer.Screen name="Profile" component={sprofileStack} />
      <Drawer.Screen name="Orders" component={sordersStack} />
      <Drawer.Screen name="Sales History" component={shistStack} />
      <Drawer.Screen name="Menu" component={smenuStack} />
    </Drawer.Navigator>
  );
}
//<Drawer.Screen name="Completed List" component={scompletedStack} />

// export default function AppContainer() {

// }
