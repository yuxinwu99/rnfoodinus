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
import {StackActions} from '@react-navigation/native';

export default class ProfilePage extends React.Component {
  state = {username: ''};
  componentDidMount() {
    this._isMounted = true;
    console.log('profile mounted');

    // user = auth().currentUser.displayName;
    // console.log('current user= ' + user);
    // this.setState({username: user});
  }
  shouldComponentUpdate(props, state) {
    console.log('updated');
    return true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View>
        <Text> Welcome! </Text>
        <Text> {this.state.username} </Text>
        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
                this.setState({username: ''});
              });
            this.props.navigation.navigate('Login');
          }}>
          <Text> Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
