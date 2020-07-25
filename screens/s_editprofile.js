import React, {Component} from 'react';
import ProfileForm from '../comp/ProfileForm';

export default class editProfileScreen extends Component {
  state = {
    profile: {
      name: '',
      description: '',
      location: '',
    },
  };

  componentDidMount() {
    const currentProfile = this.props.route.params.profile;

    if (currentProfile) {
      this.setState(prevState => ({
        profile: (prevState.profile = currentProfile),
      }));
    }
  }

  onProfileUpdated = profile => {
    console.log(profile);
    this.props.navigation.popToTop();
  };

  render() {
    console.log('user: ', this.props.route.params.user);
    console.log('e profile: ', this.state.profile);
    return (
      <ProfileForm
        user={this.props.route.params.user}
        profile={this.state.profile}
        onProfileUpdated={this.onProfileUpdated}
      />
    );
  }
}
