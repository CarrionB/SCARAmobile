import React, { Component } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../res/styles';

class ImageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity 
        style = {styles.imageButtonContainer}
        onPress={this.props.onButtonPress}
      >
          <Image
            source = {this.props.icon}
            style={styles.iconButton}
          />
          <Text style = {styles.imageButtonText}>
            {this.props.label}
          </Text>
      </TouchableOpacity>
    );
  }
}

export default ImageButton;
