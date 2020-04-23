import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { DataTable, ImageButton, MenuHeader } from './components';
import images from '../res/images';
import { tableWidthArrs, resizeFactor } from '../res/constants';
import { styles } from '../res/styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.menuHeader}>
          <MenuHeader navigation ={this.props.navigation}/>
        </View>
        <View>
          <Image 
            source = {images.logoEPN}
            style={styles.logo}
          />
          
          <Text 
            style = {[styles.welcomeText]}
          >
            Bienvenido/a {this.props.userInfo.name}
          </Text>

          <View style = {styles.margin}>
            <Text style = {[
              styles.text,
              {marginTop: 7 * resizeFactor}
            ]}>
              Solicitudes enviadas
            </Text>
            <DataTable
              heightFactor = {0.2}
              rowHeaderVisible = {false}
              colHeaderVisible = {false}
              tableHead = {[]}
              tableData = {this.props.data}
              widthArr = {tableWidthArrs.requests}
            />
          </View>

          <View style = {styles.buttonRow}>
            <ImageButton
              label = {'Aulas'}
              onButtonPress={() => this.props.navigation.navigate('ListaAulas')}
              icon = {images.iconAula}
            />
            <ImageButton
              label = {'Registros'}
              onButtonPress={() => this.props.navigation.navigate('Registros')}
              icon = {images.iconReport}
            />
            <ImageButton
              label = {'Soiicitudes'}
              onButtonPress={() => this.props.navigation.navigate('Solicitud')}
              icon = {images.iconReserva}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    userInfo: state.auth.userInfo,
    data: state.req.data
  }
}

export default connect(mapStateToProps, null)(HomeScreen);
