import {createStackNavigator} from '@react-navigation/stack';
import profilePage from '../screens/profile';
import React from 'react';
import MenuImage from '../comp/MenuImage';

const profStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    // initialRouteName="prof"
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
        name="Profile"
        component={profilePage}
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

export default profStack;
