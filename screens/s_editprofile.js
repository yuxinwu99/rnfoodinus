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
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
      <ProfileForm
        name={this.props.route.params.user}
        profile={this.state.profile}
        onProfileUpdated={this.onProfileUpdated}
      />
    );
  }
}
