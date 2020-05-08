import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { styles } from '../../../res/styles';

class CheckBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.checkBoxContainer}>
        <CheckBox
          size = {22}
          containerStyle = {styles.checkBox}
          checked = {this.props.checked}
          iconType='antdesign'
          checkedIcon='checkcircle'
          uncheckedIcon = 'checkcircleo'
          checkedColor='#2a94d1'
          onPress = {this.props.onPress}
        />
        <Text style = {styles.checkBoxLabel}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

export default CheckBoxContainer;
