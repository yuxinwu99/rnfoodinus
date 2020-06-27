import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class search extends Component{
   
  state={
    search:''
  };

  constructor(props) {
    super(props);
  }
  
  handleUpdatesearch = (search) => this.setState({ search });

  handleUpdateClear = () => this.setState( '' );

  render(){
    const { search } = this.state;
    return(
        <View >
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          round
          onChangeText={this.handleUpdatesearch}
          onClearText={this.handleUpdateClear}
          value={search}
          placeholder='Type Here...' />
        </View>
        
    )
  }
}

const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
  });