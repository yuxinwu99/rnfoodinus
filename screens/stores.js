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
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';

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
    search: '',
    filtered: [],
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
  handlesearch = item => {
    this.setState({
      search: item,
    });
    if (this.state.search != '') {
      var lowerCasedItem = item.toLowerCase();
      var newArray = this.state.stores.filter(
        stores => stores.name.toLowerCase().includes(lowerCasedItem) == true,
      );
      console.log(newArray);
      this.setState({
        filtered: newArray,
      });
    }
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
        this.setState({isLoading: false, stores: results, filtered: results});
        console.log('results: ', results);
      })
      .catch(err => console.error(err));
    console.log('stores: ', this.state.stores);
  };

  renderStores = ({item}) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.description}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    //const { isLoading, stores, name} = this.state;

    if (this.state.isLoading) return <ActivityIndicator />;

    return (
      <View style={styles.main}>
        {
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="Search..."
            value={this.state.search}
            onChangeText={item => this.handlesearch(item)}
          />
          // <TextInput
          //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //   placeholder="Title"
          //   value={this.state.name}
          //   onChangeText={name => this.handlename(name)}
          // />
          // <Button onPress={this.AddStore} title="Add" />
        }
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={this.state.filtered}
          renderItem={({item}) => (
            //console.log('location: ', item.location)
            <TouchableOpacity
              elevation={5}
              onPress={() => {
                this.props.navigation.navigate('Order', {
                  key: item.id,
                  name: item.name,
                  location: item.location,
                });
              }}>
              <View style={styles.main}>
                <View style={styles.newContainer}>
                  <Image style={styles.photo} source={{uri: item.image}} />
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.category}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          style={styles.container}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width;
//< height ? width : height;
const recipeNumColums = 1;
// item size
const RECIPE_ITEM_HEIGHT = 200;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  container: {
    padding: 10,
  },
  newContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginRight: RECIPE_ITEM_MARGIN,
    marginTop: 10,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    paddingBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  photo: {
    marginTop: 10,
    width: '90%',
    height: 200,
    //aspectRatio: 2,
    marginLeft: RECIPE_ITEM_MARGIN,
    marginRight: RECIPE_ITEM_MARGIN,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
});
