//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DrawerNavigator, Login, Presentation} from './screens';
import { isLoggedIn } from './store/actions/authActions';
import { getRequest } from './store/actions/requestActions'
import { getData } from './store/actions/initActions'
import { styles } from './res/styles';

class SCARAMain extends Component {

    state = {
        presentationON: true,
    }
    unsubscriber = null;

    componentDidMount(){
        this.hidePresentation();
    }

    hidePresentation() {
        setTimeout(function(){
            console.log('isloggenin main')
            this.props.isLoggedIn();
            if(this.props.loggedIn)
            {
                this.props.getRequest();
                this.props.getData();
            }
        }.bind(this), 0)
        setTimeout(function(){
            this.setState({presentationON:false});
        }.bind(this), 5000);
    }

    render() {
        const {loggedIn} = this.props;
        return (
            <View style={styles.appContainer}>
                {this.state.presentationON && <Presentation/>}
                {!this.state.presentationON && (!loggedIn ? <Login/> : <DrawerNavigator/>)}
            </View>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        isLoggedIn: () => dispatch(isLoggedIn()),
        getRequest: () => dispatch(getRequest()),
        getData: () => dispatch(getData())
    }
}

//make this component available to the app
export default connect(mapStateToProps,mapDispatchToProps)(SCARAMain);
