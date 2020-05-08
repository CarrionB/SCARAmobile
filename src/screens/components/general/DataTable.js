import React, { Component } from 'react';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const {width, height} = Dimensions.get('window')
let resizeFactor = (height+width)/(570+330);

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
      colHeaderVisible,
      rowHeaderVisible,
      tableHead,
      tableData,
      widthArr
    } = this.props;

    const rowHeader = [];

    const rowHeaderWidth = [widthArr[0]]

    for (let i = 7; i < 20; i ++) {
      rowHeader.push([i + '-' + (i + 1)]);
    }

    return (
      <View 
        style = {[
          styles.tableContainer, 
          { 
            height: this.props.heightFactor * height
          }
        ]}
      >
        <ScrollView horizontal={true}>
          <View>
            { colHeaderVisible &&
              <View style = {{flexDirection: 'row'}}>
                {
                  rowHeaderVisible &&
                  <Table 
                    borderStyle={{
                      borderWidth: 0, 
                      borderColor: '#C1C0B9'
                    }}
                  >
                    <Row 
                      data={['']} 
                      widthArr={rowHeaderWidth} 
                      style={styles.tableHeader} 
                      textStyle={styles.tableText}
                    />
                  </Table>
                }
                <Table 
                  borderStyle = {{
                    borderWidth: 1,
                    borderColor: '#C1C0B9'
                  }}
                >
                  <Row 
                    data={tableHead} 
                    widthArr={widthArr} 
                    style={styles.tableHeader} 
                    textStyle={styles.tableHeaderText}
                  />
                </Table>
              </View>
            }
            <ScrollView style={styles.dataWrapper}>
              <View style = {{flexDirection: 'row'}}>
                
                {
                  rowHeaderVisible &&
                  <Table 
                    borderStyle={{
                      borderWidth: 1, 
                      borderColor: '#C1C0B9'
                    }}
                  >
                    {
                      rowHeader.map((row, index) => (
                        <Row
                          key={index}
                          data={row}
                          widthArr={rowHeaderWidth}
                          style={[
                            styles.tableHeader, 
                            {
                              height: 35 * resizeFactor
                            }
                          ]}
                          textStyle={styles.tableHeaderText}
                        />
                      ))
                    }
                  </Table>
                }

                <Table 
                  borderStyle={
                    colHeaderVisible && 
                    {
                      borderWidth: 1, 
                      borderColor: '#C1C0B9'
                    }
                  }
                >
                  {
                    
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[
                          styles.row, 
                          index % 2 && 
                          {
                            backgroundColor: '#F7F6E7'
                          }
                        ]}
                        textStyle={styles.tableText}
                      />
                    ))
                  }
                </Table>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tableContainer: { 
    padding: 16,
    marginBottom: 2,
    paddingBottom: 10,
  },

  tableHeader: {
    height: 40 * resizeFactor,
    backgroundColor: '#042944'
  },

  tableHeaderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12 * resizeFactor
  },

  tableText: {
    paddingLeft: 10,
    textAlign: 'left',
    fontWeight: '100',
    fontSize: 10 * resizeFactor
  },

  dataWrapper: { 
    marginTop: 1 
  },
  
  row: { 
    height: 35 * resizeFactor,
    backgroundColor: '#E7E6E1'
  }
})

export default DataTable;
