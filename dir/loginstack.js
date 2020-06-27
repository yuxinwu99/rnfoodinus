import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import SignUpContainer from '../screens/signup';
import Login from '../screens/login';
import React from 'react'
import MenuImage from '../comp/MenuImage';
import MenuButton from '../comp/MenuButton';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';


const loginStack = ({ navigation }) => {
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
      component={Login}
      options={{
        headerLeft: () => <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}/>,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignUpContainer}     
      />
      </Stack.Navigator>
    );
  };
  
  
  export default loginStack;