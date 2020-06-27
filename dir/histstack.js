import { createStackNavigator } from '@react-navigation/stack';
import History from '../screens/history'
import React from 'react'
import MenuImage from '../comp/MenuImage';


const histStack = ({ navigation }) => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator
        // initialRouteName="hist"
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
          name="Purchase History"
          component={History}
          options={{
            headerLeft: () => <MenuImage
            onPress={() => {
              navigation.openDrawer();
            }}/>,
          }}
        />
      </Stack.Navigator>
    );
  };
  
  
  export default histStack;