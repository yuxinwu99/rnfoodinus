import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import sSignup from '../screens/s_signup';
import sLogin from '../screens/s_login';
import React from 'react';
import MenuImage from '../comp/MenuImage';
import MenuButton from '../comp/MenuButton';

const sloginStack = ({navigation}) => {
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
        name="Login"
        component={sLogin}
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
      <Stack.Screen name="Signup" component={sSignup} />
    </Stack.Navigator>
  );
};

export default sloginStack;
