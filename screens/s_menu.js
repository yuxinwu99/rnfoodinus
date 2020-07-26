import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {getFoods} from '../comp/foodbackend';
import ActionButton from 'react-native-action-button';
import {ListItem, Divider} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default class sMenu extends Component {
  state = {
    menuItems: [],
    indexer: 0,
    user: '',
  };
  onFoodAdded = food => {
    this.setState(prevState => ({
      menuItems: [...prevState.menuItems, food],
    }));
    this.props.navigation.popToTop();
  };

  onFoodDeleted = () => {
    var newMenuItems = [...this.state.menuItems];
    newMenuItems.splice(this.state.indexer, 1);

    this.setState(prevState => ({
      menuItems: (prevState.menuItems = newMenuItems),
    }));

    this.props.navigation.popToTop();
  };

  onFoodsReceived = menuItems => {
    this.setState(prevState => ({
      menuItems: (prevState.menuItems = menuItems),
    }));
    console.log('menuItems: ', menuItems);
  };

  componentDidMount() {
    var newUser = auth().currentUser.displayName;
    getFoods(newUser, this.onFoodsReceived);
    this.setState({
      user: newUser,
    });
    console.log(this.state.user);
    this.props.navigation.addListener('focus', payload => {
      getFoods(newUser, this.onFoodsReceived);
      this.setState({
        user: newUser,
      });
    });
  }

  showActionButton = () => (
    <ActionButton
      buttonColor="blue"
      onPress={() =>
        this.props.navigation.navigate('Add Item', {
          foodAddedCallback: this.onFoodAdded,
          username: this.state.user,
        })
      }
    />
  );

  render() {
    return this.state.menuItems.length > 0 ? (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.menuItems}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'grey'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            console.log('item: ', item);
            return (
              <ListItem
                containerStyle={styles.listItem}
                titleStyle={styles.titleStyle}
                title={item.name}
                subtitleStyle={styles.subtitleStyle}
                subtitle={'Price: $' + item.price}
                leftAvatar={{
                  size: 'Large',
                  rounded: false,
                  source: item.image && {
                    uri: item.image,
                  },
                }}
                onPress={() => {
                  console.log(this.state.user);
                  this.setState(prevState => ({
                    indexer: (prevState.indexer = index),
                  }));
                  this.props.navigation.navigate('Item Details', {
                    food: item,
                    username: this.state.user,
                    itemDeletedCallback: this.onItemDeleted,
                  });
                }}
              />
            );
          }}
        />
        {this.showActionButton()}
      </SafeAreaView>
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Menu Items Found</Text>
        <Text style={styles.emptySubtitle}>
          Add new Menu Item using the + button below
        </Text>
        {this.showActionButton()}
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
