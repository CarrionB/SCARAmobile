import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../../../res/styles';
import { width, resizeFactor } from '../../../res/constants';

class DateTimeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    var type = this.props.type;
    var iconType = 'calendar'

    if(type)
    {
      iconType = 'clockcircleo'
    }

    return (
      <View 
        style = {[
          styles.margin,
          this.props.type &&
          {width: (width - 32) / 2}
        ]}>
        <Text style = {styles.text}>
          {this.props.label}
        </Text>
        <View
          style = {[
            styles.textBox,
            this.props.type &&
            {width: (width) / 2 - 48}
          ]}>
          <Text style = {styles.textInBox}>
            {this.props.date}
          </Text>
          <TouchableWithoutFeedback 
            onPress = {this.props.onDateChange}
          >
            <Icon
              name = {iconType}
              color = 'black'
              size = {25}
              style= {styles.icon}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default DateTimeBox;
