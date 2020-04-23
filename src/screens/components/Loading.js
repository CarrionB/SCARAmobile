//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { width, height } from '../../res/constants';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View 
        style={[
          styles.container,
          {top: this.props.offset}
        ]}
      >
        <Text> Cargando espere... </Text>
        <Text> </Text>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 2 ,
    width: width,
    backgroundColor: 'white'
  },
});

//make this component available to the app
export default Loading;