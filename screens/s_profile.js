import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Alert, Image } from "react-native";
import { Divider, Icon } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import getProfile from "../comp/foodbackend";

export default class sellerProfilePage extends Component {
  state = {
    currentEmail: "",
    profile: [],
  };

  onProfileReceived = (profile) => {
    this.setState((prevState) => ({
      profile: (prevState.profile = profile),
    }));
  };

  componentDidMount() {
    var userEmail = auth().currentUser.Email;
    getProfile(userEmail, this.onProfileReceived);
    this.setState({
      currentEmail: userEmail,
    });
    console.log(this.state.currentEmail);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name="ios-create"
            type="ionicon"
            onPress={() =>
              this.props.navigation.navigate("Edit Profile", {
                profile: this.state.profile,
                email: this.state.currentEmail,
              })
            }
          />
          <Icon
            reverse
            name="ios-log-out"
            type="ionicon"
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  console.log("User signed out!");
                });
              this.props.navigation.navigate("Login");
            }}
          />
        </View>
        <Image
          style={styles.image}
          source={this.profile.image && { uri: this.profile.image }}
        />
        <Text style={styles.headerText}>{this.profile.name}</Text>
        <Text style={styles.categoryText}>
          Short Description: {this.profile.description}
        </Text>
        <Text style={styles.categoryText}>
          Location: {this.profile.location}
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
    width: "80%",
    aspectRatio: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    fontStyle: "italic",
    fontSize: 18,
    marginBottom: 32,
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    alignItems: "center",
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: "grey",
  },
});
