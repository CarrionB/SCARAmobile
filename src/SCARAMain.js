//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './screens/Login'
import ReservationRequest from './screens/ReservationRequest'
import Presentation from './screens/Presentation'
import { connect } from 'react-redux';

class SCARAMain extends Component {

    state = {
        presentationON: true,
    }

    componentDidMount(){
        console.log(this.state.presentationON)
        this.hidePresentation()
    }

    hidePresentation() {
        setTimeout(function(){
            this.setState({presentationON:false});
        }.bind(this), 5000);
    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                {this.state.presentationON && <Presentation/>}
                <ReservationRequest/>
            </View>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        test: state.req.obj,
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      },
});

//make this component available to the app
export default connect(mapStateToProps)(SCARAMain);
