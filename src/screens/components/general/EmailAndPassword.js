//import liraries
import React, { Component } from 'react';
import { 
    Dimensions, View, Text, StyleSheet, 
    TextInput, TouchableOpacity, Alert, ActivityIndicator  
} from 'react-native';
import { connect } from 'react-redux';
import { login, isLoggedIn } from '../../../store/actions/authActions'
import { getData } from '../../../store/actions/initActions';
import { getRequest } from '../../../store/actions/requestActions';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

let resizeFactor = (HEIGHT+WIDTH)/(570+330);

// create a component
class EmailAndPassword extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      credentials: {
        email:'',
        password:'',
      },
      showLoading: false
    }
    this.inputRef = React.createRef();
  }

  onButtonPress = () => {
    this.inputRef.current.blur();
    if(this.state.credentials.email != '' && this.state.credentials.password != '')
    {
      this.props.login(this.state.credentials);
      this.setState({showLoading:true})
      setTimeout(function(){
        if(!this.props.authError)
        {
          this.props.getRequest();
          this.props.getData();

          setTimeout(function(){
            this.props.isLoggedIn();
          }.bind(this), 3000)
        }
        else
        {
          this.setState({showLoading:false})
          this.showAlert(
            "Aviso",
            this.props.errorMessage
          )
        }
      }.bind(this), 4000)
    }
    else
    {
      this.showAlert(
        "Aviso",
        "Debe llenar todos los campos"
      )
    }
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { 
          text: "OK"
        }
      ],
      {   
        cancelable: false 
      }
    );
  }
  
  render() {
    const {authError} = this.props
    let {showLoading} = this.state
    return (
      <View style={styles.container}>
        { 
          !showLoading ?
          <View> 
            <TextInput 
              placeholder='Email' 
              ref={this.inputRef} 
              style= {styles.input} 
              value = {this.state.email}
              onChangeText = {email => 
                this.setState(prevState => ({
                  credentials: {
                    ...prevState.credentials,
                    email: email
                  }
                }))}
              onSubmitEditing = {this.onButtonPress}
              onFocus = {this.props.changeOffsetOnFocus}
              onBlur = {this.props.changeOffsetOnBlur}
            />
            <TextInput 
              placeholder='Password'
              ref={this.inputRef} 
              style= {styles.input} 
              secureTextEntry
              value = {this.state.password}
              onChangeText = {password=>
                this.setState(prevState => ({
                  credentials: {
                    ...prevState.credentials,
                    password: password
                  }
                }))
              }
              onSubmitEditing = {this.onButtonPress}
              onFocus = {this.props.changeOffsetOnFocus}
              onBlur = {this.props.changeOffsetOnBlur}
            />
            <TouchableOpacity 
              style = {styles.buttonContainer} 
              onPress={this.onButtonPress}>
              <Text style = {styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>
          </View> :
          <View>
            <Text style={{
              color: 'white',
              fontSize: 15,
              alignSelf: 'center',
              marginBottom: 20
              }}>
              Validando ingreso...
            </Text>
            
            <ActivityIndicator size='large'/>
          </View>
        }

      </View> 
    );
  }
}

// define your styles
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input:{
        height:35*resizeFactor,
        width:WIDTH*0.8,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:15,
        borderRadius:5,
        fontSize:12*resizeFactor,
        backgroundColor:'#ffffff',
        alignSelf:'center',
    },
    errorText:{
        fontSize:15*resizeFactor,
        color:'red',
        alignSelf:'center'
    },
    buttonText: {
        textAlign:'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize:19*resizeFactor
    },
    buttonContainer:{
        backgroundColor:'#042944',
        padding:8,
        marginLeft: WIDTH*0.1,
        marginRight: WIDTH*0.1,
        borderRadius:8
    }
});

const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      errorMessage: state.auth.errorMessage,
      loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    login: (credentials) => dispatch(login(credentials)),
    isLoggedIn: () => dispatch(isLoggedIn()),
    getData: () => dispatch(getData()),
    getRequest: () => dispatch(getRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAndPassword);
