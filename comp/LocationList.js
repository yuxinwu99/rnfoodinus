import React from 'react'
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

export default function ListItem({ pressHandler, item , navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Order', item)}>
    <View style={styles.item} elevation={5}>
      <Image source={{uri: 'https://i.imgur.com/uoBrfjK.jpg'}}
       style={{width: 360 , height: 200, flex: 1, marginBottom: 20,}} />
      <Text>{item.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
   },
});