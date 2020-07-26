import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Button,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {getProfile} from '../comp/foodbackend';
import firestore from '@react-native-firebase/firestore';

export default class sellerProfilePage extends Component {
  state = {
    user: '',
    profile: [],
  };

  update() {
    firestore()
      .collection('stores')
      .doc(user)
      .onSnapshot(function(doc) {
        //console.log('current data: ', doc.data());
      });
  }

  onProfileReceived = profile => {
    this.setState(prevState => ({
      profile: (prevState.profile = profile),
    }));
    //console.log('profile: ', this.state.profile);
  };

  componentDidMount() {
    var user = auth().currentUser.displayName;
    console.log(user);
    getProfile(user, this.onProfileReceived);
    this.setState({
      user: user,
    });
    console.log(this.state.user);

    this.props.navigation.addListener('focus', payload => {
      var newUser = auth().currentUser.displayName;
      getProfile(newUser, this.onProfileReceived);
      this.setState({
        user: newUser,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name="ios-create"
            type="ionicon"
            onPress={() => {
              this.props.navigation.navigate('Edit Profile', {
                profile: this.state.profile,
                user: this.state.user,
              });
              console.log(
                'CURRENT USER AHKSJDJHKVDSAHLBRHAUHEFUHBUECFQWBFWAUBIWUABIGcgdiuchn dgnaguo biwgf awbcfhEHFOCAIWHOE WHUNIO OG QIUWGBOQWIUCCQI TBEQWTY ' +
                  this.state.user,
              );
            }}
          />
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
        <Image
          style={styles.image}
          source={this.state.profile.image && {uri: this.state.profile.image}}
        />
        <Text style={styles.headerText}>{this.state.profile.name}</Text>
        <Text style={styles.categoryText}>
          Short Description: {this.state.profile.description}
        </Text>
        <Text style={styles.categoryText}>
          Location: {this.state.profile.location}
        </Text>
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
    width: '80%',
    aspectRatio: 2,
    marginBottom: 16,
    borderRadius: 15,
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
  ingredientprofileText: {
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
