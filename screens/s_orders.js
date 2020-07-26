import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {getOrders, toggleSellerComp} from '../comp/foodbackend';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class sOrders extends Component {
  state = {
    orderItems: [],
    indexer: 0,
    user: '',
  };

  onOrdersReceived = orderItems => {
    this.setState(prevState => ({
      orderItems: (prevState.orderItems = orderItems),
    }));
  };

  componentDidMount() {
    var newUser = auth().currentUser.displayName;
    this.timer = setInterval(() => {
      console.log('fetching orders');
      getOrders(newUser, this.onOrdersReceived);
      this.setState({
        user: newUser,
      });
    }, 10000);

    getOrders(newUser, this.onOrdersReceived);
    this.setState({
      user: newUser,
    });
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
                    Alert.alert(
                      'Completed?',
                      'Cannot be undone',
                      [
                        {text: 'Cancel'},
                        {
                          text: 'OK',
                          onPress: () => {
                            toggleSellerComp(
                              this.state.user,
                              item.id,
                              item.userEmail,
                            );
                            this.setState(prevState => ({
                              indexer: (prevState.indexer = index),
                            }));
                            this.forceUpdate();
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <FlatList
                    data={item.order}
                    renderItem={({item}) => (
                      <Text style={styles.order}>{item}</Text>
                    )}
                    keyExtractor={item => item}
                  />
                  <Text> Order Time: {date}</Text>
                  <Text> Customer: {item.userEmail}</Text>
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
