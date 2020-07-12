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

export default class Payment extends React.Component {
  sendOrder = () => {
    var order = this.props.route.params.order;
    for (var i = 0; i < order.length; i++) {
      if (order[i] != 'dummy1' && order[i] != 'dummy2') {
        firestore()
          .collection('order')
          .doc(this.props.route.params.name)
          .collection('comorder')
          .add({
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
