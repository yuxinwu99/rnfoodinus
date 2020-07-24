import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import sellerProfilePage from "../screens/s_profile";
import editProfileScreen from "../screens/s_editprofile";
import MenuImage from "../comp/MenuImage";

const sprofileStack = ({ navigation }) => {
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
        name="Profile"
        component={sellerProfilePage}
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
      <Stack.Screen name="Edit Profile" component={editProfileScreen} />
    </Stack.Navigator>
  );
};

export default sprofileStack;
