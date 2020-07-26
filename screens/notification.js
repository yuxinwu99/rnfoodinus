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
  SafeAreaView,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Notif extends React.Component {
  state = {orderItems: []};
  toggleCustomerComp = item => {
    firestore()
      .collection('order')
      .doc(item.store)
      .collection('comorder')
      .doc(item.id)
      .update({
        customer_comp: true,
      })
      .then(() => {
        console.log('Customer_comp Updated!');
      });
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('Orders')
      .doc(item.id)
      .update({
        customer_comp: true,
      });
    this.fetchdata();
  };
  fetchdata = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('Orders')
      .where('customer_comp', '==', false)
      .get()
      .then(querySnapshot => {
        const results = [];
        querySnapshot.docs.map(documentSnapshot =>
          results.push(documentSnapshot.data()),
        );
        this.setState({orderItems: results});
      })
      .catch(err => console.error(err));
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      console.log('fetching customer orders');
      console.log('orders: ' + this.state.orderItems);
      this.fetchdata();
    }, 10000);
    this.fetchdata();
  }
  render() {
    return this.state.orderItems.length > 0 ? (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={this.state.orderItems}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'grey'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            console.log(item.order);
            var date = item.time
              .toDate()
              .toLocaleString('en-SG', {timeZone: 'UTC'});
            return (
              <View elevation={5} style={styles.container}>
                <TouchableOpacity
                  style={{backgroundColor: 'white'}}
                  onPress={() => {
                    if (item.seller_comp == true) {
                      Alert.alert(
                        'Have you collected your food?',
                        'Cannot be undone',
                        [
                          {text: 'Cancel'},
                          {
                            text: 'OK',
                            onPress: () => {
                              this.toggleCustomerComp(item);
                            },
                          },
                        ],
                        {cancelable: false},
                      );
                    } else {
                      Alert.alert(
                        'Please wait',
                        'The Order is not done yet :D',
                      );
                    }
                  }}>
                  {item.seller_comp == true ? (
                    <Text style={styles.ready}> YOUR ORDER IS READY!!!!!</Text>
                  ) : null}
                  <FlatList
                    data={item.order}
                    renderItem={({item}) => (
                      <Text style={styles.order}>{item}</Text>
                    )}
                    keyExtractor={item => item}
                  />
                  <Text> Order Time: {date}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Orders Found</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ready: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  order: {fontSize: 20, padding: 5},
  container: {
    margin: 10,
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
