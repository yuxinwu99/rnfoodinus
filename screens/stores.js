import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class Stores extends React.Component {
  // state = {
  //   isLoading: true,
  //   stores: null,
  //   name: '',
  // }
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this._isMounted = false;
  }
  state = {
    isLoading: true,
    stores: null,
    name: '',
    size: 0,
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  AddStore = () => {
    console.log('running');
    if (this.state.name != '') {
      firestore()
        .collection('stores')
        .doc(this.state.name)
        .set({
          name: this.state.name,
          id: this.state.size + 1,
        });

      firestore()
        .collection('stores')
        .doc(this.state.name)
        .collection('menu')
        .add({
          id: 0,
          name: 'dummy',
          price: 0,
        });

      this.fetchdata();
      this.setState({name: ''});
    } else console.log('input something dumbass');
  };

  handlename = name => {
    this.setState({name: name});
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.fetchdata();
  }
  shouldComponentUpdate(props, state) {
    console.log('updated');
    return true;
  }
  fetchdata = () => {
    firestore()
      .collection('stores')
      .get()
      .then(querySnapshot => {
        this.state.size = querySnapshot.size;
        const results = [];
        console.log(this.state.size);
        querySnapshot.docs.map(documentSnapshot =>
          results.push(documentSnapshot.data()),
        );
        this.setState({isLoading: false, stores: results});
      })
      .catch(err => console.error(err));
  };

  render() {
    //const { isLoading, stores, name} = this.state;

    if (this.state.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Title"
          value={this.state.name}
          onChangeText={name => this.handlename(name)}
        />
        <Button onPress={this.AddStore} title="Add" />
        <FlatList
          data={this.state.stores}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                this.props.navigation.navigate('Order', {
                  key: item.id,
                  name: item.name,
                });
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.container}
          keyExtractor={item => item.id}
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
