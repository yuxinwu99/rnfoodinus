import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import sOrder from '../screens/s_orders';
import sCompleted from '../screens/s_completed';
import MenuImage from '../comp/MenuImage';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Orders() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Current') {
            iconName = 'ios-alert';
          } else if (route.name === 'Completed') {
            iconName = 'ios-checkmark-circle-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Current" component={sOrder} />
      <Tab.Screen name="Completed" component={sCompleted} />
    </Tab.Navigator>
  );
}

const sorderStack = ({navigation}) => {
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
        name="Orders"
        component={Orders}
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

export default sorderStack;
