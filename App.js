import React, {SafeAreaView, View, useEffect} from 'react';
import Stores from './screens/stores';
//import ConsumerDrawerNavigator from './dir/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SellerDrawerNavigator from './directory/s_drawer';
import auth from '@react-native-firebase/auth';
import LoginStack from './dir/loginstack';
//import firebase from 'react-native-firebase';
import {YellowBox} from 'react-native';
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
      {YellowBox.ignoreWarnings([''])}
      <LoginStack />
    </NavigationContainer>
  );
}
