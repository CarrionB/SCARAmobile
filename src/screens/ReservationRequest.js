import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createRequest } from '../store/actions/requestActions';

class ReservationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestToSend: {
                Aprobacion: 0,
                Cedula: '1723586382',
                Error: 0,
                FechaReserva: new Date(),
                HoraFin: 0,
                HoraIni: 0,
                NombreAu: '',
                NombreGr: '',
                NombreMat: ''
            },

        };
    }

    onButtonPress = () =>{
        console.log(this.props.createRequest(this.state.requestToSend));
    }

    render() {
        return (
        <View>
            <Text> ReservationRequest </Text>
            <Button
                onPress = {this.onButtonPress}
                title = 'Prueba'
            > Prueba </Button>
        </View>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createRequest: (request) => dispatch(createRequest(request))
    }
}

export default connect(null, mapDispatchToProps)(ReservationRequest);
