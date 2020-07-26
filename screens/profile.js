// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {StackActions} from '@react-navigation/native';

// export default class ProfilePage extends React.Component {
//   state = {username: ''};
//   componentDidMount() {
//     this._isMounted = true;
//     console.log('profile mounted');

//     // user = auth().currentUser.displayName;
//     // console.log('current user= ' + user);
//     // this.setState({username: user});
//   }
//   shouldComponentUpdate(props, state) {
//     console.log('updated');
//     return true;
//   }
//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   render() {
//     return (
//       <View>
//         <Text> Welcome! </Text>
//         <Text> {this.state.username} </Text>
//         <TouchableOpacity
//           onPress={() => {
//             auth()
//               .signOut()
//               .then(() => {
//                 console.log('User signed out!');
//                 this.setState({username: ''});
//               });
//             this.props.navigation.navigate('Login');
//           }}>
//           <Text> Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

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

export default class ProfilePage extends Component {
  state = {
    email: '',
    user: '',
  };

  componentDidMount() {
    var newEmail = auth().currentUser.email;
    var newUser = auth().currentUser.displayName;
    this.setState({
      email: newEmail,
      user: newUser,
    });
    console.log(this.state.email);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row} />
        <Text style={styles.headerText}> Welcome! </Text>
        <Text style={styles.headerText}>{this.state.user}</Text>
        <Text style={styles.categoryText}>Email: {this.state.email}</Text>
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
