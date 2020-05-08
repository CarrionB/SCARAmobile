//import liraries
import React, { Component } from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import images from '../../res/images';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/// create a component
class Presentation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source = {images.presentation}
                    style = {{
                            height: HEIGHT,
                            width: WIDTH
                        }}
                >
                </Image>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        top: 0,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Presentation;
