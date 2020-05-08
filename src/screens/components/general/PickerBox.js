import React, { Component } from 'react';
import { Picker, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { width, resizeFactor } from '../../../res/constants';
import { styles } from '../../../res/styles';

class PickerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (

      <View 
        style = {[
          styles.margin,
          this.props.resize &&
          {width: (width - 32) / 2}
        ]}
      >

        <Text 
          style = {[
            styles.text,
            !this.props.enabled &&
            {color: '#c4c4c4'}
          ]}
        >
          {this.props.label}
        </Text>
        
        <View 
          style = {[
            styles.pickerBox,
            this.props.resize &&
            {width: (width) / 2 - 48}
          ]}>
          <Picker
            enabled = {this.props.enabled}
            style={[
              styles.picker,
              !this.props.enabled &&
              {backgroundColor: '#c4c4c4'},
              this.props.resize &&
              {width: (width) / 2 - 52}
            ]}
            selectedValue={this.props.selectedValue}
            onValueChange={this.props.onValueChange}
          >
            {this.props.pickerItems.map( (s, i) => {
              return <Picker.Item 
                key={i} value={s} label={s.replace('*','/')} />
              })
            }
          </Picker>
          <Icon
            name = "caretdown"
            color = 'black'
            size = {20}
            style= {[styles.icon,{right:30,bottom:5}]}
          />
        </View>
      </View>
    );
  }
}

export default PickerBox;
