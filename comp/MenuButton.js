import React from 'react';
import { TouchableOpacity, Image,StyleSheet,Text,View } from 'react-native';
import PropTypes from 'prop-types';

export default class MenuButton extends React.Component {
  render() {
    return (
        <View style={styles.headerButtonContainer}>
                <Image
                style={styles.headerButtonImage}
                source={require('../assets/icons/backArrow.png')}
                />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 25,
    height: 25,
    margin: 6
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
});
