import React, {Component} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
export default class History extends Component {
  state = {userOrders: null, email: auth().currentUser.email};

  fetchdata = () => {
    if (this.state.email != null) {
      firestore()
        .collection('users')
        .doc(this.state.email)
        .collection('orders')
        .get()
        .then(querySnapshot => {
          const results = [];
          querySnapshot.docs.map(documentSnapshot =>
            results.push(documentSnapshot.data()),
          );
          this.setState({userOrders: results});
        })
        .catch(err => console.error(err));
    } else {
      console.log('Login first lol');
    }
  };

  render() {
    return (
      <View>
        <Text>stuff</Text>
      </View>
    );
  }
}
