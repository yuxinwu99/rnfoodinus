import {notifications} from 'react-native-firebase-push-notifications';
import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Button,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {getProfile} from '../comp/foodbackend';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default class Notif extends React.Component {
  getToken = async () => {
    //get the messeging token
    const token = await notifications.getToken();
    //you can also call messages.getToken() (does the same thing)
    return token;
  };
  getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    const notification = await notifications.getInitialNotification();
    console.log('getInitialNotification', notification);
    return notification;
  };

  onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
    this.removeOnNotificationOpened = notifications.onNotificationOpened(
      notification => {
        console.log('onNotificationOpened', notification);
        //do something with the notification
      },
    );
  };

  onNotificationListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
    this.removeOnNotification = notifications.onNotification(notification => {
      //do something with the notification
      console.log('onNotification', notification);
    });
  };

  onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
    this.removeonTokenRefresh = messages.onTokenRefresh(token => {
      //do something with the new token
    });
  };
  componentWillUnmount() {
    //remove the listener on unmount
    if (this.removeOnNotificationOpened) {
      this.removeOnNotificationOpened();
    }
    if (this.removeOnNotification) {
      this.removeOnNotification();
    }

    if (this.removeonTokenRefresh) {
      this.removeonTokenRefresh();
    }
  }
  render() {
    return (
      <View>
        <Text> lol </Text>
      </View>
    );
  }
}
