import React, {Component} from 'react';
import FoodForm from '../comp/FoodForm';

export default class addFoodScreen extends Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: navigation.getParam('food') ? 'Edit Food' : 'New Food',
  //   };
  // };

  state = {
    food: {
      name: '',
      description: '',
      price: '',
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

  // setCurrentSubIngredient = text => {
  //   this.setState(prevState => ({
  //     currentSubIngredient: (prevState.currentSubIngredient = text),
  //   }));
  // };

  // submitSubIngredients = () => {
  //   let ingredient = this.state.currentSubIngredient;

  //   if (ingredient && ingredient.length > 2) {
  //     this.setState(prevState => ({
  //       food: {
  //         ...prevState.food,
  //         subIngredients: [...prevState.food.subIngredients, ingredient],
  //       },
  //     }));
  //   }
  // };

  render() {
    return (
      <FoodForm
        food={this.state.food}
        onFoodAdded={this.props.route.params.foodAddedCallback}
        onFoodUpdated={this.onFoodUpdated}
      />
    );
  }
}
