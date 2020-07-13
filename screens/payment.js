import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default class Payment extends React.Component {
  sendOrder = () => {
    var order = this.props.route.params.order;
    var user = auth().currentUser;
    var currentTime = firebase.firestore.Timestamp.now();
    for (var i = 0; i < order.length; i++) {
      if (order[i] != 'dummy1' && order[i] != 'dummy2') {
        firestore()
          .collection('users')
          .doc(user.email)
          .collection('Orders')
          .add({
            time: currentTime,
            order: order[i],
            cust_comp: false,
            seller_comp: false,
          });

        firestore()
          .collection('order')
          .doc(this.props.route.params.name)
          .collection('comorder')
          .add({
            time: currentTime,
            userEmail: user.email,
            order: order[i],
            cust_comp: false,
            seller_comp: false,
          })
          .then(console.log('order sent' + order[i]));
      }
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={{fontSize: 20}}>Your Orders are:</Text>
          <FlatList
            data={this.props.route.params.order}
            renderItem={({item}) => {
              if (item != 'dummy1' && item != 'dummy2') {
                console.log(item);
                return <Text style={styles.itemContainer}>{item}</Text>;
              }
            }}
            style={styles.container}
            keyExtractor={item => item}
          />
        </View>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Total=${this.props.route.params.total}
        </Text>
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => {
            this.sendOrder();
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            Confirm Order
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: '10%',
    alignSelf: 'flex-end',
    marginLeft: 100,
    margin: 10,
    alignItems: 'center',
  },
  bigButton: {
    backgroundColor: 'deepskyblue',
    height: 40,
  },
  name: {
    width: '50%',
    height: 30,
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    width: '50%',
    height: 30,
    margin: 10,
    fontSize: 20,
  },
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
