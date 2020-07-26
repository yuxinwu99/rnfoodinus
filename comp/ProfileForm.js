import React from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';
import {withFormik} from 'formik';
import * as yup from 'yup';
import {updateProfile, uploadProfile} from './foodbackend';
import FoodImagePicker from './ImagePicker';

const ProfileForm = props => {
  setProfileImage = image => {
    props.setFieldValue('imageUri', image.uri);
  };

  return (
    <View style={styles.container}>
      <FoodImagePicker
        image={props.profile.image}
        onImagePicked={setProfileImage}
      />
      <Text style={styles.titletext}> {props.values.name} </Text>
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
        value={props.values.location}
        style={styles.longFormInput}
        placeholder="Google Plus Code"
        onChangeText={text => {
          props.setFieldValue('location', text);
        }}
      />
      <Text style={styles.validationText}> {props.errors.location}</Text>

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
  titletext: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
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
  mapPropsToValues: ({profile}) => ({
    name: profile.name,
    description: profile.description,
    location: profile.location,
    imageUri: null,
  }),
  enableReinitialize: true,
  validationSchema: props =>
    yup.object().shape({
      description: yup
        .string()
        .max(100)
        .required(),
      location: yup
        .string()
        .max(100)
        .required(),
    }),
  handleSubmit: (values, {props}) => {
    console.log(props);
    console.log(values);

    values.id = props.profile.id;
    values.image = props.profile.image;
    uploadProfile(values, props.onProfileUpdated, values.name);
  },
})(ProfileForm);
