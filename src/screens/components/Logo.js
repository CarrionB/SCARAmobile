//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from '../../res/images';

// create a component
const Logo = (props) => {
    return (
        <View>
            <Image 
                source = {images.logoLobo} 
                style={{
                    height:props.logoHeight, 
                    width:props.logoWidth
                }}
            />
        </View>
    );
};

//make this component available to the app
export default Logo;
