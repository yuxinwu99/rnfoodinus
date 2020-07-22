import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import sMenu from '../screens/s_menu';
import addFoodScreen from '../screens/s_addfood';
import itemDetailScreen from '../screens/s_itemdetails';
import MenuImage from '../comp/MenuImage';

const smenuStack = ({navigation}) => {
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
        name="Menu"
        component={sMenu}
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
      <Stack.Screen name="Add Item" component={addFoodScreen} />
      <Stack.Screen name="Item Details" component={itemDetailScreen} />
    </Stack.Navigator>
  );
};

export default smenuStack;
