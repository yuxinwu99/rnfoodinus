import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class Order extends React.Component {
  state = {
    menu: null,
    custOrder: [],
    menuId: 0,
    name: '',
    price: 0,
    sum: 0,
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
              price: parseFloat(this.state.price),
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
        this.state.sum += this.state.menu[i].price;
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
          this.state.sum -= this.state.menu[i].price;
          console.log(this.state.menu[i].count);
          this.forceUpdate();
        }
      }
    }
  };
  confirmOrder = () => {
    var temp = ['dummy1', 'dummy2'];
    for (var i = 0; i < this.state.menu.length; i++) {
      if (this.state.menu[i].count != 0) {
        let orderDetails =
          this.state.menu[i].name + '   x' + this.state.menu[i].count;
        console.log(orderDetails);
        temp.push(orderDetails.toString());
        console.log(temp);
        // this.setState({
        //   custOrder: [...this.state.custOrder, orderDetails],
        // });
        // firestore()
        //   .collection('order')
        //   .doc(this.props.route.params.name)
        //   .collection('comorder')
        //   .add({
        //     order: orderDetails,
        //     cust_comp: false,
        //     seller_comp: false,
        //   })
        // .then(console.log('order sent' + orderDetails));
      }
      if (i + 1 == this.state.menu.length) {
        console.log('to payment');
        this.props.navigation.navigate('Payment', {
          order: temp,
          name: this.props.route.params.name,
          total: this.state.sum.toFixed(2),
        });
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
      <View style={styles.container}>
        {console.log('key=' + key)}
        {console.log('')}
        {
          // <TextInput
          //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //   placeholder="Item name"
          //   value={this.state.name}
          //   onChangeText={name => this.handlename(name)}
          // />
          // <TextInput
          //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //   placeholder="Item Price"
          //   value={this.state.price}
          //   onChangeText={price => this.handleprice(price)}
          // />
          // <Button
          //   style={styles.button}
          //   title="Add Menu"
          //   onPress={() => {
          //     this.AddMenu();
          //   }}
          // />
        }
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('http://plus.codes/7QXC+MG,Singapore')
          }>
          <Text>open map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://support.google.com/maps/answer/7047426?co=GENIE.Platform%3DAndroid&hl=en',
            )
          }>
          <Text>how to get plus code</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.menu}
          renderItem={({item}) => (
            <View style={styles.itemContainer} elevation={5}>
              <Text style={styles.name}>
                {item.name + '                $' + item.price}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.handleAdd(item.name);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  +
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                {'no. of items ordered=' + item.count}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.handleSubtract(item.name);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.container}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => {
            this.confirmOrder();
          }}>
          <Text style={{textAlign: 'center'}}>Payment</Text>
          <Text style={{textAlign: 'center'}}>
            Total=${this.state.sum.toFixed(2)}
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
    // borderColor: '#aaaaaa',
    // borderWidth: 0.9,
    // borderRadius: 5,
    //backgroundColor: 'blue',
    alignItems: 'center',
  },
  bigButton: {
    backgroundColor: 'deepskyblue',
  },
  name: {
    width: '50%',
    height: 30,
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    //backgroundColor: 'red',
  },
  text: {
    width: '50%',
    height: 30,
    margin: 10,
    fontSize: 20,
    //backgroundColor: 'red',
  },
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
  },
  container: {
    flex: 1,
  },
});
