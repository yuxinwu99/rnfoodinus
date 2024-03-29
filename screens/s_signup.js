import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default class sSignup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      location: "",
      email: "",
      password: "",
      isLoading: false,
      size: 0,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          firestore().collection("users").doc(this.state.email).set({
            email: this.state.email,
            name: this.state.displayName,
            location: this.state.location,
            description: "xxxxxx",
            image:
              "https://firebasestorage.googleapis.com/v0/b/foodinus-e8ce8.appspot.com/o/sample%20image.jpg?alt=media&token=797f5e86-43bf-458f-8576-6d6e0d7540fa",
            seller: true,
          });
          firestore()
            .collection("stores")
            .get()
            .then((querySnapshot) => {
              this.state.size = querySnapshot.size;
            });
          firestore()
            .collection("stores")
            .doc(this.state.displayName)
            .set({
              name: this.state.displayName,
              id: this.state.size + 1,
            });
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            displayName: "",
            location: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Store Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, "displayName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Google Maps Plus Code"
          value={this.state.location}
          onChangeText={(val) => this.updateInputVal(val, "location")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://support.google.com/maps/answer/7047426?co=GENIE.Platform%3DAndroid&hl=en"
            )
          }
        >
          <Text style={styles.loginText}>
            Click here to learn how to find your plus code!
          </Text>
        </TouchableOpacity>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
