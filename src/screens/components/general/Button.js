import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../../res/styles';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity 
        style = {styles.buttonContainer} 
        onPress = {this.props.onButtonPress}>
        <Text style = {styles.buttonText}>
            {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
