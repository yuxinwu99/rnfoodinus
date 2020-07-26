import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Alert, Image} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {deleteFood} from '../comp/foodbackend';

export default class itemDetailScreen extends Component {
  render() {
    const food = this.props.route.params.food;
    const user = this.props.route.params.username;
    const onFoodDeleted = this.props.route.params.foodDeletedCallback;

    console.log(food);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name="ios-create"
            type="ionicon"
            onPress={() =>
              this.props.navigation.navigate('Add Item', {
                food: food,
                user: user,
              })
            }
          />
          <Icon
            reverse
            name="ios-trash"
            type="ionicon"
            color="#CA300E"
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  {text: 'Cancel'},
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteFood(food, user, onFoodDeleted);
                      this.props.navigation.popToTop();
                    },
                  },
                ],
                {cancelable: false},
              )
            }
          />
        </View>
        <Image style={styles.image} source={food.image && {uri: food.image}} />
        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.categoryText}>
          Short Description: {food.description}
        </Text>
        <Text style={styles.categoryText}>Price: {food.price}</Text>
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
