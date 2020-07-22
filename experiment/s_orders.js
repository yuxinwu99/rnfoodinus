import React, {Component} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {TextInput, Button} from 'react-native-paper';
import Todo from '../comp/Todo';

export default class sOrders extends Component {
  state = {
    loading: true,
    order: '',
    orders: null,
    size: 0,
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.readData();
  }

  setOrder = e => {
    this.setState({order: e});
  };

  addOrder = () => {
    if (this.state.order != '') {
      firestore()
        .collection('new_collection')
        //.document(this.state.todo)
        .add({
          id: this.state.size + 1,
          title: this.state.order,
          seller_comp: false,
          customer_comp: false,
        });

      this.readData();
      this.setState({order: ''});
    }
  };

  readData = () => {
    firestore()
      .collection('new_collection')
      .get()
      .then(querySnapshot => {
        this.state.size = querySnapshot.size;
        const results = [];
        querySnapshot.docs.map(documentSnapshot =>
          results.push(documentSnapshot.data()),
        );
        this.setState({
          loading: false,
          orders: results,
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    //if (this.state.loading) return <ActivityIndicator />;

    return (
      <>
        <FlatList
          style={{flex: 1}}
          data={this.state.orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Todo {...item} />}
        />
        <TextInput
          label={'Item Entry'}
          value={this.state.order}
          onChangeText={order => this.setOrder(order)}
        />
        <Button onPress={() => this.addOrder()}>Add Item (Testing)</Button>
      </>
    );
  }
}
