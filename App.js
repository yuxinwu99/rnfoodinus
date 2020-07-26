import React, {SafeAreaView, View, useEffect} from 'react';
import homeStack from './dir/homestack';
import Home from './screens/home';
import Stores from './screens/stores';
//import ConsumerDrawerNavigator from './dir/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SellerDrawerNavigator from './directory/s_drawer';
import auth from '@react-native-firebase/auth';
import LoginStack from './dir/loginstack';
import {createStackNavigator} from '@react-navigation/stack';
//import firebase from 'react-native-firebase';
export default function App() {
  // useEffect(() => {
  //   creatChannel();
  //   notificationListener();
  // }, []);
  // const creatChannel = () => {
  //   const channel = new firebase.notifications.Android.Channel(
  //     'channelId',
  //     'channelName',
  //     firebase.notifications.Android.Importance.Max,
  //   ).setDescription('Description');

  //   firebase.notifications().android.creatChannel(channel);
  // };

  // const notificationListener = () => {
  //   firebase.notifications().onNotification(notification => {
  //     const localNotification = new firebase.notifications.Notification({
  //       sound: 'default',
  //       show_in_foreground: true,
  //     })
  //       .setNotificationId(notification.notificationId)
  //       .setTitle(notification.title)
  //       .setSubtitile(notification.subtitle)
  //       .setBody(notification.body)
  //       .setData(notification.data)
  //       .android.setChannelId('channelId')
  //       .android.setPriority(firebase.notifications.Android.Priority.High);

  //     firebase
  //       .notifications()
  //       .displayNotification(localNotification)
  //       .catch(err => console.log(err));
  //   });
  // };

  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
}
