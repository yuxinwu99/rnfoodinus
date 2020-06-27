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

export default class Order extends React.Component {
  state = {
    menu: null,
    custOrder: [],
    menuId: 0,
    name: '',
    price: 0,
  };
  // navigation = this.props;
  // key = this.props.navigation.getParam('key', 'NO-ID');
  // constructor() {
  //   super();
  //   console.ignoredYellowBox = ['Setting a timer'];
  // }

  handlename = name => {
    this.setState({name: name});
  };
  handleprice = price => {
    this.setState({price: price});
  };
  AddMenu = () => {
    console.log(this.state.menuId + this.state.name + this.state.price);
    console.log('add menu called');
    if (this.state.name != '' && this.state.price != 0) {
      firestore()
        .collection('stores')
        .where('id', '==', this.props.route.params.key)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            document.ref.collection('menu').add({
              id: this.state.size,
              name: this.state.name,
              price: this.state.price,
              count: 0,
            });
          });

          this.fetchData();
          this.setState({name: ''});
          this.setState({price: 0});
        })
        .catch(err => console.error(err));
    } else console.log('input something kekw');
  };

  fetchData = () => {
    firestore()
      .collection('stores')
      .where('id', '==', this.props.route.params.key)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          document.ref
            .collection('menu')
            .get()
            .then(querySnapshot => {
              const results = [];
              this.state.size = querySnapshot.size + 1;
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
          .then(console.log('order sent' + orderDetails));
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
    this.fetchData();
  }
  render() {
    const {navigation} = this.props;
    const {key} = this.props.route.params;
    return (
      <View>
        {console.log('key=' + key)}
        {console.log('')}
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Item name"
          value={this.state.name}
          onChangeText={name => this.handlename(name)}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Item Price"
          value={this.state.price}
          onChangeText={price => this.handleprice(price)}
        />
        <Button
          title="Add Menu"
          onPress={() => {
            this.AddMenu();
          }}
        />
        <FlatList
          data={this.state.menu}
          renderItem={({item}) => (
            <View style={styles.itemContainer} elevation={5}>
              <Text>{item.name + '                $' + item.price}</Text>
              <Text>{'number of items ordered=' + item.count}</Text>
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
            </View>
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
    marginBottom: 10,
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
  },
});
