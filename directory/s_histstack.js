import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import sHistory from '../screens/s_history';
import MenuImage from '../comp/MenuImage';

const shistStack = ({navigation}) => {
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
        name="History"
        component={sHistory}
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

export default shistStack;
