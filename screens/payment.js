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
    if (user != null) {
      firestore()
        .collection('order')
        .doc(this.props.route.params.name)
        .collection('comorder')
        .add({
          time: currentTime,
          order: order,
          userEmail: user.email,
          customer_comp: false,
          seller_comp: false,
        })
        .then(snapshot => {
          id = snapshot.id;
          snapshot.update({id: id});
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('Orders')
            .doc(id)
            .set({
              time: currentTime,
              order: order,
              customer_comp: false,
              seller_comp: false,
              id: id,
              store: this.props.route.params.name,
            });
          this.props.navigation.popToTop();
          this.props.navigation.navigate('Order status');
        })
        .catch(err => console.error(err));

      // firestore()
      //   .collection('users')
      //   .doc(user.email)
      //   .collection('Orders')
      //   .where('time', '==', currentTime)
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(document => {
      //       document.ref.collection('order').add({order});
      //     });
      //   });

      // firestore()
      //   .collection('order')
      //   .doc(this.props.route.params.name)
      //   .collection('comorder')
      //   .where('time', '==', currentTime)
      //   .where('user', '==', user.email)
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.forEach(document => {
      //       document.ref.collection('order').add({order});
      //     });
      //   });
    } else {
      this.props.navigation.navigate('User');
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
