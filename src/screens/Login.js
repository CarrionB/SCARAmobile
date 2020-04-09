//import liraries
import React, { Component } from 'react';
import {
    Dimensions, Keyboard, KeyboardAvoidingView,
    View, Text, StyleSheet, ImageBackground 
    } from 'react-native';
import FadeInView from '../components/FadeInView'
import Logo from '../components/Logo'
import EmailAndPassword from '../components/EmailAndPassword'
import images from '../res/images';
import { connect } from 'react-redux';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

let resizeFactor = (HEIGHT+WIDTH)/(570+330);

// create a component
class Login extends Component {

    constructor() {
        super();
        this.state={
          offset: 10,
          inputIsFocused: false,
          logoHeight: 200 * resizeFactor,
          logoWidth: 200 * resizeFactor
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FadeInView style={styles.container}>
                    <ImageBackground
                        source = {images.background}
                        style={styles.container}
                    >
                        <View
                            style={styles.logoContainer}
                        >
                            <Logo
                                logoHeight = {this.state.logoHeight}
                                logoWidth = {this.state.logoWidth}
                            />
                        </View>
                        <View style = {styles.emailAndPassword}>
                            <EmailAndPassword/>
                        </View>
                        <KeyboardAvoidingView 
                            style = {[styles.footer,{
                                height: this.state.offset,
                                bottom: this.state.offset/2,
                                right: this.state.offset/2
                            }]} 
                        >
                            <Text style = {styles.footerText}>
                                SCARA © 2019
                            </Text>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </FadeInView>
            </View>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        height: '100%',
        width: '100%'
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20 * resizeFactor,
        color: '#7cc0fc',
    },

    logoContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emailAndPassword: {
        flex: 2,
        justifyContent: 'center',
    },

    footer:{
        position: 'absolute',
        height: 10,
        bottom: 5,
        right: 5
    },

    footerText:{
        fontFamily: 'serif',
        color: '#bdb8ac',
        fontSize: 10 * resizeFactor
    }
});

//make this component available to the app
export default connect()(Login);
