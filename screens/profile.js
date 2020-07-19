import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class ProfilePage extends React.Component {
  user = auth().currentUser;

  render() {
    return (
      <View>
        <Text> Welcome! </Text>
        {<Text> {this.user.displayName} </Text>}
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
              });
            this.props.navigation.navigate('Login');
          }}>
          <Text> Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
