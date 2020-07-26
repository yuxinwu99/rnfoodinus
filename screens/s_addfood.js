import React, {Component} from 'react';
import FoodForm from '../comp/FoodForm';
import auth from '@react-native-firebase/auth';

export default class addFoodScreen extends Component {
  state = {
    food: {
      name: '',
      description: '',
      price: parseFloat(0),
      count: parseFloat(0),
    },
  };

  componentDidMount() {
    const currentFood = this.props.route.params.food;

    if (currentFood) {
      this.setState(prevState => ({food: (prevState.food = currentFood)}));
    }
  }

  onFoodUpdated = food => {
    console.log(food);
    this.props.navigation.popToTop();
  };

  render() {
    const currentUser = this.props.route.params.user;
    return (
      <FoodForm
        username={auth().currentUser.displayName}
        food={this.state.food}
        onFoodAdded={this.props.route.params.foodAddedCallback}
        onFoodUpdated={this.onFoodUpdated}
      />
    );
  }
}
