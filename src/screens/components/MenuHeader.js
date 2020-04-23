import React, { Component } from 'react';
import { 
  Dimensions, 
  Image, 
  View, 
  Text, 
  StyleSheet, 
  TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import images from '../../res/images';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { logout, isLoggedIn } from '../../store/actions/authActions'
import { resizeFactor } from '../../res/constants';
import { styles } from '../../res/styles';

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onButtonPress = () =>{
    Alert.alert(
      "Aviso",
      "Esta seguro que desea salir?",
      [
          { 
            text: "Si",
            onPress: () => {
              this.props.logout();
              this.props.isLoggedIn();
            }
          },
          { 
            text: "Cancelar",
          }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      
      <View style={[styles.headerContainer]}>
              {/* <StatusBar backgroundColor="blue" barStyle="light-content" /> */}
        <TouchableWithoutFeedback 
            onPress = {this.props.navigation.toggleDrawer}
        >
          <Icon
            name = "bars"
            color = 'white'
            size = {25*resizeFactor}
          />
        </TouchableWithoutFeedback>

        <Image 
          source = {images.logoLobo} 
          style={styles.headerLogo}
        />

        <Text style = {styles.headerTitle}>
          S C A R A
        </Text>
        
        <TouchableWithoutFeedback 
          onPress = {() => {
            this.onButtonPress();
          }}
        >
          <Icon
            name = "logout"
            color = 'white'
            size = {25 * resizeFactor}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      logout: () => dispatch(logout()),
      isLoggedIn: () => dispatch(isLoggedIn())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuHeader);
