import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Alert, Image} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import toggleSellerComp from '../comp/foodbackend';

export default class orderDetailScreen extends Component {
  render() {
    const order = this.props.route.params.order;

    console.log(order);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name="ios-create"
            type="ionicon"
            onPress={() =>
              this.props.navigation.navigate('Add Item', {
                order: order,
              })
            }
          />
        </View>
        <Text style={styles.headerText}>{order.order}</Text>
        <Text style={styles.categoryText}>Time Ordered: {order.time}</Text>
        <Text style={styles.categoryText}>User Email: {order.useremail}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  categoryText: {
    fontSize: 20,
    marginBottom: 32,
  },
  container: {
    alignItems: 'center',
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey',
  },
});
