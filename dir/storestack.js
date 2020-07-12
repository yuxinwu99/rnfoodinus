import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Stores from '../screens/stores';
import Order from '../screens/order';
import MenuImage from '../comp/MenuImage';
import Payment from '../screens/payment';
const StoresStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stores"
        component={Stores}
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
      <Stack.Screen name="Order" component={Order} options={{title: 'Order'}} />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{title: 'Finalising orders'}}
      />
    </Stack.Navigator>
  );
};

export default StoresStack;
