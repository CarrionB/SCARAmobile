import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable, Button } from '.';
import { width, height, resizeFactor } from '../../res/constants';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View 
        style = {[
          styles.container,
          {top: this.props.offset}
        ]}
      >
        <View style = {{
          alignSelf: 'flex-start',
          left: 14,
          paddingBottom: 1 * resizeFactor,
        }}>
          <Text> {this.props.label} </Text>
        </View>

        <View >
          <DataTable
            colHeaderVisible = {this.props.tableData.colHeaderVisible}
            rowHeaderVisible = {this.props.tableData.rowHeaderVisible}
            heightFactor = {0.72}
            tableHead = {this.props.tableData.header}
            tableData = {this.props.tableData.data}
            widthArr = {this.props.tableData.widthArr}
          />
        </View>

        <View>
          <Button
            label = {'Regresar'}
            onButtonPress = {this.props.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 2 ,
    width: width,
    backgroundColor: 'white'
  },
});

export default Results;
