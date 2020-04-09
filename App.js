//import liraries
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import SCARAMain from './src/SCARAMain';
import store from './src/store';
import {Provider} from 'react-redux';

// create a component
export default class App extends Component{
  render(){
    return (
      <Provider store = {store}>
          <SCARAMain/>
      </Provider>
    );
  };
};
