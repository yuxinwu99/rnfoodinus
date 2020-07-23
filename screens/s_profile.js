import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Alert, Image} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default class SellerProfilePage extends Component {
  render() {
    const user = auth().currentUser.displayName;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={food.image && {uri: food.image}} />
        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.categoryText}>
          Short Description: {food.description}
        </Text>
        <Text style={styles.categoryText}>Price: {food.price}</Text>
        <View style={styles.row}>
          <Icon
            reverse
            name="ios-log-out"
            type="ionicon"
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  console.log('User signed out!');
                });
              this.props.navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  ingredientText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 32,
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
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
