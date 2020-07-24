import React, { Component } from "react";
import ProfileForm from "../comp/ProfileForm";

export default class editProfileScreen extends Component {
  state = {
    profile: {
      name: "",
      description: "",
      location: "",
    },
  };

  componentDidMount() {
    const currentProfile = this.props.route.params.profile;

    if (currentProfile) {
      this.setState((prevState) => ({
        profile: (prevState.profile = currentProfile),
      }));
    }
  }

  onProfileUpdated = (profile) => {
    console.log(profile);
    this.props.navigation.popToTop();
  };

  render() {
    return (
      <ProfileForm
        email={this.props.route.params.email}
        profile={this.state.profile}
        onProfileUpdated={this.onProfileUpdated}
      />
    );
  }
}
