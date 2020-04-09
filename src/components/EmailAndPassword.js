//import liraries
import React, { Component } from 'react';
import { 
    Dimensions, View, Text, StyleSheet, 
    TextInput, TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

let resizeFactor = (HEIGHT+WIDTH)/(570+330);

// create a component
class EmailAndPassword extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            errorMessage: '',
            loading: false,
            errorVisible: false       
        }
        this.inputRef = React.createRef();
    }

    onButtonPress() {

    }

    
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder='Email' 
                    ref={this.inputRef} 
                    style= {styles.input} 
                    value = {this.state.email}
                    onChangeText = {email=>this.setState({email})}
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
                    onChangeText = {password=>this.setState({password})}
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
                {/* {this._renderSubComp()} */}
                
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



//make this component available to the app
export default connect()(EmailAndPassword);
