import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {ListItem, Divider} from 'react-native-elements';
import {getCOrders, toggleCustomerComp} from '../comp/foodbackend';
import auth from '@react-native-firebase/auth';

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
    getCOrders(newUser, this.onOrdersReceived);
    this.setState({
      user: newUser,
    });
  }

  render() {
    return this.state.orderItems.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.orderItems}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'grey'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                titleStyle={styles.titleStyle}
                title={item.order}
                subtitleStyle={styles.subtitleStyle}
                subtitle={'Order Time: ' + item.time}
                subtitleStyle={styles.subtitleStyle}
                subtitle={'Customer: ' + item.useremail}
                // onPress={() => {
                //   toggleCustomerComp(user, item.id);
                //   this.setState(prevState => ({
                //     indexer: (prevState.indexer = index),
                //   }));
                // }}
              />
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
  container: {
    flex: 1,
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
