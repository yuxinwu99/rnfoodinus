import {createStackNavigator} from '@react-navigation/stack';
import Notif from '../screens/notification';
import React from 'react';
import MenuImage from '../comp/MenuImage';

const notifStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    // initialRouteName="notif"
    // screenOptions={{
    //   headerStyle: {
    //     //backgroundColor: '#4caf50',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    //   //headerTitleAlign: 'center',
    // }}
    >
      <Stack.Screen
        name="Order status"
        component={Notif}
        options={{
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default notifStack;
