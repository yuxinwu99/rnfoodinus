import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Order from '../screens/order';
import MenuImage from '../comp/MenuImage';


const homeStack = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      // initialRouteName="Home"
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
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}/>,
        }}
      />
      <Stack.Screen name="Order" component={Order} options={{ title: 'Order' }} />
    </Stack.Navigator>
  );
};


export default homeStack;