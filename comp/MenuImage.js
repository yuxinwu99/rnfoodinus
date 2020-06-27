import React from 'react';
import { TouchableOpacity, Image,StyleSheet,Text,View } from 'react-native';
import PropTypes from 'prop-types';

export default class MenuImage extends React.Component {
  render() {
    return (
        <View style={styles.headerButtonContainer}>
            <TouchableOpacity  onPress={this.props.onPress}>
                <Image
                style={styles.headerButtonImage}
                source={require('../assets/icons/menu.png')}
                />
            </TouchableOpacity>

        </View>
    );
  }
}

MenuImage.propTypes = {
  onPress: PropTypes.func
};

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
