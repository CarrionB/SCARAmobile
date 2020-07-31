//import liraries
import React, { Component } from 'react';
import {
    Keyboard, KeyboardAvoidingView,
    View, Text, ImageBackground 
    } from 'react-native';
import { connect } from 'react-redux';
import { EmailAndPassword, FadeInView, Logo } from '../components'
import images from '../../res/images';
import { resizeFactor } from '../../res/constants';
import { styles } from '../../res/styles';

// create a component
class Login extends Component {

    constructor() {
        super();
        this.state={
          offset: 10,
          inputIsFocused: false,
          logoHeight: 200 * resizeFactor,
          logoWidth: 200 * resizeFactor,
        };
        
        this._keyboardDidHide=this._keyboardDidHide.bind(this);
        this._keyboardDidShow=this._keyboardDidShow.bind(this);
    }

    componentDidMount() 
    {
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
    }

    componentWillUnmount() 
    {
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener.remove();
    }

    _keyboardDidShow() 
    {
        this.changeOffsetOnFocus();
    }

    _keyboardDidHide() 
    {
        this.changeOffsetOnBlur(); 
    }

    handleBackButtonClick = () => 
    {
        this.changeOffsetOnBlur(); // works best when the goBack is async
        return true;
    }

    changeOffsetOnFocus = () => 
    {
        this.setState({offset: 0})
        this.setState({inputIsFocused: true})
        this.setState({logoHeight: 90*resizeFactor})
        this.setState({logoWidth: 90*resizeFactor})
    }

    changeOffsetOnBlur = () => 
    {
        this.setState({offset: 10})
        this.setState({inputIsFocused: false})
        this.setState({logoHeight: 200*resizeFactor})
        this.setState({logoWidth: 200*resizeFactor})
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <FadeInView style={styles.loginContainer}>
                    <ImageBackground
                        source = {images.background}
                        style={styles.loginContainer}
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

//make this component available to the app
export default connect()(Login);
