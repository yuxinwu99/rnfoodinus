// components/login.js

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

export default class Login extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      loggedIn: false,
      seller: '',
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          //console.log(res);
          console.log('User logged-in successfully!');
          firestore()
            .collection('users')
            .doc(this.state.email)
            .get()
            .then(doc => {
              const result = doc.data().seller;
              this.state.seller = result;
              console.log('seller= ' + this.state.seller);
              this.setState({
                isLoading: false,
                email: '',
                password: '',
              });
              if (this.state.seller == true)
                this.props.navigation.navigate('Seller');
              else this.props.navigation.navigate('Consumer');
            });

          //console.log(this.state.seller);
          // var idTokenResult = auth().currentUser.getIdTokenResult();
          // console.log('User JWT: ', idTokenResult.token);
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };
  componentDidMount() {
    var user = auth().currentUser.email;
    if (user != null) {
      firestore()
        .collection('users')
        .doc(user)
        .get()
        .then(doc => {
          const result = doc.data().seller;
          this.state.seller = result;
          console.log('seller= ' + this.state.seller);
          if (this.state.seller == true)
            this.props.navigation.navigate('Seller');
          else this.props.navigation.navigate('Consumer');
        });
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={val => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Log In"
          onPress={() => this.userLogin()}
        />

        <Text style={styles.lineText}>Don't have account?</Text>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Customer Signup')}>
          Click here to sign up if you want to order food!
        </Text>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Seller Signup')}>
          Click here to sign up if you're a food seller!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineText: {
    color: '#ccc',
    marginTop: 25,
    textAlign: 'center',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
