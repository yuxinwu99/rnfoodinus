import React from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {withFormik} from 'formik';
import * as yup from 'yup';
import {addFood, updateFood, uploadFood} from './foodbackend';
import FoodImagePicker from './ImagePicker';

const FoodForm = props => {
  setFoodImage = image => {
    props.setFieldValue('imageUri', image.uri);
  };

  return (
    <View style={styles.container}>
      <FoodImagePicker image={props.food.image} onImagePicked={setFoodImage} />
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder="Name"
        onChangeText={text => {
          props.setFieldValue('name', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.description}
        style={styles.longFormInput}
        placeholder="Short Description"
        onChangeText={text => {
          props.setFieldValue('description', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.description}</Text>
      <TextInput
        value={props.values.price}
        style={styles.formInput}
        keyboardType="numeric"
        onChangeText={text => {
          props.setFieldValue('price', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.price}</Text>

      <Button title="Submit" onPress={() => props.handleSubmit()} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16,
  },
  validationText: {
    color: 'red',
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16,
  },
});

export default withFormik({
  mapPropsToValues: ({food}) => ({
    name: food.name,
    description: food.description,
    price: food.price,
    imageUri: null,
  }),
  enableReinitialize: true,
  validationSchema: props =>
    yup.object().shape({
      name: yup
        .string()
        .max(30)
        .required(),
      description: yup
        .string()
        .max(100)
        .required(),
      price: yup
        .number()
        .max(30)
        .required(),
    }),
  handleSubmit: (values, {props}) => {
    console.log(props);

    console.log(values);

    if (props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      values.image = props.food.image;
      uploadFood(values, props.onFoodUpdated, props.username, {updating: true});
    } else {
      uploadFood(values, props.onFoodAdded, props.username, {updating: false});
    }
  },
})(FoodForm);
