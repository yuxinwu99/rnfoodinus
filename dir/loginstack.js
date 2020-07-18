import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import SignUpContainer from '../screens/signup';
import Login from '../screens/login';
import React from 'react';
import MenuImage from '../comp/MenuImage';
import MenuButton from '../comp/MenuButton';
import ProfilePage from '../screens/profile';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import auth from '@react-native-firebase/auth';

const loginStack = ({navigation}) => {
  const Stack = createStackNavigator();
  isLoggedIn = auth().currentUser;
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
        name="Profile"
        component={ProfilePage}
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
      <Stack.Screen
        name="Login"
        component={Login}
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
      <Stack.Screen name="Signup" component={SignUpContainer} />
    </Stack.Navigator>
  );
};

export default loginStack;
