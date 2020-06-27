import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class Order extends React.Component {
  state = {
    menu: null,
    custOrder: [],
  };
  // navigation = this.props;
  // key = this.props.navigation.getParam('key', 'NO-ID');
  // constructor() {
  //   super();
  //   console.ignoredYellowBox = ['Setting a timer'];
  // }
  fetchData = key => {
    firestore()
      .collection('stores')
      .where('id', '==', key)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          document.ref
            .collection('menu')
            .get()
            .then(querySnapshot => {
              const results = [];
              querySnapshot.docs.map(documentSnapshot =>
                results.push(documentSnapshot.data()),
              );
              this.setState({menu: results.filter(item => item.id != 0)});
            });
        });
      })
      .catch(err => console.error(err));
  };

  handleAdd = itemName => {
    console.log('+');
    for (var i = 0; i < this.state.menu.length; i++) {
      if (this.state.menu[i].name == itemName) {
        this.state.menu[i].count += 1;
        console.log(this.state.menu[i].count);
        this.forceUpdate();
      }
    }
  };

  handleSubtract = itemName => {
    console.log('-');
    for (var i = 0; i < this.state.menu.length; i++) {
      if (this.state.menu[i].name == itemName) {
        if (this.state.menu[i].count != 0) {
          this.state.menu[i].count -= 1;
          console.log(this.state.menu[i].count);
          this.forceUpdate();
        }
      }
    }
  };
  sendOrder = () => {
    for (var i = 0; i < this.state.menu.length; i++) {
      if (this.state.menu[i].count != 0) {
        let orderDetails =
          this.state.menu[i].name + '   x' + this.state.menu[i].count;
        console.log(orderDetails);
        // this.setState({
        //   custOrder: [...this.state.custOrder, orderDetails],
        // });
        firestore()
          .collection('order')
          .doc(this.props.route.params.name)
          .collection('comorder')
          .add({
            order: orderDetails,
            cust_comp: false,
            seller_comp: false,
          })
          .then(console.log('order sent'));
      }
    }
  };

  // shouldComponentUpdate(props, state) {
  //   console.log('updated');
  //   return true;
  // }

  componentWillUnmount() {
    console.log('order unmounted');
  }
  componentDidMount() {
    console.log('order mounted');
    this.fetchData(this.props.route.params.key);
  }
  render() {
    const {navigation} = this.props;
    const {key} = this.props.route.params;
    return (
      <View>
        {console.log('key=' + key)}
        {console.log('')}

        <FlatList
          data={this.state.menu}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.count}</Text>
              <Button
                title="+"
                onPress={() => {
                  this.handleAdd(item.name);
                }}
              />
              <Button
                title="-"
                onPress={() => {
                  this.handleSubtract(item.name);
                }}
              />
            </TouchableOpacity>
          )}
          style={styles.container}
          keyExtractor={item => item.id}
        />
        <Button
          title="Send Order"
          onPress={() => {
            this.sendOrder();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
});
