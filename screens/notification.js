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
import {getProfile} from '../comp/foodbackend';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default class Notif extends React.Component {
  state = {orderItems: []};
  fetchdata = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.email)
      .collection('Orders')
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
                {item.seller_comp == false ? (
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
