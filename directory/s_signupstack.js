import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import sSignup from '../screens/s_signup';
import React from 'react';
import MenuImage from '../comp/MenuImage';
import MenuButton from '../comp/MenuButton';

const ssignupStack = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    // initialRouteName="login"
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
        name="Signup"
        component={sSignup}
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

export default ssignupStack;
