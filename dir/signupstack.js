import { createStackNavigator } from '@react-navigation/stack';
import SignUpContainer from '../screens/signup';
import React from 'react'
import MenuImage from '../comp/MenuImage';
const signupStack = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: {
            //backgroundColor: '#4caf50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerTitleAlign: 'center',
        }}
      >
      <Stack.Screen
      name="SignUp"
      component={SignUpContainer}
      options={{
        headerTitle: () => <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}/>,
      }}
    />
      </Stack.Navigator>
    );
  };
  
  
  export default signupStack;